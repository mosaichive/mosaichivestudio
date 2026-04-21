import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProjects } from '@/hooks/useStudioContent';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/Reveal';

// Curated, brand-friendly filters only
const FILTERS = ['All', 'Brand', 'Web', 'Product', 'Campaign', 'Motion', 'E-commerce'] as const;
type Filter = (typeof FILTERS)[number];

// Asymmetric editorial grid pattern (col-span / aspect-ratio per index)
const PATTERN: { col: string; aspect: string; offset?: string }[] = [
  { col: 'lg:col-span-7', aspect: 'aspect-[4/3]' },
  { col: 'lg:col-span-5 lg:mt-24', aspect: 'aspect-[4/5]' },
  { col: 'lg:col-span-5', aspect: 'aspect-[4/5]' },
  { col: 'lg:col-span-7 lg:mt-16', aspect: 'aspect-[4/3]' },
  { col: 'lg:col-span-12', aspect: 'aspect-[16/8]' },
  { col: 'lg:col-span-6', aspect: 'aspect-[4/3]' },
  { col: 'lg:col-span-6 lg:mt-20', aspect: 'aspect-[4/3]' },
];

const PortfolioGrid = () => {
  const [active, setActive] = useState<Filter>('All');
  const { data: projects, isLoading } = useProjects({ onlyPublished: true });

  const filtered = useMemo(() => {
    const list = projects ?? [];
    if (active === 'All') return list;
    return list.filter((c) => c.categories?.includes(active));
  }, [projects, active]);

  return (
    <>
      {/* Header / intro */}
      <section className="pt-32 md:pt-40 pb-10 md:pb-14 bg-background">
        <div className="container-editorial">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6">Selected Work</p>
            <h1 className="display-section text-foreground text-balance">
              A decade of work for brands who care{' '}
              <span className="gold-text">how it looks.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/70 leading-relaxed max-w-2xl">
              Identity systems, brand films, marketing sites and launch campaigns —
              built across hospitality, fashion, fintech, non-profit and culture.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-y border-border/60">
        <div className="container-editorial py-4 md:py-5">
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 pb-1 md:pb-0">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`shrink-0 whitespace-nowrap px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all ${
                    active === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent text-foreground/65 hover:text-foreground hover:bg-foreground/5 border border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
              <div className="ml-auto hidden md:block shrink-0 text-xs uppercase tracking-[0.24em] text-foreground/45 pl-4">
                {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
              </div>
            </div>
            {/* Right-edge fade hint on mobile so users know it scrolls */}
            <div className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>
      </div>

      {/* Grid — starts immediately after the sticky bar (no big empty gap) */}
      <section className="pt-12 md:pt-16 pb-28 md:pb-36 bg-background">
        <div className="container-editorial">
          {isLoading ? (
            <div className="grid grid-cols-12 gap-6 md:gap-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className={`col-span-12 ${PATTERN[i].col} ${PATTERN[i].aspect} rounded-sm`} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-foreground/70">
                No projects in <span className="text-secondary">{active}</span> yet.
              </p>
              <button
                onClick={() => setActive('All')}
                className="mt-4 text-sm underline underline-offset-4 text-foreground/60 hover:text-foreground"
              >
                View all work
              </button>
            </div>
          ) : (
            <Reveal.Stagger
              key={active}
              className="grid grid-cols-12 gap-y-14 md:gap-y-24 gap-x-6 md:gap-x-10"
              stagger={0.08}
            >
              {filtered.map((project, i) => {
                const p = PATTERN[i % PATTERN.length];
                return (
                  <Reveal.Item
                    key={project.id}
                    as="article"
                    className={`col-span-12 ${p.col}`}
                    y={28}
                  >
                    <Link to={`/portfolio/${project.slug}`} className="group block">
                      <div className={`relative overflow-hidden rounded-sm bg-muted ${p.aspect} mb-5`}>
                        {project.cover_url ? (
                          <img
                            src={project.cover_url}
                            alt={`${project.client} — ${project.title}`}
                            loading={i < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                            <span className="font-display text-4xl md:text-5xl text-primary/30 tracking-tight">
                              {project.client?.[0] ?? project.title?.[0] ?? 'M'}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-3">
                        <span>{project.categories?.[0] ?? project.industry ?? '—'}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/30" />
                        <span>{project.year}</span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-secondary transition-colors leading-snug text-balance">
                        {project.title}
                      </h2>
                      {project.excerpt && (
                        <p className="mt-2 text-foreground/60 leading-relaxed max-w-prose">
                          {project.excerpt}
                        </p>
                      )}
                    </Link>
                  </Reveal.Item>
                );
              })}
            </Reveal.Stagger>
          )}
        </div>
      </section>
    </>
  );
};

export default PortfolioGrid;
