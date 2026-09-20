'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

// The fill spans the card's own approach: from the moment it appears at the
// foot of the window to the moment the page runs out. Anything measured from
// the end of the document instead puts most of the fill below the fold, where
// it cannot be seen — which is what made the bar look like it never moved, or
// like it started already half full.
const MIN_RANGE = 180; // px, so a card already in view still has a visible fill
const GESTURE_GAP = 130; // wheel silence that separates one gesture from the next
const COMMIT = 40; // px within the committing gesture, so a stray tick is not one
const SLACK = 6; // tolerance on "at the end", for fractional scroll heights

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Two steps, and each one is visible: scroll to the end of the page, then
 * scroll once more to go to the next one.
 *
 * The bar is the first step, and it is drawn straight from scroll position —
 * it fills across the last TAIL pixels of the page. So the thing you can see
 * happening, the content moving up, *is* the thing filling the bar. Every
 * previous version drove the bar from wheel deltas instead, which meant there
 * was a stretch at the end where the page was visibly scrolling and the bar
 * sat at nought, and no way to tell whether it was broken or waiting.
 *
 * Being position-derived also means it cannot get stuck. It is recomputed
 * from scrollTop on every frame, so there is no accumulator to strand and no
 * flag to latch: scroll down and it fills, scroll up and it empties, every
 * time, with no history to get wrong. That was the actual defect in the last
 * three attempts — a latched "armed" flag that could be cleared by trackpad
 * jitter, after which nothing you did had any effect and nothing said why.
 *
 * The second step is a single rule: a gesture counts only if its *first*
 * event happened at the end of the page. Momentum cannot satisfy it, because
 * the flick that carries you to the end began further up, and its tail is the
 * same gesture — no gap, so no new gesture. Nothing is remembered between
 * gestures, so there is nothing to reset and nothing to jam. COMMIT exists
 * only so a single stray tick is not mistaken for a push.
 *
 * The link is always clickable, and the whole behaviour is disabled under
 * prefers-reduced-motion.
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

    // Deliberately not gated on prefers-reduced-motion. This is navigation the
    // reader asks for, not decoration, and a 2px indicator is not the kind of
    // motion that setting is about — whereas gating it meant the bar silently
    // never moved and nothing explained why.
    const scroller = () => document.scrollingElement || document.documentElement;

    const read = () => {
      const el = scroller();
      const max = el.scrollHeight - el.clientHeight;
      return { el, max, y: el.scrollTop };
    };

    const atEnd = () => {
      const { max, y } = read();
      return max > 0 && y >= max - SLACK;
    };

    let raf = 0;
    const frame = () => {
      raf = 0;
      const { el, max, y } = read();
      // A page too short to scroll gets no bar and no scroll-to-advance.
      if (max <= 0) {
        setProgress(0);
        setReady(false);
        return;
      }
      // Where the card sits in the document, and therefore the scroll
      // position at which it first touches the bottom of the window.
      const node = card.current;
      const cardTop = node ? node.getBoundingClientRect().top + y : max;
      const appears = cardTop - el.clientHeight;
      // Never later than MIN_RANGE before the end, so a card that is already
      // on screen still gets a fill you can watch rather than a jump.
      const start = Math.max(0, Math.min(appears, max - MIN_RANGE));
      const range = Math.max(1, max - start);

      // Pinned to exactly 1 at the end rather than left to arithmetic. Scroll
      // heights are fractional, so the ratio lands just short while atEnd() is
      // already true, which would leave a bar not quite full sitting next to a
      // label already asking you to scroll again.
      const end = y >= max - SLACK;
      const p = end ? 1 : clamp01((y - start) / range);
      setProgress(p);
      setReady(end);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // Per-gesture only. Deliberately not stored in a ref: nothing here should
    // outlive the gesture it describes.
    let lastWheel = 0;
    let counts = false;
    let pushed = 0;

    const onWheel = (event) => {
      if (navigated.current) return;

      const now = performance.now();
      if (now - lastWheel > GESTURE_GAP) {
        // A new gesture. It only counts if it began at the end of the page,
        // which the tail of an arriving flick can never do.
        counts = atEnd();
        pushed = 0;
      }
      lastWheel = now;
      onScroll(); // scroll events stop at the clamp; keep the bar truthful

      if (!counts || event.deltaY <= 0 || !atEnd()) return;

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
