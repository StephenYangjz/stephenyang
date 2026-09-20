'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

// Tuned so that advancing is something you do, not something that happens.
const PULL = 800; // px of deliberate overscroll before advancing
const ARM_IDLE = 260; // wheel silence that marks the end of the flick you arrived on
const DECAY = 650; // stop pushing and the bar unwinds
const MAX_STEP = 90; // ceiling on one event, so a single jolt cannot fill the bar

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Once you reach the bottom, continuing to scroll fills a progress bar and
 * then moves to the next page.
 *
 * The thing that makes this feel like a trap is momentum. A trackpad flick
 * keeps firing wheel events long after the page has stopped at the bottom,
 * so counting every event means the same gesture that brought you to the end
 * carries you off it. Hence arming: while at the bottom, wheel input is
 * ignored until it has fallen silent for a moment. That silence is the end
 * of the flick you arrived on, and only what comes after it counts.
 *
 * Beyond that, a single event contributes at most MAX_STEP, so one jolt from
 * a mouse wheel or a jumpy driver cannot fill the bar on its own; the bar
 * unwinds if you stop pushing; and scrolling up, or leaving the bottom at
 * all, disarms and resets it.
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

      pulled.current = Math.min(
        PULL,
        pulled.current + Math.min(event.deltaY, MAX_STEP)
      );
      setProgress(pulled.current / PULL);

      clearTimeout(decay);
      decay = setTimeout(reset, DECAY);

      if (pulled.current >= PULL) {
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
