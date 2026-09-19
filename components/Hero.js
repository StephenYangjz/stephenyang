import Image from 'next/image';
import AboutMd from '@/data/home/About.mdx';
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

export default function Hero() {
  return (
    <section className="pt-36 md:pt-44 lg:pt-52">
      <div className="hero-recede">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-20">
          <div className="min-w-0">
            <h1 className="display">{personalInfo.name}</h1>

            <p className="mt-5 text-[17px] md:text-[19px] tracking-[-0.018em]">
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
              className="mt-2 text-[15px]"
              style={{ color: 'var(--muted)' }}
            >
              {personalInfo.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
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
            <div className="order-first lg:order-last">
              <div className="portrait-drift">
                <Image
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName}
                  width={180}
                  height={180}
                  priority
                  className="h-[124px] w-[124px] rounded-[28px] object-cover lg:h-[180px] lg:w-[180px] lg:rounded-[36px]"
                  style={{
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="prose-body mt-14 max-w-[64ch] text-[15.5px] md:text-[16px]">
          <AboutMd />
        </div>
      </div>
    </section>
  );
}
