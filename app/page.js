import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Publications from '@/components/Publications';
import {
  ExperienceList,
  EducationList,
  HonorsList,
} from '@/components/Timeline';
import { PhotographyGrid } from '@/components/Personal';
import NewsMd from '@/data/home/News.mdx';
import bibtex from '@/data/bib/Publications.bib';

export default function Page() {
  return (
    <main className="shell pb-28">
      <Hero />

      <div className="mt-24 flex flex-col gap-24 md:mt-32 md:gap-32">
        <Section id="publications" label="Publications">
          <Publications bibtex={bibtex} />
        </Section>

        <Section id="news" label="News">
          <div className="prose-body news-list">
            <NewsMd />
          </div>
        </Section>

        <Section id="experience" label="Experience">
          <ExperienceList />
        </Section>

        <Section id="education" label="Education">
          <EducationList />
        </Section>

        <Section id="honors" label="Honors">
          <HonorsList />
        </Section>

        <Section id="photography" label="Photography">
          <PhotographyGrid />
        </Section>
      </div>
    </main>
  );
}
