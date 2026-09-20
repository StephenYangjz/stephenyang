import Image from 'next/image';
import { photography, photographyLink } from '@/website.config';
import { RiArrowRightUpLine } from '@remixicon/react';

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
        <div className="shell w-full">
          <div className="gallery-lead">
            <span className="rail-label">Photography</span>
            <span className="gallery-count">
              {String(photography.length).padStart(2, '0')} frames · scroll →
            </span>
            {photographyLink && (
              <a
                href={photographyLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-link"
              >
                {photographyLink.label}
              </a>
            )}
          </div>
        </div>

        <div className="mt-5">
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
