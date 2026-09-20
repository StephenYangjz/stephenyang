'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { visitorMap } from '@/website.config';

/**
 * Where people are reading from, as a small mark in the colophon line.
 *
 * MapMyVisitors' image embed: fetching the PNG is what records the visit, so
 * there is no third-party script on the page — one small image is the entire
 * cost. The globe embed was the first attempt and is worth not repeating; it
 * ships 168KB plus jQuery and then draws nothing, because the data call it
 * makes returns an HTML page rather than the JSONP it parses.
 *
 * Renders a bare <a> with no wrapper, because it sits inline inside the
 * colophon sentence rather than owning any layout of its own.
 *
 * Two source URLs, because the generated PNG cannot have a transparent
 * background and a flat light rectangle in a dark footer looks like a missing
 * asset. Only the one matching the active theme is rendered, so a reader is
 * still counted exactly once per load. Rendering waits for mount: the theme
 * is not known during SSR, and guessing it would both mismatch hydration and
 * risk fetching the wrong image first — which would count the visit twice.
 */
export default function VisitorMap() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!visitorMap?.enabled || !mounted) return null;

  const src = resolvedTheme === 'dark' ? visitorMap.dark : visitorMap.light;
  if (!src) return null;

  return (
    <a
      href={visitorMap.href}
      target="_blank"
      rel="noopener noreferrer"
      className="visitor-map-frame"
      title={visitorMap.label}
      aria-label={visitorMap.label}
    >
      {/* Not next/image: the PNG is generated per request by a third party,
          and the request itself is the tracking call. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" />
    </a>
  );
}
