import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

const CareersPage = () => {
  useSEO({
    title: 'Careers · Mosaic06 Studio',
    description:
      'Mosaic06 is a growing creative organization. We are not actively hiring right now, but we keep a curated network of designers, writers and engineers we admire.',
    path: '/careers',
  });

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-24 md:pb-32 border-b border-border/60">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Careers</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                No open roles{' '}
                <span className="italic text-secondary">right now</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We are building a high-calibre creative network and we hire deliberately. There are
                no open positions at the moment, but we keep a curated list of designers, writers,
                motion artists and engineers we'd like to work with.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal as="div" className="lg:col-span-5">
              <p className="eyebrow mb-6">Stay in touch</p>
              <h2 className="display-section text-foreground text-balance">
                Send us your work.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                If your craft feels close to ours, we'd love to see it — even when we're not
                hiring. Share a link to your portfolio and a short note about the kind of work
                you want to do next.
              </p>
            </Reveal>
            <Reveal as="div" className="lg:col-span-6 lg:col-start-7 flex flex-wrap gap-3" delay={0.15}>
              <Link
                to="/portfolio-submission"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
              >
                Submit your portfolio
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="mailto:hello@mosaic06studio.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/25 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all"
              >
                hello@mosaic06studio.com
              </a>
            </Reveal>
          </div>
        </section>

        <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default CareersPage;
