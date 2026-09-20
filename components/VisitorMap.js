'use client';

import { useEffect, useRef } from 'react';
import { visitorMap } from '@/website.config';

/**
 * Third-party visitor globe in the footer.
 *
 * MapMyVisitors only ships a script embed — its image endpoints 404 — so
 * unlike an <img> this really does run their code on the page. Two things
 * keep the cost contained:
 *
 *   It loads lazily. The bundle is ~168KB, which is a meaningful fraction
 *   of everything else the site ships, and it is a footer ornament. The
 *   script is only requested once the footer is near the viewport, so it
 *   costs nothing on first paint and nothing at all for readers who never
 *   scroll that far.
 *
 *   The script id is preserved. The widget looks itself up by
 *   `id="mmvst_globe"` to know where to draw, so injecting it without that
 *   id renders nothing.
 *
 * Checked before wiring: the script contains no document.write, which is
 * what would otherwise make async injection blow away the page.
 *
 * Currently disabled in the config, because the widget does not actually
 * draw: globe.js asks globe_call_home.js for its data and gets an HTML page
 * back instead of JSONP, so nothing inside the globe ever gets a size. That
 * is on their server — it reproduces on a bare page with none of this site's
 * CSS. The integration is left in place so it is a one-word change if the
 * service recovers.
 */
export default function VisitorMap() {
  const host = useRef(null);

  useEffect(() => {
    const node = host.current;
    if (!node || !visitorMap?.enabled || !visitorMap?.script) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const script = document.createElement('script');
        script.id = 'mmvst_globe';
        script.src = visitorMap.script;
        script.async = true;
        node.appendChild(script);
      },
      { rootMargin: '400px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!visitorMap?.enabled || !visitorMap?.script) return null;

  return (
    <div className="visitor-map">
      <span className="visitor-map-label">{visitorMap.label}</span>
      <span ref={host} className="visitor-map-frame" />
    </div>
  );
}
