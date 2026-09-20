import HeroPinned from '@/components/HeroPinned';
import AboutBlock from '@/components/AboutBlock';
import Section from '@/components/Section';
import PageLinks from '@/components/PageLinks';
import NextPage from '@/components/NextPage';
import NewsMd from '@/data/home/News.mdx';

export default function Page() {
  return (
    <main>
      <HeroPinned />

      <div className="shell flex flex-col gap-24 pb-8 md:gap-32">
        <AboutBlock />

        <Section id="news" label="News">
          <div className="prose-body news-list">
            <NewsMd />
          </div>
        </Section>

        <Section id="more" label="Elsewhere">
          <PageLinks />
        </Section>

        <NextPage />
      </div>
    </main>
  );
}
