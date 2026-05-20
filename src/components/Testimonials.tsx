import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { useSiteSettings, useTestimonials } from '@/hooks/useStudioContent';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/Reveal';
import TestimonialCard from '@/components/TestimonialCard';

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials({ onlyPublished: true });
  const { data: settings } = useSiteSettings();
  const reduceMotion = useReducedMotion();
  const featured = testimonials ?? [];
  const marqueeItems = [...featured, ...featured];
  const eyebrow = settings?.testimonials_eyebrow ?? 'In Their Words';
  const headline = settings?.testimonials_headline ?? 'What it feels like to work with us.';

  return (
    <section className="relative overflow-hidden py-28 md:py-36 bg-background" id="testimonials">
      <div className="container-editorial relative z-10">
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
        ) : reduceMotion || featured.length < 2 ? (
          <Reveal.Stagger className="grid gap-8 md:grid-cols-2" stagger={0.12}>
            {featured.map((testimonial) => (
              <Reveal.Item key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal.Item>
            ))}
          </Reveal.Stagger>
        ) : null}
      </div>

      {!isLoading && !reduceMotion && featured.length >= 2 ? (
        <div className="testimonial-marquee-shell relative z-10 mt-4 md:mt-6">
          <div className="testimonial-marquee">
            <div className="testimonial-marquee-track">
              {marqueeItems.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  ariaHidden={index >= featured.length}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--secondary)/0.08),transparent_28%),radial-gradient(circle_at_82%_64%,hsl(var(--primary)/0.08),transparent_32%)]" />
    </section>
  );
};

export default Testimonials;
