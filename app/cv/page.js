import Masthead from '@/components/Masthead';
import NextPage from '@/components/NextPage';
import Section from '@/components/Section';
import {
  ExperienceList,
  EducationList,
  HonorsList,
} from '@/components/Timeline';
import { personalInfo } from '@/website.config';
import { RiArrowRightUpLine } from '@remixicon/react';

export const metadata = {
  title: 'CV',
  description: 'Experience, education, and honors.',
};

export default function Page() {
  return (
    <main className="shell pb-32">
      <Masthead
        kicker="Background"
        title="CV"
        note={`Currently ${personalInfo.role.toLowerCase()} at ${personalInfo.university}.`}
      />

      <a
        href={personalInfo.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn -mt-6 mb-16"
      >
        <RiArrowRightUpLine size={14} />
        Download CV (PDF)
      </a>

      <div className="flex flex-col gap-24 md:gap-28">
        <Section id="experience" label="Experience">
          <ExperienceList />
        </Section>

        <Section id="education" label="Education">
          <EducationList />
        </Section>

        <Section id="honors" label="Honors">
          <HonorsList />
        </Section>
      </div>

      <NextPage />
    </main>
  );
}
