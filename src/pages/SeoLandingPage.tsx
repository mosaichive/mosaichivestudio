import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import ScrollAnimations from '@/components/ScrollAnimations';
import { useSEO } from '@/hooks/useSEO';
import { useStructuredData } from '@/hooks/useStructuredData';
import { getAbsoluteUrl } from '@/lib/site';
import type { SeoLandingPageDefinition } from '@/data/seoLandingPages';

type SeoLandingPageProps = {
  page: SeoLandingPageDefinition;
};

const SeoLandingPage = ({ page }: SeoLandingPageProps) => {
  useSEO({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
  });

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      url: getAbsoluteUrl(page.path),
      description: page.description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Mosaic06 Studio',
        url: getAbsoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Mosaic06 Studio',
      alternateName: ['Mosaic Hive'],
      areaServed: ['Accra', 'Ghana', 'Worldwide'],
      url: getAbsoluteUrl(page.path),
      description: page.description,
      serviceType: page.label,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getAbsoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.label,
          item: getAbsoluteUrl(page.path),
        },
      ],
    },
  ];

  useStructuredData(structuredData);

  return (
    <div className="bg-background relative">
      <ScrollAnimations />
      <Navbar />

      <main>
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 border-b border-border/60">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <Reveal as="div" className="lg:col-span-8">
                <p className="eyebrow mb-8">{page.eyebrow}</p>
                <h1 className="display-page text-foreground text-balance">
                  {page.heading}
                </h1>
                <p className="mt-8 max-w-3xl text-base md:text-lg text-foreground/72 leading-relaxed">
                  {page.intro}
                </p>
              </Reveal>

              <Reveal as="div" className="lg:col-span-4 space-y-8" delay={0.15}>
                <div className="rounded-[2rem] border border-border/60 bg-muted/35 p-7">
                  <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-4">
                    Why this page exists
                  </p>
                  <p className="text-base text-foreground/72 leading-relaxed">
                    {page.positioning}
                  </p>
                </div>

                <div className="space-y-4">
                  {page.highlights.map((item) => (
                    <div key={item} className="flex gap-3 text-sm text-foreground/72 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={page.cta.to}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
                  >
                    {page.cta.label}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/25 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all"
                  >
                    View selected work
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <Reveal as="div" className="mb-16 max-w-2xl">
              <p className="eyebrow mb-6">What the studio helps with</p>
              <h2 className="display-section text-foreground text-balance">
                High-trust creative work, scoped for real business moments.
              </h2>
            </Reveal>

            <Reveal.Stagger className="grid gap-px bg-border/60 border border-border/60 lg:grid-cols-3">
              {page.sections.map((section) => (
                <Reveal.Item key={section.title} className="bg-background p-8 md:p-10">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-[-0.01em] leading-tight">
                    {section.title}
                  </h3>
                  <p className="mt-5 text-base text-foreground/72 leading-relaxed">
                    {section.body}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-foreground/68">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-muted/30 border-y border-border/60">
          <div className="container-editorial">
            <Reveal as="div" className="mb-16 max-w-2xl">
              <p className="eyebrow mb-6">Relevant routes</p>
              <h2 className="display-section text-foreground text-balance">
                Keep exploring the studio from the angle that fits the brief.
              </h2>
            </Reveal>

            <Reveal.Stagger className="grid gap-6 lg:grid-cols-3">
              {page.relatedLinks.map((link) => (
                <Reveal.Item key={link.to} className="h-full">
                  <Link
                    to={link.to}
                    className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-border/60 bg-background p-8 hover:border-secondary/50 hover:bg-background/90 transition-all"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-5">
                        Internal link
                      </p>
                      <h3 className="font-display text-2xl text-foreground tracking-[-0.01em] leading-tight">
                        {link.label}
                      </h3>
                      <p className="mt-4 text-sm text-foreground/68 leading-relaxed">
                        {link.description}
                      </p>
                    </div>
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

        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <Reveal as="div" className="lg:col-span-4">
                <p className="eyebrow mb-6">Questions clients ask</p>
                <h2 className="display-section text-foreground text-balance">
                  Useful answers before the first call.
                </h2>
              </Reveal>

              <Reveal.Stagger className="lg:col-span-8 space-y-4">
                {page.faqs.map((faq) => (
                  <Reveal.Item
                    key={faq.question}
                    className="rounded-[1.5rem] border border-border/60 bg-background p-7 md:p-8"
                  >
                    <h3 className="font-display text-2xl text-foreground tracking-[-0.01em] leading-tight">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-base text-foreground/72 leading-relaxed">
                      {faq.answer}
                    </p>
                  </Reveal.Item>
                ))}
              </Reveal.Stagger>
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="container-editorial">
            <Reveal
              as="div"
              className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground p-10 md:p-14 lg:p-16 grain-overlay"
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  background:
                    'radial-gradient(circle at 25% 50%, hsl(var(--secondary) / 0.32), transparent 55%)',
                }}
              />
              <div className="relative grid lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8">
                  <p className="eyebrow mb-6 text-secondary before:bg-secondary">
                    {page.cta.eyebrow}
                  </p>
                  <h2 className="font-display text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.05] tracking-[-0.02em] text-balance max-w-[16ch]">
                    {page.cta.headline}
                  </h2>
                  <p className="mt-7 max-w-2xl text-lg text-primary-foreground/76 leading-relaxed">
                    {page.cta.body}
                  </p>
                </div>
                <div className="lg:col-span-4 lg:justify-self-end flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    to={page.cta.to}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-all"
                  >
                    {page.cta.label}
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-foreground/25 text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/10 transition-all"
                  >
                    Contact the studio
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeoLandingPage;
