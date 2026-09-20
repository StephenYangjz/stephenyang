'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

// A single gesture never advances, however far it carries. Once it has died
// out at the bottom, the next one does, immediately.
const ARM_IDLE = 170; // wheel silence that marks the end of the gesture you arrived on
const NUDGE = 60; // px in the new gesture — enough that a stray tick is not a push
const DECAY = 400; // a lone tick that goes nowhere unwinds

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * At the bottom of the page, one more scroll moves to the next page.
 *
 * The rule is about gestures, not distance: a single gesture never advances,
 * however far it carries, and the one after it advances immediately. That is
 * what stops the page turning by accident, because the thing that used to
 * turn it was momentum — a trackpad flick keeps delivering wheel events long
 * after the page has stopped against the bottom, so the gesture that brought
 * you to the end carried you off it.
 *
 * Separating the two is a matter of listening for the silence between them.
 * While at the bottom, wheel input is ignored until it has been quiet for
 * ARM_IDLE; every event pushes that timer back, so it cannot elapse mid-flick,
 * and momentum events arrive far closer together than that. Once it does
 * elapse, the gesture is over and anything further is a fresh one.
 *
 * NUDGE is only there so that a stray tick or a jittery wheel is not mistaken
 * for a gesture; it is a fraction of any real scroll, and unwinds on its own.
 * Scrolling up, or leaving the bottom, resets everything.
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

    let decay;
    let armIdle;
    let armed = false;

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    const reset = () => {
      pulled.current = 0;
      setProgress(0);
    };

    const disarm = () => {
      armed = false;
      clearTimeout(armIdle);
      clearTimeout(decay);
      reset();
    };

    const onWheel = (event) => {
      if (navigated.current) return;

      // Scrolling up, or no longer pinned to the bottom: start over.
      if (event.deltaY <= 0 || !atBottom()) {
        disarm();
        return;
      }

      if (!armed) {
        // Wait for the wheel to fall silent before counting anything. Every
        // event pushes this timer back, so it can only fire once the flick
        // that delivered you here has fully decayed.
        clearTimeout(armIdle);
        armIdle = setTimeout(() => {
          armed = atBottom();
        }, ARM_IDLE);
        return;
      }

      pulled.current = Math.min(NUDGE, pulled.current + event.deltaY);
      setProgress(pulled.current / NUDGE);

      clearTimeout(decay);
      decay = setTimeout(reset, DECAY);

      if (pulled.current >= NUDGE) {
        navigated.current = true;
        router.push(next.href);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(decay);
      clearTimeout(armIdle);
    };
  }, [next, router]);

  if (!next) return null;

  return (
    <section className="next-page">
      <Link href={next.href} className="next-card reveal">
        <span className="page-link-kicker">Next · {next.kicker}</span>
        <span className="next-title">{next.label}</span>
        <span className="page-link-go">
          Scroll again, or click <RiArrowRightLine size={14} />
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
