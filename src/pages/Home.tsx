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
import { getAbsoluteUrl } from '@/lib/site';

const Home = () => {
  useSEO({
    title: 'Mosaic06 Studio · Editorial digital studio for ambitious brands',
    description:
      'Mosaic06 is an editorial digital studio working across identity, websites, campaigns, motion, content and product interfaces for ambitious brands and mission-led teams.',
    path: '/',
  });

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

      {/* Organisation JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: 'Mosaic06 Studio',
            description:
              'Editorial digital studio working across identity, websites, campaigns, motion and product experiences.',
            url: getAbsoluteUrl('/'),
          }),
        }}
      />
    </>
  );
};

export default Home;
