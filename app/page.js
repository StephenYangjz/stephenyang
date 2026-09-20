import HeroPinned from '@/components/HeroPinned';
import SelectedWork from '@/components/SelectedWork';
import Section from '@/components/Section';
import PageLinks from '@/components/PageLinks';
import AboutMd from '@/data/home/About.mdx';
import NewsMd from '@/data/home/News.mdx';
import bibtex from '@/data/bib/Publications.bib';

export default function Page() {
  return (
    <main>
      <HeroPinned />

      <div className="shell">
        <section className="hero-reveal max-w-[62ch] pb-8">
          <div className="prose-body text-[16px] md:text-[17px]">
            <AboutMd />
          </div>
        </section>
      </div>

      <SelectedWork bibtex={bibtex} />

      <div className="shell flex flex-col gap-24 pb-32 md:gap-32">
        <Section id="news" label="News">
          <div className="prose-body news-list">
            <NewsMd />
          </div>
        </Section>

        <Section id="more" label="More">
          <PageLinks />
        </Section>
      </div>
    </main>
  );
}
