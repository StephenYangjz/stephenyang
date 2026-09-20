'use client';

import { useState } from 'react';
import { visitorMap } from '@/website.config';

/**
 * Third-party visitor map at the foot of the page.
 *
 * Uses the provider's *image* embed rather than its script embed: an <img>
 * cannot execute anything on the page, which keeps a third party off the
 * site while still showing the map.
 *
 * Renders nothing when `src` is empty, and removes itself if the image
 * fails to load — so an expired or mistyped embed leaves a clean footer
 * rather than a broken-image icon.
 */
export default function VisitorMap() {
  const [failed, setFailed] = useState(false);

  if (!visitorMap?.src || failed) return null;

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={visitorMap.src}
      alt="Map of recent visitor locations"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );

  return (
    <div className="visitor-map">
      <span className="visitor-map-label">{visitorMap.label}</span>
      <span className="visitor-map-frame">
        {visitorMap.href ? (
          <a href={visitorMap.href} target="_blank" rel="noopener noreferrer">
            {image}
          </a>
        ) : (
          image
        )}
      </span>
    </div>
  );
}
