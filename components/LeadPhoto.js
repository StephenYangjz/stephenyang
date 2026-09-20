import Image from 'next/image';
import { leadPhoto } from '@/website.config';

/**
 * Full-bleed lead photograph.
 *
 * The band behind it is deliberately near-black rather than the page
 * colour. Feathering a night photograph straight into pale paper produces a
 * muddy grey halo — the image has nowhere to fade *to*. Giving it a dark
 * band to sit in means the photo blends into darkness at its own edges, and
 * the band is what blends into the page, top and bottom.
 */
export default function LeadPhoto() {
  if (!leadPhoto) return null;

  return (
    <figure className="lead">
      <div className="lead-media">
        <Image
          src={leadPhoto.src}
          alt={leadPhoto.caption || ''}
          width={leadPhoto.width || 2000}
          height={leadPhoto.height || 1333}
          priority
          sizes="100vw"
          className="lead-img"
        />
      </div>

      <figcaption className="lead-caption">
        <span className="lead-kicker">Photography</span>
        <h2 className="lead-title">{leadPhoto.caption}</h2>
        <p className="lead-meta">
          {leadPhoto.place}
          {leadPhoto.place && leadPhoto.year ? ' · ' : ''}
          {leadPhoto.year}
        </p>
      </figcaption>
    </figure>
  );
}
