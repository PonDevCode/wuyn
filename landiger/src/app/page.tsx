import Header from '@/components/Header';
import StructuredData from '@/components/StructuredData';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Solution from '@/components/Solution';
import Industries from '@/components/Industries';
import Why from '@/components/Why';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Solution />
        <Industries />
        <Why />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
