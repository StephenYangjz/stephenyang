import Image from 'next/image';
import { personalInfo } from '@/website.config';
import {
  RiMailLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXLine,
  RiGraduationCapLine,
  RiArrowRightUpLine,
} from '@remixicon/react';

const ICON = {
  Email: RiMailLine,
  GitHub: RiGithubFill,
  LinkedIn: RiLinkedinBoxFill,
  X: RiTwitterXLine,
  'Google Scholar': RiGraduationCapLine,
};

/**
 * A held stage rather than a section that scrolls away: the page keeps
 * moving while the hero stays put and dissolves, so the transition is the
 * dissolve rather than the scroll.
 *
 * Nothing translates or scales. An earlier version lifted and zoomed the
 * hero as it faded and it read as a fault — text sliding out from under you
 * next to an image that behaved differently. Opacity and blur only, applied
 * to the whole stage at once so every part of it goes together.
 */
export default function HomeHero() {
  return (
    <section className="hero-track">
      <div className="hero-stage">
        <div className="hero-dissolve w-full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20">
            <div className="min-w-0">
              <h1 className="display">{personalInfo.name}</h1>

              <p className="mt-6 text-[18px] md:text-[21px] tracking-[-0.02em]">
                <span style={{ color: 'var(--text-soft)' }}>
                  {personalInfo.role} at{' '}
                </span>
                <a
                  href={personalInfo.universityWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium"
                  style={{ color: 'var(--accent)' }}
                >
                  {personalInfo.university}
                </a>
              </p>

              <p
                className="mt-3 max-w-[42ch] text-[15.5px]"
                style={{ color: 'var(--muted)' }}
              >
                {personalInfo.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {personalInfo.socialMedia.map((social) => {
                  const Icon = ICON[social.name] ?? RiArrowRightUpLine;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                    >
                      <Icon size={14} />
                      {social.name === 'Google Scholar'
                        ? 'Scholar'
                        : social.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {personalInfo.profilePicture && (
              <div className="portrait-wrap order-first lg:order-last">
                <Image
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName}
                  width={824}
                  height={892}
                  priority
                  className="portrait-frame"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
