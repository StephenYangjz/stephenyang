import Image from 'next/image';
import { photography, pages } from '@/website.config';

/**
 * Vertical scroll mapped to horizontal travel, inside a pinned stage. The
 * rail is wider than the viewport, so `--pan-end` is how far it must move
 * for the last frame to land on screen.
 *
 * The track's height lives in CSS rather than an inline style. Inline wins
 * over any stylesheet, so while it sat here a phone could not opt out of
 * the 340svh of scrolling the pin needs — and a phone does not pin at all.
 */
export default function PannedGallery() {
  if (!photography?.length) return null;

  return (
    <section className="pin-track">
      <div className="pin-stage">
        <div className="gallery-head">
          <div className="gallery-lead">
            <span className="rail-label">{pages.personal.photographyLabel}</span>
            <span className="gallery-count">
              {String(photography.length).padStart(2, '0')} frames ·{' '}
              <span className="go-scroll">scroll →</span>
              <span className="go-tap">swipe →</span>
            </span>
            {pages.personal.photoCredit && (
              <span className="gallery-credit">
                {pages.personal.photoCredit}
              </span>
            )}
          </div>
        </div>

        {/* No top margin: the heading is positioned out of flow, so any
            margin here only shifts the rail off centre. */}
        <div>
          <div className="pan-rail pan-x">
            {photography.map((photo) => (
              <figure
                key={photo.src}
                className="pan-card"
                style={photo.aspect ? { aspectRatio: photo.aspect } : undefined}
              >
                <Image
                  src={photo.src}
                  alt={[photo.place, photo.year].filter(Boolean).join(', ')}
                  fill
                  sizes="(max-width: 720px) 90vw, 46vw"
                  className="photo-img"
                />
                {(photo.place || photo.year) && (
                  <figcaption className="photo-cap" style={{ opacity: 1, transform: 'none' }}>
                    {photo.place}
                    {photo.place && photo.year ? ' · ' : ''}
                    {photo.year}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
