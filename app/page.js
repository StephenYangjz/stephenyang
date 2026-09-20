import HomeHero from '@/components/HomeHero';
import AboutNews from '@/components/AboutNews';
import Section from '@/components/Section';
import PageLinks from '@/components/PageLinks';
import NextPage from '@/components/NextPage';

export default function Page() {
  return (
    <main className="shell flex flex-col gap-24 pb-8 md:gap-32">
      <HomeHero />
      <AboutNews />

      <Section id="more" label="Elsewhere">
        <PageLinks />
      </Section>

      <NextPage />
    </main>
  );
}
