import Image from 'next/image';
import { personalInfo } from '@/website.config';
import {
  RiMailLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXLine,
  RiGraduationCapLine,
  RiArrowRightUpLine,
  RiArrowDownLine,
} from '@remixicon/react';

const ICON = {
  Email: RiMailLine,
  GitHub: RiGithubFill,
  LinkedIn: RiLinkedinBoxFill,
  Twitter: RiTwitterXLine,
  'Google Scholar': RiGraduationCapLine,
};

/**
 * Pinned dolly hero. The track is taller than the viewport and the stage
 * sticks inside it, so the page keeps scrolling while the name pushes
 * toward the viewer and dissolves. Scale plus blur is what makes it read
 * as camera movement rather than a resize.
 */
export default function HeroPinned() {
  return (
    <section className="pin-track" style={{ height: '185svh' }}>
      <div className="pin-stage">
        <div className="shell w-full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20">
            <div className="hero-dolly min-w-0">
              <div>
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
                  className="mt-3 text-[15.5px] max-w-[42ch]"
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
            </div>

            {personalInfo.profilePicture && (
              <Image
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName}
                  width={200}
                  height={200}
                  priority
                  className="portrait-drift order-first h-[124px] w-[124px] rounded-[30px] object-cover lg:order-last lg:h-[200px] lg:w-[200px] lg:rounded-[44px]"
                style={{
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                }}
              />
            )}
          </div>

          <div
            className="hero-dolly mt-16 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: 'var(--muted)' }}
          >
            <RiArrowDownLine size={13} />
            Scroll
          </div>
        </div>
      </div>
    </section>
  );
}
