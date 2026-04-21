import React from 'react';
import Navbar from '@/components/Navbar';
import PortfolioGrid from '@/components/PortfolioGrid';
import ConversionCTA from '@/components/ConversionCTA';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import { useSEO } from '@/hooks/useSEO';

const PortfolioPage = () => {
  useSEO({
    title: 'Selected Work · Mosaic06 Studio',
    description:
      'A selection of identity systems, websites, campaigns and digital products designed and built by Mosaic06 Studio.',
    path: '/portfolio',
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
