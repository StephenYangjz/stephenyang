import Masthead from '@/components/Masthead';
import Publications from '@/components/Publications';
import bibtex from '@/data/bib/Publications.bib';

export const metadata = {
  title: 'Publications',
  description: 'Papers, patents, and other work by Stephen Jiezhi Yang.',
};

export default function Page() {
  return (
    <main className="shell pb-32">
      <Masthead
        kicker="Research"
        title="Publications"
        note="Work on 3D foundation models, feed-forward reconstruction, and world models for driving. Preprints are listed at their accepted venue once a venue exists."
      />
      <Publications bibtex={bibtex} />
    </main>
  );
}
