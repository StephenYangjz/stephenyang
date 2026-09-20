import AboutMd from '@/data/home/About.mdx';
import NewsMd from '@/data/home/News.mdx';
import { personalInfo } from '@/website.config';
import { RiArrowRightUpLine } from '@remixicon/react';

const FACTS = [
  ['Role', `${personalInfo.role}, ${personalInfo.university}`],
  ['Based in', personalInfo.location],
  ['Focus', personalInfo.tagline],
  ['Previously', 'Google XR · Applied Intuition · Harvard · BAIR'],
];

function Glance() {
  return (
    <div className="glass glass-sheen relative overflow-hidden rounded-[22px] p-6">
      <p className="rail-label">At a glance</p>

      <dl className="mt-5 flex flex-col gap-4">
        {FACTS.map(([label, value]) => (
          <div key={label}>
            <dt
              className="text-[11px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: 'var(--muted)' }}
            >
              {label}
            </dt>
            <dd
              className="mt-1 text-[14px] leading-snug"
              style={{ color: 'var(--text-soft)' }}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={personalInfo.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          <RiArrowRightUpLine size={14} />
          CV
        </a>
        <a href={personalInfo.socialMedia[0].url} className="social-btn">
          <RiArrowRightUpLine size={14} />
          Email
        </a>
      </div>
    </div>
  );
}

/**
 * Bio and News share one two-column region so the sticky card carries
 * across both. News on its own left a very wide empty right margin, which
 * is what made it read as sparse.
 */
export default function AboutNews() {
  return (
    <section
      id="about"
      className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20"
    >
      <div className="min-w-0">
        <div className="bio-reveal prose-body text-[16px] md:text-[17px]">
          <AboutMd />
        </div>

        <div id="news" className="mt-20">
          <p className="rail-label reveal">News</p>
          <div className="news-list prose-body bio-reveal mt-5">
            <NewsMd />
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Glance />
      </aside>
    </section>
  );
}
