import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import { useProject, useProjects } from '@/hooks/useStudioContent';
import { getAbsoluteUrl } from '@/lib/site';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { data: project, isLoading } = useProject(slug);
  const { data: allProjects } = useProjects({ onlyPublished: true });

  useEffect(() => {
    if (!project) return;
    const url = getAbsoluteUrl(`/portfolio/${project.slug}`);
    const title = `${project.client} — ${project.title} · Mosaic06 Studio`;
    const description =
      project.excerpt ??
      `${project.title} — a ${project.categories?.[0]?.toLowerCase() ?? 'creative'} project by Mosaic06 Studio for ${project.client}.`;

    document.title = title;

    const ensure = (selector: string, factory: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = factory();
        document.head.appendChild(el);
      }
      return el;
    };
    const setMeta = (name: string, content: string) => {
      const el = ensure(`meta[name="${name}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('name', name);
        return m;
      });
      el.setAttribute('content', content);
    };
    const setOg = (property: string, content: string) => {
      const el = ensure(`meta[property="${property}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('property', property);
        return m;
      });
      el.setAttribute('content', content);
    };
    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    canonical.setAttribute('href', url);
    setMeta('description', description);
    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:type', 'article');
    setOg('og:url', url);
    if (project.cover_url) setOg('og:image', project.cover_url);
  }, [project]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen pt-32 container-editorial">
          <p className="text-foreground/50">Loading…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) return <Navigate to="/portfolio" replace />;

  const list = allProjects ?? [];
  const idx = list.findIndex((c) => c.slug === project.slug);
  const next = list.length > 0 ? list[(idx + 1) % list.length] : null;

  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* 1. Hero media — full-bleed editorial poster */}
        <section className="pt-28 md:pt-32">
          <div className="container-editorial">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-secondary transition-colors mb-8"
            >
              <ArrowLeft size={14} /> All work
            </Link>
          </div>

          {project.cover_url && (
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-muted"
            >
              <div className="container-editorial">
                <div className="rounded-sm overflow-hidden">
                  <img
                    src={project.cover_url}
                    alt={`${project.client} — ${project.title}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* 2. Title + key metadata */}
        <section className="pt-12 md:pt-20 pb-10">
          <div className="container-editorial grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">{project.categories?.[0] ?? 'Case Study'} · {project.year}</p>
              <h1 className="display-hero text-foreground text-balance leading-[1.04]">
                {project.title}
              </h1>
              {project.excerpt && (
                <p className="mt-8 text-xl md:text-2xl text-foreground/75 leading-relaxed max-w-3xl font-display">
                  {project.excerpt}
                </p>
              )}
            </div>
            <aside className="lg:col-span-4 lg:pl-10 lg:border-l border-border space-y-6 self-end text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/40 mb-1">Client</p>
                <p className="font-medium text-foreground">{project.client}</p>
              </div>
              {project.industry && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/40 mb-1">Industry</p>
                  <p className="font-medium text-foreground">{project.industry}</p>
                </div>
              )}
              {project.categories?.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/40 mb-2">Discipline</p>
                  <p className="text-foreground/80">{project.categories.join(' · ')}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/40 mb-1">Year</p>
                  <p className="font-medium text-foreground">{project.year}</p>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* 3. Challenge */}
        {project.challenge && (
          <section className="py-16 md:py-24 border-t border-border/60">
            <div className="container-editorial grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <p className="eyebrow">Challenge</p>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <p className="font-display text-2xl md:text-3xl leading-snug text-foreground text-balance">
                  {project.challenge}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 4. Approach (Solution) */}
        {project.solution && (
          <section className="py-16 md:py-24 border-t border-border/60">
            <div className="container-editorial grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <p className="eyebrow">Approach</p>
              </div>
              <div className="lg:col-span-8 lg:col-start-5 space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                {project.solution.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services + tools — short, clean editorial chips */}
        {(project.services?.length > 0 || project.tools?.length > 0) && (() => {
          // Split legacy comma-stuffed entries and dedupe so the section reads cleanly
          const clean = (arr: string[]) =>
            Array.from(
              new Set(
                arr
                  .flatMap((s) => s.split(/,|·|\|/))
                  .map((s) => s.replace(/\s*\(.*?\)\s*/g, '').trim())
                  .filter(Boolean)
              )
            );
          const services = clean(project.services ?? []);
          const tools = clean(project.tools ?? []);
          return (
            <section className="py-16 md:py-24 border-t border-border/60">
              <div className="container-editorial grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-3">
                  <p className="eyebrow">Scope</p>
                </div>
                <div className="lg:col-span-8 lg:col-start-5 grid sm:grid-cols-2 gap-12">
                  {services.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-5">Services</p>
                      <ul className="flex flex-wrap gap-2">
                        {services.map((s) => (
                          <li key={s} className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground/85 bg-background">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tools.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-5">Tools</p>
                      <ul className="flex flex-wrap gap-2">
                        {tools.map((t) => (
                          <li key={t} className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground/85 bg-background">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        {/* 5. Outcomes / Results */}
        {project.results && project.results.length > 0 && (
          <section className="py-20 md:py-28 bg-primary text-primary-foreground">
            <div className="container-editorial">
              <p className="eyebrow text-secondary before:bg-secondary mb-12">Outcomes</p>
              <div className="grid md:grid-cols-3 gap-10 md:gap-12">
                {project.results.map((r) => (
                  <div key={r.label} className="border-t border-primary-foreground/20 pt-6">
                    <div className="font-display text-5xl md:text-6xl text-secondary tracking-tight">
                      {r.value}
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.24em] text-primary-foreground/70">
                      {r.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Image gallery — only render real images, never empty frames */}
        {(() => {
          const images = (project.gallery ?? []).filter(
            (g): g is string => typeof g === 'string' && g.trim().length > 0
          );
          if (images.length === 0) return null;
          const layouts = [
            'md:col-span-12 aspect-[16/9]',
            'md:col-span-7 aspect-[4/3]',
            'md:col-span-5 aspect-[4/5]',
            'md:col-span-5 aspect-[4/5] md:mt-12',
            'md:col-span-7 aspect-[4/3] md:mt-12',
          ];
          return (
            <section className="py-20 md:py-28">
              <div className="container-editorial">
                <p className="eyebrow mb-10">Gallery</p>
                <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`col-span-12 ${layouts[i % layouts.length]} rounded-sm overflow-hidden bg-muted relative group`}
                    >
                      <img
                        src={img}
                        alt={`${project.client} gallery ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.6s] ease-out"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* 7. Next project */}
        {next && next.slug !== project.slug && (
          <section className="py-20 md:py-28 border-t border-border/60">
            <div className="container-editorial">
              <p className="eyebrow mb-6">Next project</p>
              <Link to={`/portfolio/${next.slug}`} className="group inline-flex items-baseline gap-4">
                <h2 className="font-display text-4xl md:text-6xl text-foreground group-hover:text-secondary transition-colors leading-tight text-balance">
                  {next.title}
                </h2>
                <ArrowUpRight className="text-secondary mt-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <p className="mt-3 text-foreground/60">
                {next.client}{next.industry ? ` · ${next.industry}` : ''}
              </p>
            </div>
          </section>
        )}

        <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default CaseStudyPage;
