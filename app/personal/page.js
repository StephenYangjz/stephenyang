import PersonalHero from '@/components/PersonalHero';
import NextPage from '@/components/NextPage';
import Section from '@/components/Section';
import PannedGallery from '@/components/PannedGallery';
import { ReadingList } from '@/components/Personal';
import { pages } from '@/website.config';
import MiscellaneousMd from '@/data/home/Miscellaneous.mdx';

export const metadata = {
  title: pages.personal.title,
  description: pages.personal.note,
};

export default function Page() {
  return (
    <main>
      <PersonalHero />

      {/* Rides up over the photograph — the photo is never faded out */}
      <div className="content-sheet">
        <PannedGallery />

        <div className="shell flex flex-col gap-24 md:gap-28">
          <Section id="reading" label={pages.personal.readingLabel}>
            <ReadingList />
          </Section>

          <Section id="misc" label={pages.personal.elsewhereLabel}>
            <div className="prose-body max-w-[64ch]">
              <MiscellaneousMd />
            </div>
          </Section>
        </div>

        <div className="shell pb-16">
          <NextPage />
        </div>
      </div>
    </main>
  );
}
