import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import {
  ArrowUpRight,
  Camera,
  Film,
  Fingerprint,
  Globe2,
  Megaphone,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';
import { useSEO } from '@/hooks/useSEO';
import { seoLandingPages } from '@/data/seoLandingPages';

type Capability = {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  kicker: string;
  description: string;
  deliverables: string[];
  accent: string;
  ring: string;
  glow: string;
  related?: { label: string; to: string };
};

const capabilities: Capability[] = [
  {
    id: 'identity-systems',
    number: '01',
    title: 'Identity Systems',
    icon: Fingerprint,
    kicker: 'Strategy + design systems',
    description:
      'Brand architecture, identity systems and market-ready visual languages built to scale across every touchpoint.',
    deliverables: ['Brand strategy', 'Logo & wordmark', 'Type & colour system', 'Governance toolkit'],
    accent: 'rgba(214, 173, 94, 0.88)',
    ring: 'rgba(214, 173, 94, 0.55)',
    glow: 'rgba(214, 173, 94, 0.22)',
    related: { label: 'Aurelia Atelier', to: '/portfolio/aurelia-atelier' },
  },
  {
    id: 'websites',
    number: '02',
    title: 'Websites',
    icon: Globe2,
    kicker: 'Editorial web experiences',
    description:
      'High-performing editorial and conversion-led websites engineered for credibility, clarity and growth.',
    deliverables: ['Site architecture', 'UX & UI design', 'Frontend build', 'CMS & analytics'],
    accent: 'rgba(178, 150, 222, 0.88)',
    ring: 'rgba(178, 150, 222, 0.48)',
    glow: 'rgba(178, 150, 222, 0.2)',
    related: { label: 'Terra Aid International', to: '/portfolio/terraaidinternational' },
  },
  {
    id: 'campaigns',
    number: '03',
    title: 'Campaigns',
    icon: Megaphone,
    kicker: 'Launch-ready campaign systems',
    description:
      'Integrated campaigns shaped from strategy to rollout, with assets ready for every channel that matters.',
    deliverables: ['Campaign strategy', 'Concept & art direction', 'Key visuals', 'Launch rollout'],
    accent: 'rgba(208, 140, 121, 0.88)',
    ring: 'rgba(208, 140, 121, 0.46)',
    glow: 'rgba(208, 140, 121, 0.2)',
    related: { label: 'Ghana Gold Expo Foundation', to: '/portfolio/gge' },
  },
  {
    id: 'motion',
    number: '04',
    title: 'Motion',
    icon: Film,
    kicker: 'Animated brand language',
    description:
      'Motion systems, campaign films and animated content that give brands authority, rhythm and recall.',
    deliverables: ['Logo animation', 'Campaign film', 'Social motion', 'Edit & post'],
    accent: 'rgba(133, 171, 232, 0.9)',
    ring: 'rgba(133, 171, 232, 0.45)',
    glow: 'rgba(133, 171, 232, 0.2)',
  },
  {
    id: 'content',
    number: '05',
    title: 'Content',
    icon: Camera,
    kicker: 'Editorial + image direction',
    description:
      'Editorial direction, photography and copy that make brands sound sharper, look stronger and travel further.',
    deliverables: ['Editorial direction', 'Photography', 'Copywriting', 'Asset libraries'],
    accent: 'rgba(151, 194, 160, 0.88)',
    ring: 'rgba(151, 194, 160, 0.42)',
    glow: 'rgba(151, 194, 160, 0.18)',
    related: { label: 'Ghana Gold Expo Foundation', to: '/portfolio/gge' },
  },
  {
    id: 'product-interfaces',
    number: '06',
    title: 'Product Interfaces',
    icon: PanelsTopLeft,
    kicker: 'Digital products + systems',
    description:
      'Dashboards, web apps and operating tools designed with enterprise-grade clarity and brand-level craft.',
    deliverables: ['Product strategy', 'UX & UI design', 'Frontend development', 'Design system'],
    accent: 'rgba(202, 177, 122, 0.92)',
    ring: 'rgba(202, 177, 122, 0.44)',
    glow: 'rgba(202, 177, 122, 0.2)',
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

interface CapabilityCardProps {
  capability: Capability;
  expanded: boolean;
  onToggle: () => void;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability, expanded, onToggle }) => {
  const Icon = capability.icon;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const glowX = useSpring(rawX, { stiffness: 140, damping: 24, mass: 0.6 });
  const glowY = useSpring(rawY, { stiffness: 140, damping: 24, mass: 0.6 });
  const active = hovered || expanded;

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, ${capability.glow}, transparent 58%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 100);
    rawY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const resetGlow = () => {
    setHovered(false);
    rawX.set(50);
    rawY.set(50);
  };

  return (
    <motion.article
      layout
      className="service-motion-card group relative h-full overflow-hidden rounded-[2rem] p-px"
      data-expanded={expanded}
      style={
        {
          '--service-accent': capability.accent,
          '--service-ring': capability.ring,
        } as React.CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={resetGlow}
      animate={reduceMotion ? undefined : { y: active ? -6 : 0, scale: active ? 1.01 : 1 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="service-motion-card__border absolute -inset-[42%] rounded-full"
        animate={reduceMotion ? undefined : { rotate: 360, opacity: active ? 0.96 : 0.34, scale: active ? 1.02 : 1 }}
        transition={
          reduceMotion
            ? undefined
            : {
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }
        }
      />

      <div className="service-motion-card__panel relative h-full overflow-hidden rounded-[calc(2rem-1px)] border border-white/10 px-7 py-7 md:px-8 md:py-8">
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{ background: spotlight }}
          animate={{ opacity: active ? 1 : 0.36 }}
        />
        <div className="service-motion-card__grid absolute inset-0 opacity-40" />
        <div className="service-motion-card__mesh absolute inset-0" />

        <div className="relative z-10 flex h-full flex-col">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="flex h-full flex-col text-left"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/46">
                  {capability.number}
                </p>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-secondary/90">
                  {capability.kicker}
                </p>
              </div>

              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white/[0.05] text-foreground"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: active ? [0, -7, 5, 0] : 0,
                        y: active ? [0, -2, 0] : 0,
                        scale: active ? 1.06 : 1,
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 6.4,
                        repeat: active ? Infinity : 0,
                        ease: 'easeInOut',
                      }
                }
              >
                <Icon size={24} strokeWidth={1.35} style={{ color: capability.accent }} />
              </motion.div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-[1.9rem] leading-[1.02] tracking-[-0.03em] text-foreground md:text-[2.25rem]">
                {capability.title}
              </h3>
              <p className="mt-4 max-w-sm text-[0.98rem] leading-relaxed text-foreground/72">
                {capability.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {capability.deliverables.slice(0, 2).map((deliverable) => (
                <span
                  key={deliverable}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-foreground/56"
                >
                  {deliverable}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-5">
                <span className="text-sm font-medium text-foreground/68">
                  {expanded ? 'Hide details' : 'Expand details'}
                </span>
                <motion.span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-foreground"
                  animate={{ rotate: expanded ? 45 : 0, x: active ? 2 : 0, y: active ? -2 : 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="rounded-[1.4rem] border border-white/10 bg-black/[0.03] p-5 dark:bg-white/[0.03]">
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-secondary/88">
                    Core outputs
                  </p>
                  <div className="mt-4 grid gap-2">
                    {capability.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-sm text-foreground/72"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: capability.accent }}
                        />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>

                  {capability.related ? (
                    <Link
                      to={capability.related.to}
                      onClick={(event) => event.stopPropagation()}
                      className={cn(
                        'mt-5 inline-flex items-center gap-2 border-b pb-1 text-sm font-medium text-foreground transition-colors hover:text-secondary',
                        'border-white/12 hover:border-secondary/50',
                      )}
                    >
                      Recent work · {capability.related.label}
                      <ArrowUpRight size={14} style={{ color: capability.accent }} />
                    </Link>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

const ServicesPage = () => {
  const { serviceId } = useParams();
  const [expandedCapability, setExpandedCapability] = useState<string>('identity-systems');

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

        {/* 2. Capabilities overview — interactive motion cards */}
        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <Reveal as="div" className="mb-16 max-w-2xl">
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="display-section text-foreground text-balance">
                Six disciplines, rebuilt as living surfaces.
              </h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
                Clients usually come to us when they need a branding agency in Accra, a web design
                studio in Ghana, or a campaign partner that can carry strategy into execution.
                The work below shows how each capability behaves inside the wider studio system.
              </p>
            </Reveal>

            <Reveal.Stagger
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              stagger={0.1}
              mode="scale-in"
            >
              {capabilities.map((cap) => (
                <Reveal.Item
                  key={cap.id}
                  className="h-full"
                  mode="scale-in"
                >
                  <CapabilityCard
                    capability={cap}
                    expanded={expandedCapability === cap.id}
                    onToggle={() =>
                      setExpandedCapability((current) => (current === cap.id ? '' : cap.id))
                    }
                  />
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
