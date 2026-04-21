import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

const PodcastPage = () => {
  useSEO({
    title: 'Podcast · Mosaic06 Studio',
    description:
      'A forthcoming Mosaic06 podcast on creative practice, founders and the work of building brands worth remembering.',
    path: '/podcast',
  });

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-32 md:pb-48 border-b border-border/60 min-h-[80vh] flex items-center">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Podcast</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                Conversations on craft,{' '}
                <span className="italic text-secondary">coming soon</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4 space-y-8" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                A small, slow podcast on creative practice, founders and the work of building
                brands worth remembering. First conversations land later this season.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-secondary hover:text-secondary transition-colors"
              >
                Suggest a guest <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PodcastPage;
