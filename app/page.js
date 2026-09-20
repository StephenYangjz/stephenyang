import HomeHero from '@/components/HomeHero';
import HomeBody from '@/components/HomeBody';
import NextPage from '@/components/NextPage';

export default function Page() {
  return (
    <main className="shell pb-16">
      <HomeHero />
      <HomeBody />
      <NextPage />
    </main>
  );
}
