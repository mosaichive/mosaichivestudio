import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useClientLogos } from '@/hooks/useStudioContent';
import { useSEO } from '@/hooks/useSEO';

const ClientsPage = () => {
  useSEO({
    title: 'Clients · Mosaic06 Studio',
    description:
      'Foundations, founders and ambitious teams Mosaic06 has shaped brand and digital work for.',
    path: '/clients',
  });

  const { data: logos } = useClientLogos({ onlyPublished: true });
  const list = logos ?? [];

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-20 md:pb-28 border-b border-border/60">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Clients</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                A small list of{' '}
                <span className="italic text-secondary">good company</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Foundations, founders, hospitality groups and mission-led teams who've
                trusted us with brand, web and editorial work.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <Reveal.Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border/60 border border-border/60">
              {list.map((c) => (
                <Reveal.Item
                  key={c.id}
                  className="bg-background flex items-center justify-center p-8 md:p-10 aspect-[4/3]"
                >
                  {c.logo_url ? (
                    <img
                      src={c.logo_url}
                      alt={c.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-16 md:max-h-20 w-auto object-contain"
                    />
                  ) : (
                    <p className="font-display text-base md:text-lg text-foreground/80 text-center tracking-wide">
                      {c.name}
                    </p>
                  )}
                </Reveal.Item>
              ))}
            </Reveal.Stagger>

            <Reveal as="div" className="mt-20 max-w-xl">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-secondary hover:text-secondary transition-colors"
              >
                See the work we made together <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>

        <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default ClientsPage;
