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
import {
  SITE_NAME,
  getAbsoluteUrl,
  getDefaultSocialImageUrl,
} from '@/lib/site';

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
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: getAbsoluteUrl('/'),
              logo: getDefaultSocialImageUrl(),
              image: getDefaultSocialImageUrl(),
              email: 'mosaichive@gmail.com',
              telephone: '+233544909011',
              description:
                'Editorial digital studio building identity systems, websites, campaigns, motion and product experiences for ambitious brands.',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: getAbsoluteUrl('/'),
              inLanguage: 'en',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: SITE_NAME,
              url: getAbsoluteUrl('/'),
              image: getDefaultSocialImageUrl(),
              areaServed: 'Worldwide',
              description:
                'Brand identity, websites, campaigns, motion, content and product interface design for ambitious organizations.',
            },
          ]),
        }}
      />
    </>
  );
};

export default Home;
