'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const NEED = 460; // px of pressure that advances the page
const LEAK = 1400; // px per second that pressure drains away
// Long enough for the baseline window to absorb the scroll that brought you
// here, so that arriving cannot itself look like speeding up.
const SETTLE = 250; // ms at the end before anything is counted at all
const NEAR_MS = 150; // window for "how fast am I scrolling right now"
const BASE_MS = 600; // window for "how fast have I been scrolling"
const HIST_MS = 900; // how much scroll history to keep
const ACCEL = 1.6; // how much faster than the baseline counts as speeding up
const ACCEL_FLOOR = 0.25; // px per ms, so small absolute changes never qualify
const ACCEL_HITS = 2; // consecutive qualifying events, so noise alone cannot
const STALLS = 3; // repeated unmoved wheels that prove where the end is
const SLACK = 6; // tolerance on "at the end", for fractional scroll positions

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Reach the end of the page, keep scrolling, and the page turns.
 *
 * The bar measures *pressure*: how hard you are currently pushing against the
 * end. Scrolling down adds to it, and it drains continuously at LEAK, so it
 * rises while you push and falls back when you stop. That is the same shape
 * as the rubber band you can feel under your fingers, which is the point —
 * the bar should describe the thing you are already doing.
 *
 * Every earlier version drew the bar from scroll position instead, across
 * some stretch of page before the end. That could not work. You cross those
 * last few hundred pixels during the flick that brings you there, in a couple
 * of hundred milliseconds, so the bar was always already full by the time you
 * looked at the card. Pressure starts at nought when you arrive, no matter
 * how you arrived.
 *
 * Intent is read as acceleration: not how fast you are scrolling, but whether
 * you have just sped up. Two windows over recent scrolling, the last 150ms
 * and the last 600ms, and pressure builds only while the short one clearly
 * outruns the long one. Scrolling faster means doing something new; scrolling
 * fast means nothing at all.
 *
 * Windows rather than per-event rates, because dividing a delta by the gap
 * since the previous event is hopeless: wheel events arrive unevenly, and one
 * that lands 2ms after its predecessor reports an enormous phantom rate. That
 * alone was enough to let steady scrolling trigger this.
 *
 * Both of the ways this used to fire by accident are the same mistake read
 * two ways. A trackpad flick's deltas decay, so the short average falls below
 * the long one and nothing accumulates. A free-spinning mouse wheel — the
 * Logitech flywheel — coasts at a high, steady rate instead, which defeated
 * an earlier rule that merely asked whether each delta exceeded the one
 * before it: that wheel's deltas fluctuate constantly, so noise cleared the
 * bar on its own. Against a baseline, coasting is flat however fast it is,
 * and only a fresh spin registers.
 *
 * There is deliberately no gesture bookkeeping. The rule used to be that a
 * gesture counted only if it began at the end, which needed a gap in wheel
 * events to spot — and if you simply kept pushing, that gap never came and
 * the state stayed stuck on "still arriving" indefinitely.
 *
 * Nothing counts at all until the card is on screen. Being at the end is not
 * enough on its own: the end can be reached, or merely believed to have been
 * reached, while the card is still below the fold, and a hard scroll should
 * never carry you somewhere you were not being offered. If you cannot see the
 * invitation, you cannot accept it by accident.
 *
 * The end of the page is observed rather than calculated: STALLS downward
 * wheels in a row that leave scrollTop unmoved mean the page will not go
 * further, whatever scrollHeight claims. Several in a row, not one, because
 * scroll-behavior: smooth makes Chrome animate wheel scrolling and scrollTop
 * can briefly repeat mid-page.
 */
export default function NextPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const navigated = useRef(false);
  const card = useRef(null);

  const current = normalise(pathname);
  const index = ORDER.findIndex((entry) => entry.href === current);
  const next = index >= 0 ? ORDER[(index + 1) % ORDER.length] : null;

  useEffect(() => {
    if (!next) return;

    const scroller = () =>
      document.scrollingElement || document.documentElement;

    let endY = null; // the end of the page, as observed
    let lastHeight = 0;
    let lastWheelY = null;
    let stalls = 0;

    // The whole card, including the bar along its bottom edge, has to be on
    // screen. If it is ever taller than the window, seeing its foot will do.
    const cardShown = () => {
      const node = card.current;
      if (!node) return false;
      const vh = scroller().clientHeight;
      const r = node.getBoundingClientRect();
      return r.bottom <= vh + 1 && (r.top >= -1 || r.height > vh);
    };

    const atEnd = () => {
      const el = scroller();
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return false;
      const limit = endY != null ? Math.min(endY, max) : max;
      return el.scrollTop >= limit - SLACK;
    };

    let pressure = 0;
    let pressureT = 0; // when pressure was last brought up to date
    let arrivedAt = null; // when we reached the end
    const hist = []; // recent {t, d} wheel samples
    let accelHits = 0;
    let pushing = false; // has a deliberate speed-up been seen?
    let raf = 0;

    // Leak against the clock rather than against frames. Doing it per frame
    // meant that whenever rAF was throttled — a background tab, a hidden
    // window — nothing drained while wheel events kept arriving, so pressure
    // climbed without bound and fired the instant a frame finally came.
    const decayTo = (t) => {
      const dt = Math.max(0, (t - pressureT) / 1000);
      pressureT = t;
      pressure = Math.max(0, pressure - LEAK * dt);
    };

    const advance = () => {
      if (navigated.current) return true;
      if (pressure < NEED) return false;
      navigated.current = true;
      setProgress(1);
      router.push(next.href);
      return true;
    };

    const tick = (t) => {
      const here = atEnd() && cardShown();
      if (!here) {
        pressure = 0;
        arrivedAt = null;
        pushing = false;
      } else if (arrivedAt === null) {
        arrivedAt = t;
      }

      decayTo(t);
      if (pressure === 0) pushing = false;
      setProgress(clamp01(pressure / NEED));
      setReady(here);

      if (advance()) {
        raf = 0;
        return;
      }

      // Keep running while there is anything to animate or watch for.
      raf = here || pressure > 0 ? requestAnimationFrame(tick) : 0;
    };

    const run = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const el = scroller();
      if (el.scrollHeight !== lastHeight) {
        // The document changed shape; what we learned about its end is void.
        lastHeight = el.scrollHeight;
        endY = null;
        lastWheelY = null;
        stalls = 0;
      }
      run();
    };

    const onWheel = (event) => {
      if (navigated.current || event.deltaY <= 0) return;

      const el = scroller();
      const y = el.scrollTop;

      // Recorded on every event, including well before the end, so that
      // arriving fast sets a baseline that simply staying fast cannot beat.
      const t = performance.now();
      hist.push({ t, d: event.deltaY });
      while (hist.length && t - hist[0].t > HIST_MS) hist.shift();
      // Divided by the whole window, so time spent not scrolling counts as
      // zero. That is what makes picking the wheel up again read as a
      // speed-up while never letting a steady spin qualify: keep going at one
      // speed and the long window fills with exactly that speed, so the two
      // averages converge and nothing happens, however fast you are going.
      const over = (ms) => {
        let total = 0;
        for (let i = hist.length - 1; i >= 0; i -= 1) {
          if (t - hist[i].t > ms) break;
          total += hist[i].d;
        }
        return total / ms;
      };
      const near = over(NEAR_MS);
      const base = over(BASE_MS);

      // Wheel events fire before the scroll is applied, so this reads what the
      // previous event produced. Repeatedly unmoved means the page will not go
      // any further, and that is the end.
      if (lastWheelY !== null && y <= lastWheelY + 0.5) {
        stalls += 1;
        if (stalls >= STALLS) endY = y;
      } else {
        stalls = 0;
      }
      lastWheelY = y;

      if (!atEnd() || !cardShown()) {
        arrivedAt = null;
        decayTo(t);
        run();
        return;
      }
      if (arrivedAt === null) arrivedAt = t;

      // Ignore the first moments at the end: that is where a flick's momentum
      // is strongest, and it is not you deciding anything.
      if (arrivedAt !== null && t - arrivedAt < SETTLE) {
        decayTo(t);
        run();
        return;
      }

      // Speeding up is the signal, not speed. Coasting — a flywheel, or a
      // flick's tail — holds the two averages together; a fresh push pulls
      // the short one above the long one.
      if (near > base * ACCEL + ACCEL_FLOOR) accelHits += 1;
      else accelHits = 0;
      if (accelHits >= ACCEL_HITS) pushing = true;

      if (pushing) {
        decayTo(t);
        pressure += event.deltaY;
        setProgress(clamp01(pressure / NEED));
        // Checked here as well as in the frame loop, so advancing never waits
        // on a frame that may be throttled away.
        if (advance()) return;
      }
      run();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('wheel', onWheel, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, [next, router]);

  if (!next) return null;

  return (
    <section className="next-page">
      <Link
        ref={card}
        href={next.href}
        className="next-card reveal"
        data-ready={ready}
      >
        <span className="page-link-kicker">Next · {next.kicker}</span>
        <span className="next-title">{next.label}</span>
        <span className="page-link-go">
          {ready ? 'Keep scrolling to continue' : 'Keep scrolling, or click'}{' '}
          <RiArrowRightLine size={14} />
        </span>
        <span className="next-bar" aria-hidden="true">
          <span
            className="next-bar-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </span>
      </Link>
    </section>
  );
}
