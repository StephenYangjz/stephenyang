'use client';

import { useEffect } from 'react';

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Where `animation-timeline` exists (Chrome, Edge, Safari 26+) every
 * continuous effect is native CSS running on the compositor and this
 * component does almost nothing.
 *
 * Where it does not, this writes the same 0→1 progress values onto the
 * elements as CSS custom properties so the `.no-sda` rules can reproduce
 * the effects. Both paths stay visually equivalent — the earlier version
 * only had a fallback for row reveals, so Safari users saw the page with
 * no hero dolly, no rail progress, and no pinned panels at all.
 */
export default function ScrollBoot() {
  useEffect(() => {
    const root = document.documentElement;

    const supportsSDA =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('animation-timeline', 'view()');

    if (!supportsSDA) root.classList.add('no-sda');

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Hysteresis: a single threshold re-fires the transition every time you
    // cross it, which is what made the header name flash.
    let scrolled = false;
    const ENTER = 140;
    const EXIT = 70;

    let ticking = false;

    const frame = () => {
      ticking = false;
      const y = window.scrollY;

      if (!scrolled && y > ENTER) {
        scrolled = true;
        root.classList.add('is-scrolled');
      } else if (scrolled && y < EXIT) {
        scrolled = false;
        root.classList.remove('is-scrolled');
      }

      if (supportsSDA || reduced) return;

      // Pinned tracks: progress across the portion where the stage is held.
      document.querySelectorAll('.pin-track').forEach((track) => {
        const rect = track.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        const p = travel > 0 ? clamp01(-rect.top / travel) : 0;
        track.style.setProperty('--p', String(p));

        track.querySelectorAll('.hero-dolly, .pan-x').forEach((el) => {
          el.style.setProperty('--p', String(p));
        });

        const panels = track.querySelectorAll('.panel-cycle');
        if (panels.length) {
          const slice = 1 / panels.length;
          panels.forEach((panel, i) => {
            const local = clamp01((p - i * slice) / slice);
            // triangular: fade in, hold, fade out
            const o =
              local < 0.18
                ? local / 0.18
                : local > 0.82
                  ? (1 - local) / 0.18
                  : 1;
            panel.style.setProperty('--panel-o', String(clamp01(o)));
          });
        }
      });

      // Section rails
      document.querySelectorAll('.section-tracked').forEach((section) => {
        const rect = section.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        const p =
          travel > 0
            ? clamp01(-rect.top / travel)
            : clamp01(
                (window.innerHeight - rect.top) /
                  (window.innerHeight + rect.height)
              );
        section.style.setProperty('--p', String(p));
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    let observer;
    if (!supportsSDA) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px' }
      );

      document
        .querySelectorAll('.reveal, .reveal-lag, .hero-reveal')
        .forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return null;
}
