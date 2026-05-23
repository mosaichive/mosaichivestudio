import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProjects, useSiteSettings } from '@/hooks/useStudioContent';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/Reveal';

const FeaturedWork = () => {
  const { data: featuredProjects, isLoading: featuredLoading } = useProjects({ onlyPublished: true, onlyFeatured: true });
  const { data: publishedProjects, isLoading: publishedLoading } = useProjects({ onlyPublished: true });
  const { data: settings } = useSiteSettings();
  const eyebrow = settings?.featured_eyebrow ?? 'Selected Work';
  const headline = settings?.featured_headline ?? 'Selected work from a serious creative partner.';
  const ctaLabel = settings?.featured_cta_label ?? 'Browse the full index';
  const ctaLink = settings?.featured_cta_link ?? '/portfolio';
  const isLoading = featuredLoading || publishedLoading;
  const list = useMemo(() => {
    const featured = featuredProjects ?? [];
    const published = publishedProjects ?? [];
    if (featured.length >= 4) return featured.slice(0, 4);

    const featuredIds = new Set(featured.map((project) => project.id));
    const fill = published.filter((project) => !featuredIds.has(project.id));
    return [...featured, ...fill].slice(0, 4);
  }, [featuredProjects, publishedProjects]);

  if (!isLoading && list.length === 0) return null;

  return (
    <section className="overflow-x-clip pt-20 md:pt-24 pb-24 md:pb-32 bg-background" id="selected-work">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h2 className="display-section text-foreground text-balance max-w-[20ch]">
              {headline}
            </h2>
          </div>
          <Link
            to={ctaLink}
            className="lg:col-span-4 lg:justify-self-end inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-secondary hover:text-secondary transition-colors self-end"
          >
            {ctaLabel} <ArrowUpRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-12 gap-5 md:gap-7">
            <Skeleton className="col-span-12 lg:col-span-7 aspect-[16/10] rounded-[1.1rem]" />
            <Skeleton className="col-span-12 lg:col-span-5 aspect-[4/4.2] rounded-[1.1rem]" />
            <Skeleton className="col-span-12 lg:col-span-5 aspect-[4/4.2] rounded-[1.1rem]" />
            <Skeleton className="col-span-12 lg:col-span-7 aspect-[16/9] rounded-[1.1rem]" />
          </div>
        ) : (
          <Reveal.Stagger className="grid grid-cols-12 gap-y-10 md:gap-y-14 gap-x-5 md:gap-x-7" stagger={0.1}>
            {list[0] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-7" y={24}>
                <ProjectCard project={list[0]} aspect="aspect-[16/10]" priority />
              </Reveal.Item>
            )}

            {list[1] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-5 lg:mt-8" y={24}>
                <ProjectCard project={list[1]} aspect="aspect-[4/4.2]" />
              </Reveal.Item>
            )}

            {list[2] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-5" y={24}>
                <ProjectCard project={list[2]} aspect="aspect-[4/4.2]" />
              </Reveal.Item>
            )}

            {list[3] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-7 lg:mt-8" y={24}>
                <ProjectCard project={list[3]} aspect="aspect-[16/9]" />
              </Reveal.Item>
            )}
          </Reveal.Stagger>
        )}
      </div>
    </section>
  );
};

type CardProps = {
  project: {
    slug: string;
    title: string;
    client: string;
    industry: string | null;
    year: string | null;
    cover_url: string | null;
    excerpt: string | null;
    categories: string[];
  };
  aspect: string;
  priority?: boolean;
};

const ProjectCard: React.FC<CardProps> = ({ project, aspect, priority }) => (
  <Link to={`/portfolio/${project.slug}`} className="group block">
    <div className={`relative overflow-hidden rounded-[1.1rem] border border-border/60 bg-muted ${aspect} mb-4 shadow-[0_20px_50px_-34px_hsl(var(--foreground)/0.28)]`}>
      {project.cover_url ? (
        <img
          src={project.cover_url}
          alt={`${project.client} — ${project.title}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 w-full h-full object-cover transition-transform ease-out group-hover:scale-[1.04]"
          style={{ transitionDuration: '1600ms' }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
          <span className="font-display text-4xl md:text-5xl text-primary/30 tracking-tight">
            {project.client?.[0] ?? project.title?.[0] ?? 'M'}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <ArrowUpRight size={15} />
      </div>
    </div>
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-foreground/45 mb-2">
      <span>{project.categories?.[0] ?? project.industry}</span>
      <span className="w-1 h-1 rounded-full bg-foreground/30" />
      <span>{project.year}</span>
    </div>
    <h3 className="font-display text-[1.55rem] md:text-[2rem] leading-[1.12] text-foreground group-hover:text-secondary transition-colors duration-300 text-balance">
      {project.title}
    </h3>
    {project.excerpt && (
      <p className="mt-2 text-sm md:text-[0.96rem] text-foreground/60 leading-relaxed max-w-[52ch]">{project.excerpt}</p>
    )}
  </Link>
);

export default FeaturedWork;
