'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const NEED = 460; // px of pressure that advances the page
const LEAK = 1400; // px per second that pressure drains away
const GESTURE_GAP = 200; // ms of wheel silence that separates one gesture from the next
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
 * Intent is a gesture that *begins* at the end of the page. One continuous
 * scroll — however long, however fast — is a single gesture that began
 * further up, so it never qualifies, and that covers both the shapes that
 * used to fire by accident: a trackpad flick's momentum tail is the same
 * gesture as the flick, and a free-spinning mouse wheel is one long gesture
 * from wherever the spin started.
 *
 * Gestures are separated by silence. A flywheel emits continuously while it
 * turns, so no gap appears until it actually stops; the deliberate nudge
 * after that is a new gesture, and it begins where you already are, at the
 * end. Reading speed instead of gesture boundaries was a mistake: a free
 * wheel's rate fluctuates enough that "is this faster than before" answers
 * yes on noise alone.
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
    let lastWheel = 0;
    let pushing = false; // did this gesture begin at the end of the page?
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
        pushing = false;
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

      // Where the page actually stops. Wheel events fire before the scroll is
      // applied, so this reads what the previous one produced; repeatedly
      // unmoved means it will not go further, whatever scrollHeight claims.
      if (lastWheelY !== null && y <= lastWheelY + 0.5) {
        stalls += 1;
        if (stalls >= STALLS) endY = y;
      } else {
        stalls = 0;
      }
      lastWheelY = y;

      const t = performance.now();
      // A gesture boundary is silence, not speed. Everything inside one
      // continuous scroll belongs to the gesture that started it, so a long
      // spin of a free wheel is one gesture that began far up the page.
      if (t - lastWheel > GESTURE_GAP) {
        // Recomputed per gesture, so there is no flag to strand.
        pushing = atEnd() && cardShown();
      }
      lastWheel = t;

      // Leaving the end mid-gesture ends it; the rest of that scroll should
      // not keep counting on the way past.
      if (pushing && !(atEnd() && cardShown())) pushing = false;

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
          {/* Both are rendered; CSS shows whichever suits the pointer. A
              touch device has no wheel events, so telling a phone to keep
              scrolling is an instruction it cannot carry out. */}
          <span className="go-scroll">
            {ready ? 'Keep scrolling to continue' : 'Keep scrolling, or click'}
          </span>
          <span className="go-tap">Tap to continue</span>{' '}
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
