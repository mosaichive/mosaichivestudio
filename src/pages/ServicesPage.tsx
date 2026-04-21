import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

type Capability = {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  related?: { label: string; to: string };
};

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Identity Systems',
    description:
      'Marks, type, colour and editorial systems that hold up across every surface — from a business card to a global campaign.',
    deliverables: ['Logo & wordmark', 'Type & colour system', 'Brand guidelines', 'Launch toolkit'],
    related: { label: 'Aurelia Atelier', to: '/portfolio/aurelia-atelier' },
  },
  {
    number: '02',
    title: 'Websites',
    description:
      'Editorial, conversion-aware sites built with care. Strong typography, considered motion, and copy that earns the click.',
    deliverables: ['Site architecture', 'UX & UI design', 'Frontend build', 'CMS & handover'],
    related: { label: 'Terra Aid International', to: '/portfolio/terraaidinternational' },
  },
  {
    number: '03',
    title: 'Campaigns',
    description:
      'Launch and seasonal campaigns shaped end-to-end — from concept and art direction through to channel-ready assets.',
    deliverables: ['Concept & art direction', 'Key visuals', 'Channel adaptations', 'Launch rollout'],
  },
  {
    number: '04',
    title: 'Motion',
    description:
      'Animated identity, social cutdowns and product motion that gives static brands a sense of rhythm and life.',
    deliverables: ['Logo animation', 'Social motion', 'Product micro-motion', 'Edit & post'],
  },
  {
    number: '05',
    title: 'Content',
    description:
      'Editorial direction, photography and copy crafted to make the work feel considered — not stocky, not generic.',
    deliverables: ['Editorial direction', 'Photography', 'Copywriting', 'Asset libraries'],
    related: { label: 'Noir Roast', to: '/portfolio/noir-roast' },
  },
  {
    number: '06',
    title: 'Product Interfaces',
    description:
      'Dashboards, web apps and tools designed and built with the same editorial care as our brand work.',
    deliverables: ['Product strategy', 'UX & UI design', 'Frontend development', 'Design system'],
    related: { label: 'SikaFlow', to: '/portfolio/salestallysystem' },
  },
];

const proofItems = [
  {
    capability: 'Product Interfaces',
    project: 'SikaFlow',
    outcome:
      'A clear, considered fintech dashboard. Replaced a brittle internal tool with a product the team is proud to demo.',
    to: '/portfolio/salestallysystem',
  },
  {
    capability: 'Identity & Web',
    project: 'Terra Aid International',
    outcome:
      'A new identity and editorial site that lifted donor trust and made the mission easier to share at the leadership table.',
    to: '/portfolio/terraaidinternational',
  },
  {
    capability: 'Identity & Content',
    project: 'Aurelia Atelier',
    outcome:
      'Quiet luxury, executed end to end — from wordmark and editorial system to lookbook and launch site.',
    to: '/portfolio/aurelia-atelier',
  },
];

const process = [
  {
    step: 'Discover',
    body: 'A short, sharp listening phase. We learn the business, the audience, and what success actually looks like.',
  },
  {
    step: 'Shape',
    body: 'Direction first, deliverables second. We agree on a clear creative and strategic direction before scaling work.',
  },
  {
    step: 'Build',
    body: 'Senior hands across design, copy, motion and engineering — with no hand-offs to junior teams behind the scenes.',
  },
  {
    step: 'Refine',
    body: 'We tune the work in context, not in isolation. Launch is a milestone, not the end of the relationship.',
  },
];

const ServicesPage = () => {
  const { serviceId } = useParams();

  useSEO({
    title: 'Capabilities · Mosaic06 Studio',
    description:
      'Mosaic06 is an editorial digital studio working across identity, websites, campaigns, motion, content and product interfaces for ambitious brands.',
    path: '/services',
  });

  // Legacy /services/:serviceId routes (graphic-design, video-editing, etc.)
  // are retired — redirect cleanly to the new capabilities page.
  if (serviceId) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="bg-background relative">
      <ScrollAnimations />
      <Navbar />

      <main>
        {/* 1. Editorial hero */}
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 border-b border-border/60">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <Reveal as="div" className="lg:col-span-8">
                <p className="eyebrow mb-8">Capabilities</p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                  Identity, web and campaigns shaped with{' '}
                  <span className="italic text-secondary">taste and intent</span>.
                </h1>
              </Reveal>
              <Reveal as="div" className="lg:col-span-4 space-y-8" delay={0.15}>
                <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
                  A small senior studio working with ambitious brands and mission-led teams.
                  Selective by design — fewer projects, made better.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/portfolio"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
                  >
                    View selected work
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/25 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all"
                  >
                    Start a project
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2. Capabilities overview — editorial list, not gradient cards */}
        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <Reveal as="div" className="mb-16 max-w-2xl">
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="display-section text-foreground text-balance">
                Six disciplines, one editorial studio.
              </h2>
            </Reveal>

            <Reveal.Stagger className="divide-y divide-border/60 border-y border-border/60">
              {capabilities.map((cap) => (
                <Reveal.Item
                  key={cap.number}
                  className="group grid lg:grid-cols-12 gap-8 lg:gap-12 py-10 md:py-14"
                >
                  <div className="lg:col-span-1">
                    <span className="font-display text-sm text-secondary tracking-wider">
                      {cap.number}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-[-0.01em] leading-tight">
                      {cap.title}
                    </h3>
                    {cap.related && (
                      <Link
                        to={cap.related.to}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-foreground/60 hover:text-secondary transition-colors"
                      >
                        Recent work · {cap.related.label}
                        <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="space-y-2 text-sm text-foreground/65">
                      {cap.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="mt-2 w-1 h-1 rounded-full bg-secondary shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>
          </div>
        </section>

        {/* 3. Proof through work */}
        <section className="py-24 md:py-32 bg-muted/30 border-y border-border/60">
          <div className="container-editorial">
            <Reveal as="div" className="mb-16 max-w-2xl">
              <p className="eyebrow mb-6">Proof, not promises</p>
              <h2 className="display-section text-foreground text-balance">
                Capabilities, applied.
              </h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
                A few recent engagements where the work moved the business — not just the brand.
              </p>
            </Reveal>

            <Reveal.Stagger className="grid md:grid-cols-3 gap-px bg-border/60 border border-border/60">
              {proofItems.map((item) => (
                <Reveal.Item key={item.project} className="bg-background">
                  <Link
                    to={item.to}
                    className="group block p-8 md:p-10 h-full hover:bg-muted/40 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-widest text-secondary mb-6">
                      {item.capability}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4 tracking-[-0.01em]">
                      {item.project}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed mb-8">{item.outcome}</p>
                    <span className="inline-flex items-center gap-2 text-sm text-foreground font-medium border-b border-secondary pb-1 group-hover:gap-3 transition-all">
                      Read the case study
                      <ArrowUpRight size={14} className="text-secondary" />
                    </span>
                  </Link>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>
          </div>
        </section>

        {/* 4. How we work */}
        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <Reveal as="div" className="lg:col-span-4">
                <p className="eyebrow mb-6">How we work</p>
                <h2 className="display-section text-foreground text-balance">
                  A calm, deliberate way of building.
                </h2>
                <p className="mt-6 text-foreground/70 leading-relaxed">
                  No bloated process decks. Four short phases, run by senior hands, with the work
                  visible at every step.
                </p>
              </Reveal>

              <Reveal.Stagger className="lg:col-span-7 lg:col-start-6 grid sm:grid-cols-2 gap-x-10 gap-y-12">
                {process.map((p, i) => (
                  <Reveal.Item key={p.step}>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-display text-sm text-secondary">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-2xl text-foreground tracking-[-0.01em]">
                        {p.step}
                      </h3>
                    </div>
                    <p className="text-foreground/70 leading-relaxed">{p.body}</p>
                  </Reveal.Item>
                ))}
              </Reveal.Stagger>
            </div>
          </div>
        </section>

        {/* 5. Closing CTA — reuse site-wide premium block */}
        <ConversionCTA />
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
