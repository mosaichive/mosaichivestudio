import React, { useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProjectShowcaseProject {
  id?: string;
  slug: string;
  title: string;
  client: string;
  industry: string | null;
  year: string | null;
  cover_url: string | null;
  excerpt: string | null;
  categories: string[];
  gallery?: string[] | null;
  services?: string[] | null;
}

interface ProjectShowcaseCardProps {
  project: ProjectShowcaseProject;
  priority?: boolean;
  variant?: 'feature' | 'grid';
  className?: string;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|m4v)$/i;

const ProjectShowcaseCard = ({
  project,
  priority = false,
  variant = 'feature',
  className = '',
}: ProjectShowcaseCardProps) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const cardX = useSpring(useTransform(rawX, [0, 1], reduceMotion ? [0, 0] : [-8, 8]), {
    stiffness: 180,
    damping: 20,
    mass: 0.5,
  });
  const cardY = useSpring(useTransform(rawY, [0, 1], reduceMotion ? [0, 0] : [-7, 7]), {
    stiffness: 180,
    damping: 20,
    mass: 0.5,
  });
  const rotateX = useSpring(useTransform(rawY, [0, 1], reduceMotion ? [0, 0] : [5, -5]), {
    stiffness: 160,
    damping: 20,
    mass: 0.45,
  });
  const rotateY = useSpring(useTransform(rawX, [0, 1], reduceMotion ? [0, 0] : [-7, 7]), {
    stiffness: 160,
    damping: 20,
    mass: 0.45,
  });
  const cursorX = useSpring(useTransform(rawX, [0, 1], ['14%', '86%']), {
    stiffness: 140,
    damping: 18,
    mass: 0.55,
  });
  const cursorY = useSpring(useTransform(rawY, [0, 1], ['16%', '82%']), {
    stiffness: 140,
    damping: 18,
    mass: 0.55,
  });
  const lighting = useMotionTemplate`radial-gradient(circle at ${useTransform(rawX, [0, 1], [12, 88])}% ${useTransform(rawY, [0, 1], [12, 88])}%, hsl(var(--secondary) / 0.22), transparent 28%), radial-gradient(circle at 80% 22%, hsl(var(--primary) / 0.2), transparent 36%)`;

  const previewMedia = useMemo(() => {
    const pool = [project.cover_url, ...(project.gallery ?? [])].filter(Boolean) as string[];
    return Array.from(new Set(pool)).slice(0, 4);
  }, [project.cover_url, project.gallery]);

  const tags = useMemo(() => {
    const firstTags = (project.categories ?? []).filter(Boolean).slice(0, 3);
    return firstTags.length ? firstTags : [project.industry ?? 'Selected work'];
  }, [project.categories, project.industry]);

  useEffect(() => {
    if (!hovered || reduceMotion || previewMedia.length < 2) {
      setPreviewIndex(0);
      return;
    }

    setPreviewIndex(1);
    const interval = window.setInterval(() => {
      setPreviewIndex((current) => {
        if (previewMedia.length <= 1) return 0;
        const next = current + 1;
        return next >= previewMedia.length ? 1 : next;
      });
    }, 1800);

    return () => window.clearInterval(interval);
  }, [hovered, previewMedia.length, reduceMotion]);

  const activeMedia = previewMedia[previewIndex] ?? project.cover_url ?? '';
  const isVideoPreview = VIDEO_EXTENSIONS.test(activeMedia);
  const isFeature = variant === 'feature';

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width);
    rawY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setActiveTag(null);
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={
        reduceMotion
          ? undefined
          : {
              x: cardX,
              y: cardY,
              rotateX,
              rotateY,
              transformPerspective: 1600,
              willChange: 'transform',
            }
      }
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className={`group relative block overflow-hidden rounded-[1.75rem] border border-white/14 bg-background/40 backdrop-blur-xl ${
          isFeature
            ? 'min-h-[28rem] shadow-[0_28px_90px_-42px_hsl(var(--foreground)/0.4)]'
            : 'shadow-[0_24px_70px_-42px_hsl(var(--foreground)/0.35)]'
        }`}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{ background: lighting, mixBlendMode: 'screen' }}
          animate={reduceMotion ? undefined : { opacity: hovered ? 1 : 0.72 }}
          transition={{ duration: 0.35 }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,hsl(var(--background)/0.02),transparent_30%,hsl(var(--primary)/0.74)_100%)]"
          animate={reduceMotion ? undefined : { opacity: hovered ? 1 : 0.82 }}
          transition={{ duration: 0.45 }}
        />

        <div className={`relative overflow-hidden ${isFeature ? 'aspect-[1.12/1]' : 'aspect-[1.28/1] lg:aspect-[1.04/1]'}`}>
          <AnimatePresence mode="wait">
            {activeMedia ? (
              <motion.div
                key={activeMedia}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.06, filter: 'blur(14px)', clipPath: 'inset(8% 4% 14% 4% round 2rem)' }}
                animate={{ opacity: 1, scale: hovered ? 1.04 : 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0% round 0rem)' }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {isVideoPreview ? (
                  <video
                    src={activeMedia}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={activeMedia}
                    alt={`${project.client} — ${project.title}`}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={priority ? 'high' : 'auto'}
                    className="h-full w-full object-cover transition-transform ease-out group-hover:scale-[1.08]"
                    style={{ transitionDuration: '1800ms' }}
                  />
                )}
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <span className="font-display text-5xl text-primary/30 tracking-tight">
                  {project.client?.[0] ?? project.title?.[0] ?? 'M'}
                </span>
              </div>
            )}
          </AnimatePresence>

          <motion.div
            aria-hidden
            className="absolute -left-[18%] top-[-22%] h-[120%] w-[34%] rotate-[10deg] bg-[linear-gradient(180deg,transparent,hsl(var(--secondary)/0.28),transparent)] blur-2xl"
            animate={reduceMotion ? undefined : { x: hovered ? ['-12%', '120%'] : '-12%' }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: hovered ? 1.4 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          />

          <motion.div
            className="absolute inset-x-4 top-4 z-10 flex flex-wrap items-start gap-2"
            animate={reduceMotion ? undefined : { y: hovered ? -4 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="rounded-full border border-white/16 bg-black/24 px-3 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-primary-foreground/78 backdrop-blur-md">
              {project.year ?? 'Current'}
            </span>
            <span className="rounded-full border border-white/14 bg-background/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-primary-foreground/72 backdrop-blur-md">
              {project.client}
            </span>
          </motion.div>

          <motion.div
            className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            style={reduceMotion ? undefined : { left: cursorX, top: cursorY }}
            animate={reduceMotion ? undefined : { opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex min-w-[5.5rem] items-center justify-center rounded-full border border-white/16 bg-black/26 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-primary-foreground/82 backdrop-blur-md">
              Open case
            </span>
          </motion.div>

          <div className="absolute inset-x-4 bottom-4 z-10">
            <motion.div
              className="rounded-[1.35rem] border border-white/14 bg-black/18 p-4 text-primary-foreground backdrop-blur-xl"
              animate={reduceMotion ? undefined : { y: hovered ? -4 : 0, scale: hovered ? 1.01 : 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {tags.map((tag, index) => (
                  <motion.span
                    key={`${project.slug}-${tag}`}
                    className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-primary-foreground/76"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: hovered && activeTag === index ? -3 : 0,
                            scale: hovered && activeTag === index ? 1.03 : 1,
                            opacity: hovered ? 1 : 0.82,
                          }
                    }
                    transition={{ duration: 0.3 }}
                    onAnimationStart={() => undefined}
                    onHoverStart={() => setActiveTag(index)}
                    onHoverEnd={() => setActiveTag(null)}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-end justify-between gap-5">
                <div>
                  <h3 className={`font-display leading-[1.04] text-balance ${isFeature ? 'text-[clamp(1.75rem,2.8vw,2.8rem)]' : 'text-[clamp(1.45rem,2.2vw,2.15rem)]'}`}>
                    {project.title}
                  </h3>
                  {project.excerpt ? (
                    <p className="mt-3 max-w-[34rem] text-sm leading-relaxed text-primary-foreground/74">
                      {project.excerpt}
                    </p>
                  ) : null}
                </div>
                <motion.span
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 text-primary-foreground md:inline-flex"
                  animate={reduceMotion ? undefined : { x: hovered ? 4 : 0, y: hovered ? -4 : 0, rotate: hovered ? 8 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.66rem] uppercase tracking-[0.22em] text-primary-foreground/62">
                <span>{project.industry ?? 'Creative direction'}</span>
                {project.services?.[0] ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-secondary/80" />
                    <span>{project.services[0]}</span>
                  </>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectShowcaseCard;
