'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Cross-fades between pages using the View Transitions API.
 *
 * The awkward part is timing. `startViewTransition` snapshots the page, runs
 * its callback, then snapshots again — but `router.push` is asynchronous, so
 * a naive callback returns before React has rendered anything and both
 * snapshots come out identical. The callback here returns a promise that is
 * only resolved once the pathname has actually changed, which holds the
 * transition open until the new page is on screen.
 *
 * Degrades to ordinary navigation where the API is missing (Firefox, older
 * Safari) and where the reader prefers reduced motion.
 */
export default function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef(null);

  // Release the transition once the new route has committed.
  useEffect(() => {
    if (resolveRef.current) {
      const resolve = resolveRef.current;
      resolveRef.current = null;
      // One frame so the browser paints the new DOM before it un-freezes.
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined' || !document.startViewTransition) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onClick = (event) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = event.target.closest?.('a');
      if (!anchor || !anchor.href) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page, or a jump to an anchor on it — let the browser scroll.
      if (url.pathname === window.location.pathname) return;

      // Capture phase, so this runs before Next's Link handler. Stopping
      // propagation keeps Link from navigating as well and racing this.
      event.preventDefault();
      event.stopPropagation();

      document.startViewTransition(
        () =>
          new Promise((resolve) => {
            resolveRef.current = resolve;
            router.push(url.pathname + url.search + url.hash);
          })
      );
    };

    // Capture phase: Next's Link calls preventDefault on the way up, so a
    // bubble-phase listener sees defaultPrevented and never fires.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}
