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
  Twitter: RiTwitterXLine,
  'Google Scholar': RiGraduationCapLine,
};

/**
 * Deliberately not pinned. An earlier version held the hero and dissolved
 * the name while the portrait stayed put, which read as a rendering fault
 * rather than an effect — text vanishing next to an image that does not is
 * indistinguishable from something failing to paint. It scrolls normally
 * now; the motion budget goes to the bio unveiling instead.
 */
export default function HomeHero() {
  return (
    <section className="hero-dissolve flex min-h-[100svh] flex-col justify-center pt-32 pb-16">
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
                  {social.name === 'Google Scholar' ? 'Scholar' : social.name}
                </a>
              );
            })}
            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <RiArrowRightUpLine size={14} />
              CV
            </a>
          </div>
        </div>

        {personalInfo.profilePicture && (
          <Image
            src={personalInfo.profilePicture}
            alt={personalInfo.fullName}
            width={824}
            height={892}
            priority
            className="portrait-frame order-first lg:order-last"
            style={{
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--glass-shadow-lift)',
            }}
          />
        )}
      </div>
    </section>
  );
}
