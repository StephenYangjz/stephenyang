import Image from 'next/image';
import { leadPhoto } from '@/website.config';
import { RiArrowDownLine } from '@remixicon/react';

/**
 * The photograph is the page's ground, not an inset figure.
 *
 * Fading a night photograph into pale paper never looked right — whatever
 * curve the gradient takes, the image still ends in white. So it doesn't
 * fade at all now: it sits behind everything at full strength while the
 * content sheet scrolls up and occludes it. The transition is an object
 * moving over the photo rather than the photo dissolving.
 */
export default function PersonalHero() {
  if (!leadPhoto) return null;

  return (
    <div className="ph-hero">
      <div className="ph-media">
        <Image
          src={leadPhoto.src}
          alt={leadPhoto.caption || ''}
          fill
          priority
          sizes="100vw"
          className="ph-img"
        />
      </div>

      <div className="ph-scrim" aria-hidden="true" />

      <div className="ph-copy shell">
        <p className="ph-kicker">Off the clock</p>
        <h1 className="ph-title">Personal</h1>
        <p className="ph-note">
          Photography, things worth reading, and thoughts that have not gone
          anywhere yet.
        </p>

        <p className="ph-credit">
          {leadPhoto.caption}
          {leadPhoto.place ? ` · ${leadPhoto.place}` : ''}
          {leadPhoto.year ? ` · ${leadPhoto.year}` : ''}
        </p>
      </div>

      <div className="ph-cue" aria-hidden="true">
        <RiArrowDownLine size={14} />
      </div>
    </div>
  );
}
