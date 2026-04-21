import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects, useSiteSettings } from '@/hooks/useStudioContent';

const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-secondary origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const { data: settings } = useSiteSettings();
  const { data: projects } = useProjects({ onlyPublished: true });

  const heroProject =
    (projects ?? []).find((p) => p.featured && p.cover_url) ??
    (projects ?? []).find((p) => !!p.cover_url);

  const eyebrow = settings?.hero_eyebrow ?? 'Mosaic06 Studio — Accra';
  const headline = settings?.hero_headline ?? 'Brands and digital experiences people remember.';
  const subheadline =
    settings?.hero_subheadline ??
    'An editorial digital studio working across identity, web, campaigns, motion and product — for ambitious brands and mission-led businesses.';
  const ctaPrimaryLabel = settings?.hero_cta_primary_label ?? 'View selected work';
  const ctaPrimaryLink = settings?.hero_cta_primary_link ?? '/portfolio';
  const ctaSecondaryLabel = settings?.hero_cta_secondary_label ?? 'Start a project';
  const ctaSecondaryLink = settings?.hero_cta_secondary_link ?? '/contact';

  return (
    <>
      <ScrollProgressIndicator />
      <section className="relative min-h-[100svh] flex flex-col pt-32 pb-12 md:pb-16 overflow-hidden bg-background">
        <div className="container-editorial w-full flex-1 flex flex-col">
          {/* Top: eyebrow + headline */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-10 md:mb-14">
            <div className="lg:col-span-10">
              <motion.div
                className="eyebrow mb-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {eyebrow}
              </motion.div>

              <motion.h1
                className="display-hero text-foreground text-balance max-w-[18ch]"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {headline}
              </motion.h1>
            </div>
          </div>

          {/* Bottom: poster image left, supporting copy + CTAs right */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end flex-1">
            <motion.div
              className="lg:col-span-7 order-2 lg:order-1"
              style={{ y }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroProject?.cover_url ? (
                <Link
                  to={`/portfolio/${heroProject.slug}`}
                  className="group relative block overflow-hidden rounded-sm bg-muted"
                >
                  <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                    <img
                      src={heroProject.cover_url}
                      alt={`${heroProject.client} — ${heroProject.title}`}
                      className="w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-primary-foreground">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] opacity-80">
                        Featured · {heroProject.year}
                      </p>
                      <p className="font-display text-xl md:text-2xl mt-1.5 leading-tight text-balance">
                        {heroProject.title}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex w-11 h-11 rounded-full bg-secondary text-secondary-foreground items-center justify-center transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="aspect-[16/10] rounded-sm bg-muted" />
              )}
            </motion.div>

            <motion.div
              className="lg:col-span-5 order-1 lg:order-2 lg:pb-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-md mb-10">
                {subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={ctaPrimaryLink}
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300"
                  style={{ boxShadow: 'var(--shadow-luxe)' }}
                >
                  {ctaPrimaryLabel}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  to={ctaSecondaryLink}
                  className="group inline-flex items-center gap-3 px-7 py-4 border border-foreground/20 rounded-full text-sm font-medium tracking-wide hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300"
                >
                  {ctaSecondaryLabel}
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary transition-transform group-hover:scale-150" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hidden md:flex items-center gap-2 text-foreground/40 mt-10 self-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to selected work</span>
            <ArrowDown size={12} className="animate-bounce-slow" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
