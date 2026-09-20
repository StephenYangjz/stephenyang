import Image from 'next/image';
import { photography } from '@/website.config';

/**
 * Vertical scroll mapped to horizontal travel, inside a pinned stage. The
 * rail is wider than the viewport, so `--pan-end` is how far it must move
 * for the last frame to land on screen.
 */
export default function PannedGallery() {
  if (!photography?.length) return null;

  return (
    <section className="pin-track" style={{ height: '260svh' }}>
      <div className="pin-stage">
        <div className="shell w-full">
          <span className="rail-label">Photography</span>
        </div>

        <div className="mt-8">
          <div className="pan-rail pan-x">
            {photography.map((photo) => (
              <figure key={photo.src} className="pan-card">
                <Image
                  src={photo.src}
                  alt={photo.caption || ''}
                  fill
                  sizes="420px"
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
