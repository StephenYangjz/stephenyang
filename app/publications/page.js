import Masthead from '@/components/Masthead';
import NextPage from '@/components/NextPage';
import Publications from '@/components/Publications';
import { pages } from '@/website.config';
import bibtex from '@/data/bib/Publications.bib';

export const metadata = {
  title: pages.research.title,
  description: pages.research.note,
};

export default function Page() {
  return (
    <main className="shell pb-32">
      <Masthead
        kicker={pages.research.kicker}
        title={pages.research.title}
        note={pages.research.note}
      />
      <Publications bibtex={bibtex} />

      <NextPage />
    </main>
  );
}
