'use client';

import { useEffect } from 'react';

/**
 * Owns every imperative scroll concern on the page:
 *
 *  - toggles `.is-scrolled` on <html> so the header pill can morph
 *  - marks `.no-sda` when the browser lacks scroll-driven animations, which
 *    switches the CSS over to a transition-based fallback
 *  - runs the IntersectionObserver that drives that fallback
 *
 * Everything continuous (row reveals, rail progress, hero recede, ambient
 * drift) is native CSS on the compositor wherever it is supported — this
 * component is only the safety net plus the one genuinely discrete bit of
 * state, which is whether the page has been scrolled at all.
 */
export default function ScrollBoot() {
  useEffect(() => {
    const root = document.documentElement;

    const supportsSDA =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('animation-timeline', 'view()');

    if (!supportsSDA) root.classList.add('no-sda');

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        root.classList.toggle('is-scrolled', window.scrollY > 80);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

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
        .querySelectorAll('.reveal, .reveal-lag')
        .forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return null;
}
