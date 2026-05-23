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
import SectionTransition from '@/components/SectionTransition';
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
        <SectionTransition tone="secondary">
          <FeaturedWork />
        </SectionTransition>
        <SectionTransition tone="primary" className="-mt-6 md:-mt-10">
          <StudioIntro />
        </SectionTransition>
        <SectionTransition tone="neutral" className="-mt-6 md:-mt-8">
          <WhyChooseUs />
        </SectionTransition>
        <SectionTransition tone="secondary" className="-mt-6 md:-mt-8">
          <TrustLogos />
        </SectionTransition>
        <SectionTransition tone="primary" className="-mt-6 md:-mt-8">
          <Testimonials />
        </SectionTransition>
        <SectionTransition tone="secondary" className="-mt-6 md:-mt-8">
          <ConversionCTA />
        </SectionTransition>
      </main>
      <Footer />
    </>
  );
};

export default Home;
