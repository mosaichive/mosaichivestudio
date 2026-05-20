import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import StudioIntro from '@/components/StudioIntro';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import TrustLogos from '@/components/TrustLogos';
import ConversionCTA from '@/components/ConversionCTA';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import { useStructuredData } from '@/hooks/useStructuredData';
import { useSiteSettings } from '@/hooks/useStudioContent';
import { buildHomeStructuredData } from '@/lib/studioProfile';

const Home = () => {
  const { data: settings } = useSiteSettings();

  useSEO({
    title: 'Branding & Web Design Agency in Accra, Ghana | Mosaic06 Studio',
    description:
      'Mosaic06 Studio is a creative agency in Accra, Ghana delivering brand identity, website design, campaigns, motion and digital product experiences for ambitious organizations.',
    path: '/',
    keywords: [
      'Mosaic Hive',
      'Mosaic06 Studio',
      'branding agency in Accra',
      'web design agency Ghana',
      'creative agency Ghana',
    ],
  });

  useStructuredData(buildHomeStructuredData(settings));

  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main>
        {/* Work-first editorial flow: hero poster → selected work → studio → proof → trust → voices → CTA */}
        <Hero />
        <FeaturedWork />
        <StudioIntro />
        <WhyChooseUs />
        <TrustLogos />
      <Testimonials />
      <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
