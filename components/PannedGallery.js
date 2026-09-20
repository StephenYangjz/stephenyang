import Image from 'next/image';
import { photography, pages } from '@/website.config';

/**
 * Vertical scroll mapped to horizontal travel, inside a pinned stage. The
 * rail is wider than the viewport, so `--pan-end` is how far it must move
 * for the last frame to land on screen.
 */
export default function PannedGallery() {
  if (!photography?.length) return null;

  return (
    <section className="pin-track" style={{ height: '340svh' }}>
      <div className="pin-stage">
        <div className="gallery-head">
          <div className="gallery-lead">
            <span className="rail-label">{pages.personal.photographyLabel}</span>
            <span className="gallery-count">
              {String(photography.length).padStart(2, '0')} frames · scroll →
            </span>
          </div>
        </div>

        {/* No top margin: the heading is positioned out of flow, so any
            margin here only shifts the rail off centre. */}
        <div>
          <div className="pan-rail pan-x">
            {photography.map((photo) => (
              <figure key={photo.src} className="pan-card">
                <Image
                  src={photo.src}
                  alt={photo.caption || ''}
                  fill
                  sizes="(max-width: 720px) 80vw, 520px"
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
