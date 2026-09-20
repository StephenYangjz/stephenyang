import Masthead from '@/components/Masthead';
import Section from '@/components/Section';
import PannedGallery from '@/components/PannedGallery';
import { ReadingList, NotesList } from '@/components/Personal';
import MiscellaneousMd from '@/data/home/Miscellaneous.mdx';

export const metadata = {
  title: 'Personal',
  description: 'Photography, reading, and notes.',
};

export default function Page() {
  return (
    <main className="pb-32">
      <div className="shell">
        <Masthead
          kicker="Off the clock"
          title="Personal"
          note="Photography, things worth reading, and thoughts that have not gone anywhere yet."
        />
      </div>

      <PannedGallery />

      <div className="shell mt-24 flex flex-col gap-24 md:gap-28">
        <Section id="reading" label="Reading">
          <ReadingList />
        </Section>

        <Section id="notes" label="Notes">
          <NotesList />
        </Section>

        <Section id="misc" label="Elsewhere">
          <div className="prose-body max-w-[64ch]">
            <MiscellaneousMd />
          </div>
        </Section>
      </div>
    </main>
  );
}
