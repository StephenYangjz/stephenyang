import Section from '@/components/Section';
import { ReadingList, NotesList } from '@/components/Personal';
import MiscellaneousMd from '@/data/home/Miscellaneous.mdx';

export const metadata = { title: 'Miscellaneous' };

export default function Page() {
  return (
    <main className="shell pb-28 pt-36 md:pt-44">
      <div className="flex flex-col gap-24 md:gap-32">
        <Section id="misc" label="Off the clock">
          <div className="prose-body max-w-[64ch]">
            <MiscellaneousMd />
          </div>
        </Section>

        <Section id="reading" label="Reading">
          <ReadingList />
        </Section>

        <Section id="notes" label="Notes">
          <NotesList />
        </Section>
      </div>
    </main>
  );
}
