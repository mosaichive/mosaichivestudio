import React from 'react';
import Navbar from '@/components/Navbar';
import PortfolioGrid from '@/components/PortfolioGrid';
import ConversionCTA from '@/components/ConversionCTA';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import SectionTransition from '@/components/SectionTransition';
import { useSEO } from '@/hooks/useSEO';

const PortfolioPage = () => {
  useSEO({
    title: 'Portfolio | Branding, Web Design & Campaign Projects | Mosaic06 Studio',
    description:
      'Browse branding, website design, campaign and digital product projects delivered by Mosaic06 Studio in Accra, Ghana and beyond.',
    path: '/portfolio',
    keywords: [
      'Mosaic Hive',
      'Mosaic06 Studio portfolio',
      'branding portfolio Ghana',
      'web design portfolio Accra',
    ],
  });

  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <PortfolioGrid />
      <SectionTransition tone="secondary" className="-mt-6 md:-mt-8">
        <ConversionCTA />
      </SectionTransition>
      <Footer />
    </>
  );
};

export default PortfolioPage;
