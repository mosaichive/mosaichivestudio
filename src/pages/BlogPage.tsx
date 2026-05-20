import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

const JournalPage = () => {
  useSEO({
    title: 'Journal | Branding, Web Design & Creative Strategy Insights',
    description:
      'Insights from Mosaic06 Studio on branding, web design, editorial systems, campaigns and creative strategy. New writing coming soon.',
    path: '/blog',
    keywords: ['Mosaic Hive', 'Mosaic06 Studio journal', 'branding insights Ghana', 'web design insights Accra'],
  });

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-24 md:pb-32 border-b border-border/60">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Journal</p>
              <h1 className="display-page text-foreground text-balance">
                Notes from the studio,{' '}
                <span className="italic text-secondary">soon</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4" delay={0.15}>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                We're preparing a sharp editorial library on identity, web systems, motion and the
                strategic work behind brands that endure. The first essays land later this season.
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
