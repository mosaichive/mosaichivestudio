import React from 'react';
import { Quote } from 'lucide-react';
import { useSiteSettings, useTestimonials } from '@/hooks/useStudioContent';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/Reveal';

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials({ onlyPublished: true });
  const { data: settings } = useSiteSettings();
  const featured = (testimonials ?? []).slice(0, 2);
  const eyebrow = settings?.testimonials_eyebrow ?? 'In Their Words';
  const headline = settings?.testimonials_headline ?? 'What it feels like to work with us.';

  return (
    <section className="py-28 md:py-36 bg-background" id="testimonials">
      <div className="container-editorial">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 className="display-section text-foreground text-balance">
            {headline}
          </h2>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-10">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-sm" />
            ))}
          </div>
        ) : (
          <Reveal.Stagger className="grid md:grid-cols-2 gap-12 md:gap-16" stagger={0.15}>
            {featured.map((t) => (
              <Reveal.Item
                key={t.id}
                as="article"
                className="relative border-t border-border pt-10"
              >
                <Quote className="absolute -top-4 left-0 w-8 h-8 text-secondary/70 bg-background pr-2" strokeWidth={1.25} />
                <p className="font-display text-2xl md:text-[1.75rem] leading-snug text-foreground mb-10 text-balance">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.author} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display text-base text-secondary">
                        {t.author.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t.author}</p>
                    <p className="text-sm text-foreground/60">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </Reveal.Item>
            ))}
          </Reveal.Stagger>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
