import Section from '@/components/Section';
import Publications from '@/components/Publications';
import bibtex from '@/data/bib/Publications.bib';

export const metadata = { title: 'Publications' };

export default function Page() {
  return (
    <main className="shell pb-28 pt-36 md:pt-44">
      <Section id="publications" label="Publications">
        <Publications bibtex={bibtex} />
      </Section>
    </main>
  );
}
