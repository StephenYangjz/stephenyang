import Masthead from '@/components/Masthead';
import NextPage from '@/components/NextPage';
import Section from '@/components/Section';
import {
  ExperienceList,
  EducationList,
  HonorsList,
} from '@/components/Timeline';
import { personalInfo, pages } from '@/website.config';
import { RiArrowRightUpLine } from '@remixicon/react';

export const metadata = {
  title: pages.cv.title,
  description: 'Experience, education, and honors.',
};

export default function Page() {
  return (
    <main className="shell pb-32">
      <Masthead
        kicker={pages.cv.kicker}
        title={pages.cv.title}
        note={`Currently ${personalInfo.role.toLowerCase()} at ${personalInfo.university}.`}
      />

      <a
        href={personalInfo.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn -mt-6 mb-16"
      >
        <RiArrowRightUpLine size={14} />
        {pages.cv.downloadLabel}
      </a>

      <div className="flex flex-col gap-24 md:gap-28">
        <Section id="experience" label={pages.cv.experienceLabel}>
          <ExperienceList />
        </Section>

        <Section id="education" label={pages.cv.educationLabel}>
          <EducationList />
        </Section>

        <Section id="honors" label={pages.cv.honorsLabel}>
          <HonorsList />
        </Section>
      </div>

      <NextPage />
    </main>
  );
}
