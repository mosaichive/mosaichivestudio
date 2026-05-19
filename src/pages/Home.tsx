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
              alternateName: ['Mosaic Hive', 'Mosaic06 Studio'],
              url: getAbsoluteUrl('/'),
              logo: getDefaultSocialImageUrl(),
              image: getDefaultSocialImageUrl(),
              email: 'mosaichive@gmail.com',
              telephone: '+233544909011',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Accra',
                addressCountry: 'GH',
              },
              description:
                'Creative agency in Accra, Ghana building identity systems, websites, campaigns, motion and digital product experiences.',
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
              areaServed: ['Accra', 'Ghana', 'Worldwide'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Accra',
                addressCountry: 'GH',
              },
              description:
                'Brand identity design, website design, campaign creative, motion and digital product design for ambitious organizations in Ghana and beyond.',
            },
          ]),
        }}
      />
    </>
  );
};

export default Home;
