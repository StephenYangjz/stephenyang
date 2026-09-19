import Section from '@/components/Section';
import MiscellaneousMd from '@/data/home/Miscellaneous.mdx';

export const metadata = { title: 'Miscellaneous' };

export default function Page() {
  return (
    <main className="shell pb-28 pt-36 md:pt-44">
      <Section id="misc" label="Miscellaneous">
        <div className="prose-body max-w-[64ch]">
          <MiscellaneousMd />
        </div>
      </Section>
    </main>
  );
}
