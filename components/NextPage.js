'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const MIN_RANGE = 180; // shortest fill, so it is never an instant jump
const MAX_RANGE = 600; // longest fill, so it cannot complete before the card shows
const GESTURE_GAP = 130; // wheel silence that separates one gesture from the next
const COMMIT = 40; // px within the committing gesture, so a stray tick is not one
const SLACK = 6; // tolerance on "at the end", for fractional scroll positions

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Scroll to the end of the page, then scroll once more to go to the next one.
 *
 * The end of the page is *learned*, not calculated. Every previous version
 * asked the document where its bottom was — scrollHeight minus clientHeight —
 * and on a real browser that number can be wrong, or merely stale: this site
 * sets scroll-behavior: smooth on the root, which in Chrome animates wheel
 * scrolling, so scrollTop lags a long way behind your fingers. When the number
 * overstates the reachable extent, the page is visibly bottomed out and
 * springing back while the code still believes there is further to go. Nothing
 * advances, the bar never completes, and pushing harder changes nothing —
 * which is exactly the reported symptom.
 *
 * So instead: if two downward wheel events in a row see the same scroll
 * position, the page did not move, and that position is the end. This is the
 * same evidence a reader has — the page stopped — so the code and the reader
 * can no longer disagree. It re-learns whenever the document changes height.
 *
 * The bar fills across the card's approach into view, bounded at both ends.
 * MIN_RANGE stops it being an instant jump. MAX_RANGE stops it starting so
 * early that it is already full by the time the card appears, which is what
 * happens on a tall window where the card is on screen for most of the page.
 *
 * Advancing is one rule with no memory: a gesture counts only if its first
 * wheel event happened at the end. Momentum cannot satisfy it, because the
 * flick that carries you there began further up and its tail is the same
 * gesture. Nothing persists between gestures, so nothing can be left stranded.
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

    // The end of the page, as observed. Null until the page refuses to move.
    let endY = null;
    let lastHeight = 0;
    let lastWheelY = null;
    let stalled = false;

    const limitOf = (el, max) =>
      endY != null ? Math.min(endY, max) : max;

    const atEnd = () => {
      const el = scroller();
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return false;
      return el.scrollTop >= limitOf(el, max) - SLACK;
    };

    let raf = 0;
    const frame = () => {
      raf = 0;
      const el = scroller();
      const y = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;

      // The document changed shape; whatever we learned about its end is void.
      if (el.scrollHeight !== lastHeight) {
        lastHeight = el.scrollHeight;
        endY = null;
        lastWheelY = null;
        stalled = false;
      }

      if (max <= 0) {
        setProgress(0);
        setReady(false);
        return;
      }

      const limit = limitOf(el, max);
      const node = card.current;
      const appears = node
        ? node.getBoundingClientRect().top + y - el.clientHeight
        : limit - MAX_RANGE;

      // Start filling when the card appears, but never earlier than MAX_RANGE
      // before the end, and never later than MIN_RANGE before it.
      const start = Math.max(
        0,
        Math.min(limit - MIN_RANGE, Math.max(appears, limit - MAX_RANGE))
      );
      const range = Math.max(1, limit - start);

      const end = y >= limit - SLACK;
      setProgress(end ? 1 : clamp01((y - start) / range));
      setReady(end);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // Per-gesture state only; nothing here outlives the gesture it describes.
    let lastWheel = 0;
    let counts = false;
    let pushed = 0;

    const onWheel = (event) => {
      if (navigated.current || event.deltaY <= 0) return;

      const el = scroller();
      const y = el.scrollTop;

      // Wheel events fire before the scroll is applied, so this reads the
      // position the previous event produced. Two in a row at the same place
      // means the page would not move: that is the end, whatever the
      // document's own arithmetic claims.
      stalled = lastWheelY !== null && y <= lastWheelY + 0.5;
      lastWheelY = y;
      if (stalled) {
        endY = y;
        onScroll(); // the bar's idea of the end just changed
      }

      const now = performance.now();
      if (now - lastWheel > GESTURE_GAP) {
        // A new gesture counts only if it began at the end. The tail of an
        // arriving flick cannot: it is the same gesture, with no gap.
        counts = atEnd();
        pushed = 0;
      }
      lastWheel = now;

      if (!counts || !atEnd()) return;

      pushed += event.deltaY;
      if (pushed >= COMMIT) {
        navigated.current = true;
        router.push(next.href);
      }
    };

    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('wheel', onWheel, { passive: true });
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
          {ready ? 'Scroll again, or click' : 'Keep scrolling, or click'}{' '}
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
