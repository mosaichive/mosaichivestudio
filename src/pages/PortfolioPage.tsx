import React from 'react';
import Navbar from '@/components/Navbar';
import PortfolioGrid from '@/components/PortfolioGrid';
import ConversionCTA from '@/components/ConversionCTA';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
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
      <ConversionCTA />
      <Footer />
    </>
  );
};

export default PortfolioPage;
