'use client';

import { RiArrowDownLine } from '@remixicon/react';

/**
 * Floating glass cue at the foot of the first screen.
 *
 * Fades and drops away on its own scroll timeline rather than a class
 * toggle, so it tracks the scroll position continuously instead of snapping
 * at a threshold — the same mistake that made the header name flash.
 * Clicking it scrolls one screen down for anyone who would rather not drag.
 */
export default function ScrollCue() {
  const onClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.92,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="scroll-cue glass"
      aria-label="Scroll down"
    >
      <span className="scroll-cue-icon">
        <RiArrowDownLine size={16} />
      </span>
    </button>
  );
}
