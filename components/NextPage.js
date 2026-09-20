'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';

import { readingOrder as ORDER } from '@/website.config';

const PULL = 520; // px of continued scrolling at the bottom before advancing

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Once you reach the bottom, continuing to scroll fills a progress bar and
 * then moves to the next page. It only ever responds to deliberate extra
 * scrolling past the end, shows exactly how far along you are, and unwinds
 * the moment you stop or scroll back — so it never navigates by surprise.
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

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    const onWheel = (event) => {
      if (navigated.current) return;

      if (event.deltaY <= 0) {
        pulled.current = 0;
        setProgress(0);
        return;
      }

      if (!atBottom()) return;

      pulled.current = Math.min(PULL, pulled.current + event.deltaY);
      setProgress(pulled.current / PULL);

      clearTimeout(decay);
      decay = setTimeout(() => {
        pulled.current = 0;
        setProgress(0);
      }, 700);

      if (pulled.current >= PULL) {
        navigated.current = true;
        router.push(next.href);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(decay);
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
