'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { readingOrder } from '@/website.config';

function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/**
 * Slides each page in sideways behind a sweeping band of glass.
 *
 * Direction comes from the nav order, so moving to a later page enters from
 * the right and going back enters from the left — the site reads as a strip
 * you move along rather than a stack of unrelated pages.
 *
 * Keying on the pathname makes React rebuild the subtree, which restarts the
 * animations. No navigation interception and no promise timing: this cannot
 * silently fail the way the View Transitions version did, which Chrome skips
 * outright whenever the document is hidden.
 */
export default function RouteTransition({ children }) {
  const pathname = usePathname();
  const previous = useRef(null);

  const current = normalise(pathname);
  const from = previous.current;

  // Recorded after commit, not during render. React double-invokes render in
  // development, so assigning here would overwrite the previous path on the
  // first pass and the second pass would compare the new path against
  // itself — every navigation came out as "forward".
  useEffect(() => {
    previous.current = current;
  }, [current]);

  const indexOf = (p) =>
    readingOrder.findIndex((entry) => normalise(entry.href) === p);

  const a = indexOf(from);
  const b = indexOf(current);
  // 1 = moving forward through the site, -1 = back
  const dir = from === null || a < 0 || b < 0 || b >= a ? 1 : -1;

  return (
    <>
      {/* Sibling, not a child: the sliding wrapper carries a transform, and
          a position: fixed element inside it would be positioned against
          the wrapper instead of the viewport. */}
      <span
        key={`${current}-sweep`}
        className="route-sweep"
        style={{ '--dir': dir }}
        aria-hidden="true"
      />
      <div
        key={current}
        className="route-shift"
        style={{ '--dir': dir }}
      >
        {children}
      </div>
    </>
  );
}
