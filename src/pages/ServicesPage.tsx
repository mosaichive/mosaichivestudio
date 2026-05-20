import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';
import { seoLandingPages } from '@/data/seoLandingPages';

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
      'Brand architecture, identity systems and market-ready visual languages built to scale across every touchpoint.',
    deliverables: ['Brand strategy', 'Logo & wordmark', 'Type & colour system', 'Governance toolkit'],
    related: { label: 'Aurelia Atelier', to: '/portfolio/aurelia-atelier' },
  },
  {
    number: '02',
    title: 'Websites',
    description:
      'High-performing editorial and conversion-led websites engineered for credibility, clarity and growth.',
    deliverables: ['Site architecture', 'UX & UI design', 'Frontend build', 'CMS & analytics'],
    related: { label: 'Terra Aid International', to: '/portfolio/terraaidinternational' },
  },
  {
    number: '03',
    title: 'Campaigns',
    description:
      'Integrated campaigns shaped from strategy to rollout, with assets ready for every channel that matters.',
    deliverables: ['Campaign strategy', 'Concept & art direction', 'Key visuals', 'Launch rollout'],
    related: { label: 'Ghana Gold Expo Foundation', to: '/portfolio/gge' },
  },
  {
    number: '04',
    title: 'Motion',
    description:
      'Motion systems, campaign films and animated content that give brands authority, rhythm and recall.',
    deliverables: ['Logo animation', 'Campaign film', 'Social motion', 'Edit & post'],
  },
  {
    number: '05',
    title: 'Content',
    description:
      'Editorial direction, photography and copy that make brands sound sharper, look stronger and travel further.',
    deliverables: ['Editorial direction', 'Photography', 'Copywriting', 'Asset libraries'],
    related: { label: 'Ghana Gold Expo Foundation', to: '/portfolio/gge' },
  },
  {
    number: '06',
    title: 'Product Interfaces',
    description:
      'Dashboards, web apps and operating tools designed with enterprise-grade clarity and brand-level craft.',
    deliverables: ['Product strategy', 'UX & UI design', 'Frontend development', 'Design system'],
    related: { label: 'SikaFlow', to: '/portfolio/salestallysystem' },
  },
];

const proofItems = [
  {
    capability: 'Product Interfaces',
    project: 'SikaFlow',
    outcome:
      'A confident fintech dashboard that replaced a brittle internal tool with a product the team is proud to demo.',
    to: '/portfolio/salestallysystem',
  },
  {
    capability: 'Identity & Web',
    project: 'Terra Aid International',
    outcome:
      'A strategic identity and editorial site that lifted donor trust and made the mission easier to share at leadership level.',
    to: '/portfolio/terraaidinternational',
  },
  {
    capability: 'Identity & Content',
    project: 'Aurelia Atelier',
    outcome:
      'A luxury brand world executed end to end — from wordmark and editorial system to lookbook and launch site.',
    to: '/portfolio/aurelia-atelier',
  },
];

const process = [
  {
    step: 'Discover',
    body: 'A focused intelligence phase. We learn the business, the audience and what success needs to prove.',
  },
  {
    step: 'Shape',
    body: 'Direction first, deliverables second. We agree on a clear creative and strategic direction before scaling work.',
  },
  {
    step: 'Build',
    body: 'Specialist leadership across design, copy, motion and engineering — with direct ownership from strategy through launch.',
  },
  {
    step: 'Refine',
    body: 'We tune the work in context, not in isolation. Launch is a milestone, not the end of the relationship.',
  },
];

const ServicesPage = () => {
  const { serviceId } = useParams();

  useSEO({
    title: 'Branding, Web Design & Creative Services in Accra, Ghana | Mosaic06 Studio',
    description:
      'Explore Mosaic06 Studio services across brand identity, website design, campaign creative, motion, content and product design for organizations in Accra, Ghana and beyond.',
    path: '/services',
    keywords: [
      'Mosaic Hive',
      'Mosaic06 Studio',
      'branding services Accra',
      'web design services Ghana',
      'creative agency services Ghana',
    ],
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
                <h1 className="display-page text-foreground text-balance">
                  Brand identity, website design and campaigns shaped with{' '}
                  <span className="italic text-secondary">taste and intent</span>.
                </h1>
              </Reveal>
              <Reveal as="div" className="lg:col-span-4 space-y-8" delay={0.15}>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-md">
                  A creative agency in Accra, Ghana working across branding, web design,
                  campaigns, motion and digital product experiences. Strategic by design, built for serious outcomes.
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
                Six disciplines, one integrated creative partner.
              </h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
                Clients usually come to us when they need a branding agency in Accra, a web design
                studio in Ghana, or a campaign partner that can carry strategy into execution.
              </p>
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
                Recent engagements where the work moved the business — not just the brand.
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

        {/* 4. Search entry points */}
        <section className="py-24 md:py-32 border-b border-border/60">
          <div className="container-editorial">
            <Reveal as="div" className="mb-16 max-w-2xl">
              <p className="eyebrow mb-6">Search guides</p>
              <h2 className="display-section text-foreground text-balance">
                Built for the way clients actually search.
              </h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
                These focused pages answer the highest-intent searches around branding, web design
                and creative agency work in Accra and Ghana, while still pointing back into the
                broader studio offer.
              </p>
            </Reveal>

            <Reveal.Stagger className="grid gap-6 lg:grid-cols-3">
              {seoLandingPages.map((page) => (
                <Reveal.Item key={page.path}>
                  <Link
                    to={page.path}
                    className="group block h-full rounded-[1.75rem] border border-border/60 bg-background p-8 hover:border-secondary/50 hover:bg-muted/20 transition-all"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-5">
                      SEO landing page
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-[-0.01em] leading-tight">
                      {page.label}
                    </h3>
                    <p className="mt-5 text-base text-foreground/72 leading-relaxed">
                      {page.description}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      Open page
                      <ArrowUpRight
                        size={14}
                        className="text-secondary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>
          </div>
        </section>

        {/* 5. How we work */}
        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <Reveal as="div" className="lg:col-span-4">
                <p className="eyebrow mb-6">How we work</p>
                <h2 className="display-section text-foreground text-balance">
                  A calm, deliberate way of building.
                </h2>
                <p className="mt-6 text-foreground/70 leading-relaxed">
                  A rigorous operating model with clear decisions, senior ownership and visible progress
                  at every step.
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

        {/* 6. Closing CTA — reuse site-wide premium block */}
        <ConversionCTA />
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
