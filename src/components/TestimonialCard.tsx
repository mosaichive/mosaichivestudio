import React from 'react';
import { Quote } from 'lucide-react';
import type { TestimonialRow } from '@/hooks/useStudioContent';

interface TestimonialCardProps {
  testimonial: TestimonialRow;
  ariaHidden?: boolean;
}

const TestimonialCard = ({ testimonial, ariaHidden = false }: TestimonialCardProps) => (
  <article
    aria-hidden={ariaHidden}
    className="testimonial-card relative flex h-full flex-col rounded-[2rem] border border-border/70 bg-background/92 p-8 md:p-10"
  >
    <div className="flex items-center gap-3 text-secondary/75">
      <Quote className="h-7 w-7" strokeWidth={1.25} />
      <div className="h-px flex-1 bg-border/80" />
    </div>
    <p className="mt-8 font-display text-[1.75rem] leading-[1.38] tracking-[-0.02em] text-foreground md:text-[2.1rem]">
      &ldquo;{testimonial.quote}&rdquo;
    </p>
    <div className="mt-10 flex items-center gap-4">
      <div
        className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-full flex items-center justify-center ${
          testimonial.avatar_url
            ? 'border border-border/70 bg-white p-1.5'
            : 'bg-muted text-secondary'
        }`}
      >
        {testimonial.avatar_url ? (
          <img
            src={testimonial.avatar_url}
            alt={`${testimonial.author} logo`}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="font-display text-base">{testimonial.author.charAt(0)}</span>
        )}
      </div>
      <div>
        <p className="font-medium text-foreground">{testimonial.author}</p>
        <p className="text-sm text-foreground/60">
          {[testimonial.role, testimonial.company].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  </article>
);

export default TestimonialCard;
