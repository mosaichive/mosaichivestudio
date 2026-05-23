import React, { useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects, useSiteSettings } from '@/hooks/useStudioContent';
import GradientOrb from './GradientOrb';
import MouseParallaxLayer from './MouseParallaxLayer';

const HERO_PROJECT_SLUGS = ['gge', 'ghana-gold-expo-foundation', 'ghana-gold-expo'];

const HERO_PARTICLES = [
  { className: 'left-[6%] top-[20%]', size: 'h-1.5 w-1.5', delay: 0.2, duration: 13 },
  { className: 'left-[18%] top-[62%]', size: 'h-2 w-2', delay: 1, duration: 16 },
  { className: 'left-[36%] top-[14%]', size: 'h-1 w-1', delay: 0.6, duration: 11 },
  { className: 'left-[58%] top-[18%]', size: 'h-2 w-2', delay: 1.4, duration: 17 },
  { className: 'left-[72%] top-[60%]', size: 'h-1.5 w-1.5', delay: 0.8, duration: 12 },
  { className: 'left-[88%] top-[28%]', size: 'h-1 w-1', delay: 1.8, duration: 14 },
  { className: 'left-[82%] top-[74%]', size: 'h-2 w-2', delay: 1.1, duration: 18 },
];

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

interface MagneticButtonProps {
  to: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ to, label, variant = 'primary' }) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    rawX.set(nextX);
    rawY.set(nextY);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.div
      className="inline-flex"
      style={reduceMotion ? undefined : { x, y, willChange: 'transform' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      <Link
        to={to}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-[0.02em] transition-all duration-500 ${
          isPrimary
            ? 'border border-primary/10 bg-primary text-primary-foreground shadow-[0_22px_50px_-22px_hsl(var(--primary)/0.55)]'
            : 'border border-foreground/15 bg-background/55 text-foreground backdrop-blur-xl hover:border-foreground/35'
        }`}
      >
        {isPrimary ? (
          <motion.span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow) / 0.92) 55%, hsl(var(--secondary) / 0.92) 130%)',
            }}
            animate={reduceMotion ? undefined : { scale: hovered ? 1.04 : 1, opacity: hovered ? 1 : 0.94 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <motion.span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--background) / 0.28), hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.12))',
            }}
            animate={reduceMotion ? undefined : { opacity: hovered ? 1 : 0.74 }}
            transition={{ duration: 0.35 }}
          />
        )}

        <span className="relative z-10 flex items-center gap-3">
          <span className="relative inline-flex items-center">
            <span>{label}</span>
            <motion.span
              aria-hidden
              className={`absolute -bottom-1 left-0 h-px ${isPrimary ? 'bg-primary-foreground/70' : 'bg-current/55'}`}
              initial={false}
              animate={{ width: hovered ? '100%' : '38%', opacity: hovered ? 1 : 0.62 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          <motion.span
            className="inline-flex"
            animate={reduceMotion ? undefined : { x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight size={16} />
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
};

interface FloatingGlassCardProps {
  className: string;
  label: string;
  title: string;
  body: string;
  delay?: number;
}

const FloatingGlassCard: React.FC<FloatingGlassCardProps> = ({ className, label, title, body, delay = 0 }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`hero-glass-card absolute ${className}`}
      initial={{ opacity: 0, y: 26, scale: 0.96, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotate: [0, -0.8, 0.4, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 10,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <p className="text-[0.58rem] uppercase tracking-[0.28em] text-secondary/85">{label}</p>
        <p className="mt-2 font-display text-lg leading-tight text-foreground">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/62">{body}</p>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const showcaseY = useTransform(scrollY, [0, 700], [0, 70]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 44, damping: 18, mass: 0.8 });
  const parallaxY = useSpring(mouseY, { stiffness: 44, damping: 18, mass: 0.8 });
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], [34, 68]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], [18, 54]);
  const dynamicLighting = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, hsl(var(--secondary) / 0.28), transparent 24%), radial-gradient(circle at 82% 18%, hsl(var(--primary) / 0.18), transparent 34%)`;

  const { data: settings } = useSiteSettings();
  const { data: projects } = useProjects({ onlyPublished: true });

  const heroProject =
    (projects ?? []).find((p) => HERO_PROJECT_SLUGS.includes(p.slug) && p.cover_url) ??
    (projects ?? []).find((p) => !!p.cover_url);

  const eyebrow = settings?.hero_eyebrow ?? 'Mosaic06 Studio — Accra, Ghana';
  const headline = settings?.hero_headline ?? 'Brands and digital experiences people remember.';
  const subheadline =
    settings?.hero_subheadline ??
    'A branding, web design and creative campaign studio in Accra, Ghana, building identity systems, websites, motion and digital products for ambitious brands and institutions.';
  const ctaPrimaryLabel = settings?.hero_cta_primary_label ?? 'View selected work';
  const ctaPrimaryLink = settings?.hero_cta_primary_link ?? '/portfolio';
  const ctaSecondaryLabel = settings?.hero_cta_secondary_label ?? 'Start a project';
  const ctaSecondaryLink = settings?.hero_cta_secondary_link ?? '/contact';
  const headlineWords = headline.split(' ');
  const projectCount = settings?.counter_projects ?? projects?.length ?? 24;
  const yearsCount = settings?.counter_years ?? 8;
  const brandsCount = settings?.counter_brands ?? 32;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width - 0.5;
    const nextY = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nextX);
    mouseY.set(nextY);
  };

  const resetPointer = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <ScrollProgressIndicator />
      <section
        className="relative min-h-[100svh] overflow-hidden bg-transparent pt-28 pb-12 md:pt-32 md:pb-16"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              background:
                'radial-gradient(120% 80% at 18% 14%, hsl(var(--secondary) / 0.12), transparent 42%), radial-gradient(90% 72% at 84% 12%, hsl(var(--primary) / 0.16), transparent 40%), linear-gradient(180deg, hsl(var(--background) / 0.15), transparent 30%, hsl(var(--background) / 0.2) 100%)',
            }}
          />

          <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={22}>
            <motion.div
              className="absolute -left-[12%] top-[8%] h-[20rem] w-[28rem] rounded-[45%] opacity-60 blur-3xl"
              style={{
                background:
                  'linear-gradient(135deg, hsl(var(--primary) / 0.22), hsl(var(--secondary) / 0.14), transparent 88%)',
                mixBlendMode: 'multiply',
              }}
              animate={reduceMotion ? undefined : { rotate: [0, 10, -6, 0], scale: [1, 1.05, 0.98, 1] }}
              transition={reduceMotion ? undefined : { duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-[-8%] top-[14%] h-[24rem] w-[24rem] rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, hsl(var(--secondary) / 0.22), transparent 68%), radial-gradient(circle at 70% 55%, hsl(var(--primary) / 0.15), transparent 72%)',
                mixBlendMode: 'screen',
              }}
              animate={reduceMotion ? undefined : { y: [0, -24, 0], scale: [1, 1.08, 0.98, 1] }}
              transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          </MouseParallaxLayer>

          <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={30}>
            <GradientOrb
              className="left-[-8rem] top-[4rem]"
              size="23rem"
              gradient="radial-gradient(circle at 30% 30%, hsl(var(--secondary) / 0.28), transparent 74%)"
              opacity={0.42}
              blur={76}
              duration={19}
              driftX={20}
              driftY={18}
              blendMode="screen"
            />
            <GradientOrb
              className="right-[-5rem] top-[26%]"
              size="26rem"
              gradient="radial-gradient(circle at 50% 40%, hsl(var(--primary) / 0.25), transparent 74%)"
              opacity={0.32}
              blur={88}
              duration={24}
              delay={0.5}
              driftX={24}
              driftY={20}
              blendMode="multiply"
            />
          </MouseParallaxLayer>

          <motion.div
            className="absolute left-[52%] top-[-8%] h-[32rem] w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                'linear-gradient(180deg, hsl(var(--secondary) / 0.28), transparent 48%, hsl(var(--primary) / 0.08) 100%)',
              mixBlendMode: 'soft-light',
              transform: 'rotate(18deg)',
            }}
            animate={reduceMotion ? undefined : { opacity: [0.18, 0.3, 0.2], scaleY: [1, 1.08, 1] }}
            transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[10%] top-[-6%] h-[28rem] w-[18rem] rounded-full blur-3xl"
            style={{
              background:
                'linear-gradient(180deg, hsl(var(--background) / 0.02), hsl(var(--secondary) / 0.18), transparent 70%)',
              mixBlendMode: 'screen',
              transform: 'rotate(-14deg)',
            }}
            animate={reduceMotion ? undefined : { opacity: [0.12, 0.24, 0.14], y: [0, 12, 0] }}
            transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />

          {HERO_PARTICLES.map((particle, index) => (
            <motion.span
              key={particle.className}
              aria-hidden
              className={`absolute rounded-full bg-foreground/10 dark:bg-white/[0.12] ${particle.className} ${particle.size}`}
              initial={{ opacity: 0 }}
              animate={
                reduceMotion
                  ? { opacity: 0.5 }
                  : {
                      opacity: [0.08, 0.28, 0.12],
                      y: [0, -18, 0],
                      x: [0, index % 2 === 0 ? 8 : -6, 0],
                      scale: [1, 1.18, 1],
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0.3, delay: index * 0.06 }
                  : {
                      duration: particle.duration,
                      delay: particle.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            />
          ))}

          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:7rem_7rem] opacity-30 [mask-image:radial-gradient(circle_at_center,black_24%,transparent_84%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_24%,transparent_84%)] dark:opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,hsl(var(--background)/0.12)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_34%,hsl(var(--background)/0.42)_100%)]" />
        </div>

        <div className="container-editorial relative z-10 flex min-h-[calc(100svh-9rem)] flex-col justify-center">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.div
                className="eyebrow mb-8"
                initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow}
              </motion.div>

              <div className="relative max-w-[13ch]">
                <motion.div
                  className="absolute -left-6 top-6 h-40 w-52 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle at center, hsl(var(--secondary) / 0.24), transparent 72%)',
                    mixBlendMode: 'screen',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.3, delay: 0.25, ease: 'easeOut' }}
                />

                <h1 className="display-hero relative z-10 text-balance text-foreground">
                  {headlineWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      className="inline-block pr-[0.24em]"
                      initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + index * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </div>

              <motion.p
                className="mt-8 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg"
                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {subheadline}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticButton to={ctaPrimaryLink} label={ctaPrimaryLabel} variant="primary" />
                <MagneticButton to={ctaSecondaryLink} label={ctaSecondaryLabel} variant="secondary" />
              </motion.div>

              <motion.div
                className="mt-10 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                  `${projectCount}+ projects shaped`,
                  `${yearsCount}+ years of delivery`,
                  `${brandsCount}+ brands supported`,
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-foreground/10 bg-background/40 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-foreground/62 backdrop-blur-md"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative lg:col-span-5"
              style={{ y: showcaseY }}
              initial={{ opacity: 0, x: 18, filter: 'blur(18px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mx-auto max-w-[36rem] lg:max-w-none">
                <FloatingGlassCard
                  className="-left-6 top-10 hidden max-w-[13rem] lg:block"
                  label="Studio signal"
                  title="Strategic identity, web and motion"
                  body="A tightly-directed creative system built to move with your brand."
                  delay={0.8}
                />
                <FloatingGlassCard
                  className="-bottom-6 right-2 hidden max-w-[14rem] lg:block"
                  label="Featured case"
                  title={heroProject?.client ?? 'Current studio feature'}
                  body={`${heroProject?.year ?? 'Recent'} release shaped with cinematic digital craft.`}
                  delay={1}
                />

                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/45 p-3 shadow-[0_28px_80px_-34px_hsl(var(--foreground)/0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]"
                  style={reduceMotion ? undefined : { x: parallaxX, y: parallaxY, willChange: 'transform' }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-[1.7rem]"
                    style={{ background: dynamicLighting, mixBlendMode: 'screen' }}
                  />

                  {heroProject?.cover_url ? (
                    <Link to={`/portfolio/${heroProject.slug}`} className="group relative block overflow-hidden rounded-[1.5rem]">
                      <motion.div className="absolute inset-0 z-10 rounded-[1.5rem] bg-[linear-gradient(180deg,hsl(var(--background)/0.02),transparent_28%,hsl(var(--primary)/0.62)_100%)]" />
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted md:aspect-[5/6]">
                        <img
                          src={heroProject.cover_url}
                          alt={`${heroProject.client} — ${heroProject.title}`}
                          className="h-full w-full object-cover transition-transform ease-out group-hover:scale-[1.05]"
                          style={{ transitionDuration: '1600ms' }}
                        />
                        <motion.div
                          aria-hidden
                          className="absolute inset-0 rounded-[1.5rem]"
                          style={{ background: dynamicLighting }}
                        />
                        <motion.div
                          aria-hidden
                          className="absolute -left-[22%] top-[-14%] h-[120%] w-[38%] rotate-[12deg] bg-[linear-gradient(180deg,transparent,hsl(var(--secondary)/0.24),transparent)] blur-2xl"
                          animate={reduceMotion ? undefined : { x: ['-12%', '124%'] }}
                          transition={reduceMotion ? undefined : { duration: 6.8, delay: 1.2, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-20 p-6 text-primary-foreground">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[0.62rem] uppercase tracking-[0.26em] backdrop-blur-md">
                            cinematic studio feature
                          </span>
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                            <ArrowUpRight size={16} />
                          </span>
                        </div>

                        <div className="rounded-[1.3rem] border border-white/12 bg-black/20 p-4 backdrop-blur-md">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground/70">
                            <span>{heroProject.year ?? 'Current'}</span>
                            <span className="h-1 w-1 rounded-full bg-secondary" />
                            <span>{heroProject.client}</span>
                          </div>
                          <p className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.35rem)] leading-[1.05] text-balance">
                            {heroProject.title}
                          </p>
                          {heroProject.excerpt ? (
                            <p className="mt-3 max-w-[32rem] text-sm leading-relaxed text-primary-foreground/76">
                              {heroProject.excerpt}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="aspect-[5/6] rounded-[1.5rem] bg-muted" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-10 flex justify-center md:mt-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href="#selected-work"
              className="hero-scroll-indicator group"
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="hero-scroll-indicator__line" />
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-foreground/52 transition-colors duration-300 group-hover:text-foreground/72">
                Scroll to selected work
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-background/55 text-foreground/58 backdrop-blur-md transition-colors duration-300 group-hover:border-foreground/28 group-hover:text-foreground">
                <ArrowDown size={13} />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
