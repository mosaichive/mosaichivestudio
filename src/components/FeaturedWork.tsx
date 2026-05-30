import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useProjects, useSiteSettings } from '@/hooks/useStudioContent';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/Reveal';
import ProjectShowcaseCard, { ProjectShowcaseProject } from './ProjectShowcaseCard';

const FeaturedWork = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { data: featuredProjects, isLoading: featuredLoading } = useProjects({ onlyPublished: true, onlyFeatured: true });
  const { data: publishedProjects, isLoading: publishedLoading } = useProjects({ onlyPublished: true });
  const { data: settings } = useSiteSettings();
  const eyebrow = settings?.featured_eyebrow ?? 'Selected Work';
  const headline = settings?.featured_headline ?? 'Selected work from a serious creative partner.';
  const ctaLabel = settings?.featured_cta_label ?? 'Browse the full index';
  const ctaLink = settings?.featured_cta_link ?? '/portfolio';
  const isLoading = featuredLoading || publishedLoading;

  const list = useMemo<ProjectShowcaseProject[]>(() => {
    const featured = featuredProjects ?? [];
    const published = publishedProjects ?? [];
    if (featured.length >= 4) return featured.slice(0, 4);

    const featuredIds = new Set(featured.map((project) => project.id));
    const fill = published.filter((project) => !featuredIds.has(project.id));
    return [...featured, ...fill].slice(0, 4);
  }, [featuredProjects, publishedProjects]);

  const { scrollXProgress } = useScroll({ container: railRef });
  const progress = useSpring(scrollXProgress, { stiffness: 120, damping: 28, mass: 0.7 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const sectionProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.8 });

  if (!isLoading && list.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background pb-28 pt-20 md:pb-32 md:pt-24"
      id="selected-work"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--background)), hsl(var(--background) / 0.24) 62%, transparent)',
          opacity: sectionProgress,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[22%] hidden h-[24rem] w-[24rem] rounded-full blur-3xl lg:block"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--secondary) / 0.14), transparent 72%)',
          opacity: 0.42,
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 20, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[4%] hidden h-[22rem] w-[22rem] rounded-full blur-3xl lg:block"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--primary) / 0.12), transparent 72%)',
          opacity: 0.38,
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -18, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />

      <div className="container-editorial relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h2 className="display-section max-w-[15ch] text-balance text-foreground">
              {headline}
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:justify-self-end" delay={0.08}>
            <div className="max-w-md rounded-[1.5rem] border border-border/60 bg-background/45 p-5 shadow-[0_18px_60px_-40px_hsl(var(--foreground)/0.28)] backdrop-blur-xl">
              <p className="text-sm leading-relaxed text-foreground/64">
                A cinematic index of featured engagements. Scroll horizontally through the studio’s selected narratives and open each case for the full story.
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="hidden min-w-[12rem] flex-1 md:block">
                  <div className="h-px bg-foreground/12">
                    <motion.div
                      className="h-px origin-left bg-gradient-to-r from-secondary via-primary to-secondary"
                      style={{ scaleX: progress }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.24em] text-foreground/44">
                    <span>scroll across</span>
                    <span>{list.length} projects</span>
                  </div>
                </div>

                <Link
                  to={ctaLink}
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-background/58 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.24em] text-foreground/76 backdrop-blur-xl transition-colors hover:border-secondary/50 hover:text-secondary"
                >
                  {ctaLabel}
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {isLoading ? (
          <div className="mt-12 flex gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[30rem] w-[min(84vw,32rem)] shrink-0 rounded-[1.75rem] lg:w-[min(70vw,56rem)]"
              />
            ))}
          </div>
        ) : (
          <Reveal className="mt-12 md:mt-14" delay={0.12}>
            <div
              ref={railRef}
              className="showcase-scroll no-scrollbar overflow-x-auto pb-6 [scrollbar-width:none]"
            >
              <div className="flex min-w-max gap-6 pr-6 md:gap-8 md:pr-10">
                {list.map((project, index) => (
                  <motion.div
                    key={project.id ?? project.slug}
                    className={`snap-start ${index === 0 ? 'w-[min(88vw,40rem)] lg:w-[min(72vw,58rem)]' : 'w-[min(82vw,32rem)] lg:w-[min(54vw,44rem)]'}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative">
                      <ProjectShowcaseCard project={project} priority={index === 0} variant="feature" />
                      <motion.div
                        className="pointer-events-none absolute -bottom-5 left-5 rounded-full border border-foreground/12 bg-background/68 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-foreground/52 backdrop-blur-md"
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                y: [0, -4, 0],
                              }
                        }
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                duration: 8 + index * 1.4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }
                        }
                      >
                        {project.categories?.[0] ?? project.industry ?? 'Studio project'}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.24em] text-foreground/46">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/10 bg-background/55 backdrop-blur-sm">
                  <ArrowRight size={12} />
                </span>
                <span>Drag or scroll sideways to move through the story rail</span>
              </div>
              <span className="hidden md:inline-flex">{list.length} immersive cards</span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default FeaturedWork;
