import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

const JournalPage = () => {
  useSEO({
    title: 'Journal · Mosaic06 Studio',
    description:
      'Notes from the studio on identity, editorial design, web craft and the work we make for ambitious brands. New writing coming soon.',
    path: '/blog',
  });

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-24 md:pb-32 border-b border-border/60">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Journal</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                Notes from the studio,{' '}
                <span className="italic text-secondary">soon</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We're putting together a small set of writing on identity, editorial web
                design, motion and the way we work. The first essays land later this season.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <Reveal as="div" className="max-w-2xl">
              <p className="eyebrow mb-6">In the meantime</p>
              <h2 className="display-section text-foreground text-balance">
                The work is the writing.
              </h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
                Our recent case studies are the most honest read on how we think about brand,
                editorial systems and considered web. Start there.
              </p>
            </Reveal>
          </div>
        </section>

        <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default JournalPage;
