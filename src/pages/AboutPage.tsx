import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

const principles = [
  {
    n: '01',
    title: 'Strategic by design',
    body: 'Focused engagements led by experienced specialists. No agency theatre, no diluted accountability.',
  },
  {
    n: '02',
    title: 'Editorial, not decorative',
    body: 'Typography, hierarchy and pace come first. Visual flourish is earned, never sprinkled.',
  },
  {
    n: '03',
    title: 'Built to outlast a launch',
    body: 'Identities and sites that hold up six months later — not just on the announcement day.',
  },
  {
    n: '04',
    title: 'Quiet, useful, honest',
    body: 'We say what we mean, scope what we can deliver, and tell clients when an idea is not worth doing.',
  },
];

const AboutPage = () => {
  useSEO({
    title: 'Studio · Mosaic06',
    description:
      'Mosaic06 is a multidisciplinary creative organization in Accra working with ambitious brands and mission-led teams across identity, web, campaigns and product.',
    path: '/about',
  });

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Hero */}
        <section className="pt-40 md:pt-48 pb-20 md:pb-28 border-b border-border/60">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Studio</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                A creative organization for brands that want to be{' '}
                <span className="italic text-secondary">remembered</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Mosaic06 is an independent creative organization based in Accra, working with
                founders, foundations and senior in-house teams. We build brand systems, digital
                platforms and campaigns with strategic depth from start to finish.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stance / what we believe */}
        <section className="py-24 md:py-32">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal as="div" className="lg:col-span-4">
              <p className="eyebrow mb-6">What we believe</p>
              <h2 className="display-section text-foreground text-balance">
                Calm, considered, work-led.
              </h2>
            </Reveal>
            <Reveal.Stagger className="lg:col-span-7 lg:col-start-6 divide-y divide-border/60 border-y border-border/60">
              {principles.map((p) => (
                <Reveal.Item key={p.n} className="py-10 grid sm:grid-cols-12 gap-6 items-start">
                  <div className="sm:col-span-2">
                    <span className="font-display text-sm text-secondary tracking-wider">
                      {p.n}
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-[-0.01em] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-foreground/75 leading-relaxed">{p.body}</p>
                  </div>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>
          </div>
        </section>

        {/* Studio at a glance */}
        <section className="py-24 md:py-32 bg-muted/30 border-y border-border/60">
          <div className="container-editorial">
            <Reveal as="div" className="max-w-2xl mb-16">
              <p className="eyebrow mb-6">At a glance</p>
              <h2 className="display-section text-foreground text-balance">
                The shape of the studio.
              </h2>
            </Reveal>
            <Reveal.Stagger className="grid md:grid-cols-3 gap-px bg-border/60 border border-border/60">
              {[
                { label: 'Founded', value: 'Accra · 2018' },
                { label: 'Engagements / quarter', value: 'Three to four' },
                { label: 'Disciplines', value: 'Identity · Web · Campaigns · Motion · Product' },
              ].map((s) => (
                <Reveal.Item key={s.label} className="bg-background p-8 md:p-10">
                  <p className="text-xs uppercase tracking-[0.24em] text-foreground/45 mb-4">
                    {s.label}
                  </p>
                  <p className="font-display text-2xl md:text-3xl text-foreground tracking-[-0.01em]">
                    {s.value}
                  </p>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>

            <div className="mt-16 flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
              >
                See selected work
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/25 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </section>

        <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
