import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProjects } from '@/hooks/useStudioContent';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/Reveal';

// Curated order for the homepage editorial selection
const FEATURED_SLUGS = ['salestallysystem', 'terraaidinternational', 'maggstrove'];

const FeaturedWork = () => {
  const { data: projects, isLoading } = useProjects({ onlyPublished: true });

  // Order by curated slugs, then fall back to featured/all
  const list = React.useMemo(() => {
    const all = projects ?? [];
    const picked: typeof all = [];
    for (const slug of FEATURED_SLUGS) {
      const found = all.find((p) => p.slug === slug);
      if (found) picked.push(found);
    }
    if (picked.length < 3) {
      for (const p of all) {
        if (picked.length >= 3) break;
        if (!picked.find((x) => x.id === p.id)) picked.push(p);
      }
    }
    return picked.slice(0, 3);
  }, [projects]);

  return (
    <section className="pt-24 md:pt-32 pb-28 md:pb-40 bg-background" id="work">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Selected Work</p>
            <h2 className="display-section text-foreground text-balance max-w-[20ch]">
              A small, considered selection.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="lg:col-span-4 lg:justify-self-end inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-secondary hover:text-secondary transition-colors self-end"
          >
            Browse the full index <ArrowUpRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <Skeleton className="col-span-12 lg:col-span-8 aspect-[16/11] rounded-sm" />
            <Skeleton className="col-span-12 lg:col-span-4 aspect-[4/5] rounded-sm" />
            <Skeleton className="col-span-12 lg:col-span-12 aspect-[16/8] rounded-sm" />
          </div>
        ) : (
          <Reveal.Stagger className="grid grid-cols-12 gap-y-16 md:gap-y-24 gap-x-6 md:gap-x-10" stagger={0.14}>
            {/* Project 1 — large left, two-thirds */}
            {list[0] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-8" y={32}>
                <ProjectCard project={list[0]} aspect="aspect-[16/11]" priority />
              </Reveal.Item>
            )}

            {/* Project 2 — tall right, one-third, offset down */}
            {list[1] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-4 lg:mt-24" y={32}>
                <ProjectCard project={list[1]} aspect="aspect-[4/5]" />
              </Reveal.Item>
            )}

            {/* Project 3 — full-bleed wide, offset right */}
            {list[2] && (
              <Reveal.Item as="article" className="col-span-12 lg:col-span-10 lg:col-start-3" y={32}>
                <ProjectCard project={list[2]} aspect="aspect-[16/8]" />
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
    <div className={`relative overflow-hidden rounded-sm bg-muted ${aspect} mb-6`}>
      {project.cover_url ? (
        <img
          src={project.cover_url}
          alt={`${project.client} — ${project.title}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
          <span className="font-display text-5xl md:text-6xl text-primary/30 tracking-tight">
            {project.client?.[0] ?? project.title?.[0] ?? 'M'}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <ArrowUpRight size={16} />
      </div>
    </div>
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-3">
      <span>{project.categories?.[0] ?? project.industry}</span>
      <span className="w-1 h-1 rounded-full bg-foreground/30" />
      <span>{project.year}</span>
    </div>
    <h3 className="font-display text-2xl md:text-3xl leading-snug text-foreground group-hover:text-secondary transition-colors duration-300 text-balance">
      {project.title}
    </h3>
    {project.excerpt && (
      <p className="mt-2 text-foreground/60 leading-relaxed max-w-prose">{project.excerpt}</p>
    )}
  </Link>
);

export default FeaturedWork;
