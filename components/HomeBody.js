import Link from 'next/link';
import LineReveal from '@/components/LineReveal';
import AboutMd from '@/data/home/About.mdx';
import NewsMd from '@/data/home/News.mdx';
import { personalInfo } from '@/website.config';
import { RiArrowRightUpLine, RiArrowRightLine } from '@remixicon/react';

const FACTS = [
  ['Role', `${personalInfo.role}, ${personalInfo.university}`],
  ['Based in', personalInfo.location],
  ['Focus', personalInfo.tagline],
  ['Previously', 'Google XR · Applied Intuition · Harvard · BAIR'],
];

const ELSEWHERE = [
  ['Publications', 'Papers, patents, and other work', '/publications'],
  ['CV', 'Experience, education, and honors', '/cv'],
  ['Personal', 'Photography, reading, and notes', '/personal'],
];

function Glance() {
  return (
    <div className="glass glass-sheen relative overflow-hidden rounded-[22px] p-6">
      <p className="block-label">At a glance</p>

      <dl className="mt-5 flex flex-col gap-4">
        {FACTS.map(([label, value]) => (
          <div key={label}>
            <dt className="glance-key">{label}</dt>
            <dd className="glance-val">{value}</dd>
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
 * Everything below the hero lives in one two-column region so the card can
 * stay fixed beside the whole thing, and so Bio, News and Elsewhere share a
 * single typographic scale — they were previously set at different sizes by
 * different wrappers, which is what made them look mismatched.
 */
export default function HomeBody() {
  return (
    <section
      id="about"
      className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_var(--figure-w)] lg:gap-20"
    >
      <div className="home-column min-w-0">
        {/* Bio and news share ONE reveal sequence. They must also share one
            timeline element: two elements declaring the same
            view-timeline-name puts the name in scope twice, which makes the
            reference ambiguous and silently deactivates the timeline. */}
        <LineReveal className="reveal-seq">
          <div className="prose-body">
            <AboutMd />
          </div>

          <div id="news" className="mt-24">
            <p className="block-label seq-line">News</p>
            <div className="news-list prose-body mt-6">
              <NewsMd />
            </div>
          </div>
        </LineReveal>

        <div id="more" className="mt-24">
          <p className="block-label reveal">Elsewhere</p>
          <div className="mt-6 flex flex-col">
            {ELSEWHERE.map(([title, note, href]) => (
              <Link key={href} href={href} className="elsewhere-row reveal">
                <span className="elsewhere-title">{title}</span>
                <span className="elsewhere-note">{note}</span>
                <RiArrowRightLine size={16} className="elsewhere-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <aside className="glance-rail">
        <Glance />
      </aside>
    </section>
  );
}
