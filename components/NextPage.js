'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const PULL = 420; // px of overscroll that fills the bar
const ARRIVAL_CAP = 0.55; // how far the gesture you arrived on may fill it
const GESTURE_GAP = 110; // wheel silence that marks the end of a gesture
const MAX_STEP = 90; // ceiling on one event, so the bar sweeps rather than jumps

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * At the bottom of the page, scrolling on fills a bar and then moves to the
 * next page.
 *
 * The difficulty is momentum. A trackpad flick keeps delivering wheel events
 * long after the page has stopped against the bottom, so if every event
 * counts, the gesture that brought you to the end carries you off it. The
 * previous fix was to ignore input until the wheel fell silent, which did
 * work, but it meant the bar sat dead at nought while you were already
 * pushing — the arrival read as unresponsive precisely because it was.
 *
 * So the gesture you arrive on is not ignored; it is capped. It fills the bar
 * to ARRIVAL_CAP and stops there, which gives immediate feedback and makes
 * plain that something is happening, while no amount of momentum can finish
 * the job. The cap lifts once the wheel has been quiet for GESTURE_GAP —
 * momentum events arrive an order of magnitude closer together than that, so
 * it can only elapse between gestures, never inside one.
 *
 * Progress does not time out. Once the bar is part-filled it stays that way,
 * so coming back to it a minute later still only costs the remainder. It
 * clears when you scroll up or leave the bottom, which are the two things
 * that actually mean you did not want to go.
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
    // False while the gesture that brought us to the bottom is still running.
    let gestureEnded = false;

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    const reset = () => {
      clearTimeout(gapTimer);
      gestureEnded = false;
      pulled.current = 0;
      setProgress(0);
    };

    const onWheel = (event) => {
      if (navigated.current) return;

      // Scrolling up, or no longer pinned to the bottom: you did not mean it.
      if (event.deltaY <= 0 || !atBottom()) {
        reset();
        return;
      }

      // Every event pushes this back, so it only fires in the gap between one
      // gesture and the next — never inside a single flick's momentum tail.
      clearTimeout(gapTimer);
      gapTimer = setTimeout(() => {
        gestureEnded = true;
      }, GESTURE_GAP);

      const ceiling = gestureEnded ? PULL : PULL * ARRIVAL_CAP;
      pulled.current = Math.min(
        ceiling,
        pulled.current + Math.min(event.deltaY, MAX_STEP)
      );
      setProgress(pulled.current / PULL);

      if (pulled.current >= PULL) {
        navigated.current = true;
        router.push(next.href);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(gapTimer);
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
