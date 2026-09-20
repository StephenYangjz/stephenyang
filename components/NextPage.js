'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const PULL = 240; // px of scrolling at the bottom that fills the bar
const GESTURE_GAP = 120; // wheel silence that ends the gesture you arrived on
const MAX_STEP = 90; // ceiling on one event, so the bar sweeps rather than jumps
const DECAY = 500; // stop pushing and the bar empties again
const SLACK = 4; // px of tolerance on "at the bottom", for fractional layout

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * At the bottom of the page, scrolling on fills a bar and then moves to the
 * next page.
 *
 * Only one thing here is subtle, and it is momentum: a trackpad flick keeps
 * delivering wheel events long after the page has stopped against the bottom,
 * so if every event counted, the gesture that brought you to the end would
 * carry you off it. The fix is to wait for the wheel to fall silent once —
 * momentum events arrive an order of magnitude closer together than
 * GESTURE_GAP, so that silence can only fall between gestures, never inside
 * one. After it does, scrolling fills the bar normally.
 *
 * Everything else is deliberately dumb, because the clever versions were
 * worse:
 *
 *   The bar always starts empty. A previous attempt let the arrival gesture
 *   pre-fill it to give early feedback, which just looked like the bar was
 *   broken and already half full before you had done anything.
 *
 *   The bar empties when you stop. A previous attempt made progress
 *   permanent so that returning to it was cheap; in practice it meant a
 *   half-filled bar sitting there indefinitely with no way to clear it.
 *
 *   Being armed survives stray upward events. This was the real bug: the
 *   arming flag was cleared by any negative deltaY, and trackpads emit those
 *   constantly as your fingers lift. Every stray tick demoted you back to
 *   "still arriving", so the bar would refuse to fill and there was no way to
 *   tell why. Arming is now cleared only by actually leaving the bottom,
 *   which is the one thing that unambiguously means you are not there any
 *   more.
 *
 * The link is always clickable, and the whole behaviour is disabled under
 * prefers-reduced-motion.
 */
export default function NextPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const pulled = useRef(0);
  const navigated = useRef(false);

  const current = normalise(pathname);
  const index = ORDER.findIndex((entry) => entry.href === current);
  const next = index >= 0 ? ORDER[(index + 1) % ORDER.length] : null;

  useEffect(() => {
    if (!next) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let gapTimer;
    let decayTimer;
    let armed = false;

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - SLACK;

    const empty = () => {
      pulled.current = 0;
      setProgress(0);
    };

    // Leaving the bottom is the only thing that puts us back to square one.
    const onScroll = () => {
      if (atBottom()) return;
      armed = false;
      clearTimeout(gapTimer);
      clearTimeout(decayTimer);
      empty();
    };

    const onWheel = (event) => {
      if (navigated.current || !atBottom()) return;
      // Upward ticks at the bottom are noise from a lifting hand, not intent.
      if (event.deltaY <= 0) return;

      if (!armed) {
        // Pushed back by every event, so it can only fire once the flick that
        // delivered us here has finished.
        clearTimeout(gapTimer);
        gapTimer = setTimeout(() => {
          armed = atBottom();
        }, GESTURE_GAP);
        return;
      }

      pulled.current = Math.min(
        PULL,
        pulled.current + Math.min(event.deltaY, MAX_STEP)
      );
      setProgress(pulled.current / PULL);

      clearTimeout(decayTimer);
      decayTimer = setTimeout(empty, DECAY);

      if (pulled.current >= PULL) {
        navigated.current = true;
        router.push(next.href);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(gapTimer);
      clearTimeout(decayTimer);
    };
  }, [next, router]);

  if (!next) return null;

  return (
    <section className="next-page">
      <Link href={next.href} className="next-card reveal">
        <span className="page-link-kicker">Next · {next.kicker}</span>
        <span className="next-title">{next.label}</span>
        <span className="page-link-go">
          Keep scrolling, or click <RiArrowRightLine size={14} />
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
