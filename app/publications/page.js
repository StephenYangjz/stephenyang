import Masthead from '@/components/Masthead';
import NextPage from '@/components/NextPage';
import Publications from '@/components/Publications';
import bibtex from '@/data/bib/Publications.bib';

export const metadata = {
  title: 'Research',
  description: 'Papers, patents, and other work by Stephen Jiezhi Yang.',
};

export default function Page() {
  return (
    <main className="shell pb-32">
      <Masthead
        kicker="Research"
        title="Research"
        note="Geometric foundation models, world models, among others. Preprints are listed at their accepted venue once one exists."
      />
      <Publications bibtex={bibtex} />

      <NextPage />
    </main>
  );
}
