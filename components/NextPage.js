'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const NEED = 460; // px of pressure that advances the page
const LEAK = 1400; // px per second that pressure drains away
const SETTLE = 150; // ms at the end before anything is counted at all
const RISE = 6; // px of increase that marks fresh input rather than momentum
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
 * Momentum is told apart from intent by its shape rather than by its size.
 * A flick's wheel deltas only ever decay — that is what momentum is — while
 * anything you do with your fingers starts from nothing and rises. So
 * pressure accumulates only once a delta has come in larger than the one
 * before it. A flick, however hard, never produces that; the first push after
 * it always does, because it begins from rest. Leak alone was not enough:
 * a hard flick delivers well over a thousand pixels of tail and simply
 * outpaced it.
 *
 * There is deliberately no gesture bookkeeping. The rule used to be that a
 * gesture counted only if it began at the end, which needed a gap in wheel
 * events to spot — and if you simply kept pushing, that gap never came and
 * the state stayed stuck on "still arriving" indefinitely.
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

    const atEnd = () => {
      const el = scroller();
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return false;
      const limit = endY != null ? Math.min(endY, max) : max;
      return el.scrollTop >= limit - SLACK;
    };

    let pressure = 0;
    let arrivedAt = null; // when we reached the end
    let prevDelta = Infinity; // so the first event at the end is never a rise
    let pushing = false; // has fresh input been seen since arriving?
    let raf = 0;
    let lastT = 0;

    const tick = (t) => {
      const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0;
      lastT = t;

      const here = atEnd();
      if (!here) {
        pressure = 0;
        arrivedAt = null;
        prevDelta = Infinity;
        pushing = false;
      } else if (arrivedAt === null) {
        arrivedAt = t;
      }

      pressure = Math.max(0, pressure - LEAK * dt);
      setProgress(clamp01(pressure / NEED));
      setReady(here);

      if (pressure >= NEED && !navigated.current) {
        navigated.current = true;
        router.push(next.href);
        raf = 0;
        return;
      }

      // Keep running while there is anything to animate or watch for.
      raf = here || pressure > 0 ? requestAnimationFrame(tick) : 0;
    };

    const run = () => {
      if (!raf) {
        lastT = 0;
        raf = requestAnimationFrame(tick);
      }
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

      if (!atEnd()) {
        run();
        return;
      }

      // Ignore the first moments at the end: that is where a flick's momentum
      // is strongest, and it is not you deciding anything.
      const now = performance.now();
      if (arrivedAt !== null && now - arrivedAt < SETTLE) {
        run();
        return;
      }

      // Momentum decays, always. A finger does not: it starts from rest and
      // rises. One rise is enough to know the difference.
      const delta = event.deltaY;
      if (delta > prevDelta + RISE) pushing = true;
      prevDelta = delta;

      if (pushing) pressure += delta;
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
      <Link href={next.href} className="next-card reveal" data-ready={ready}>
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
