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
    className="testimonial-card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/90 p-6 md:p-7"
  >
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-secondary/80">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/25 bg-secondary/10">
          <Quote className="h-5 w-5" strokeWidth={1.35} />
        </span>
        <div className="h-px w-14 bg-border/80 md:w-20" />
      </div>
      {testimonial.company ? (
        <span className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/45">
          {testimonial.company}
        </span>
      ) : null}
    </div>
    <p className="testimonial-quote mt-6 font-display text-[1.08rem] leading-[1.62] tracking-[-0.01em] text-foreground md:text-[1.22rem]">
      &ldquo;{testimonial.quote}&rdquo;
    </p>
    <div className="mt-6 flex items-center gap-4 border-t border-border/70 pt-5">
      <div
        className={`h-11 w-11 flex-shrink-0 overflow-hidden rounded-full flex items-center justify-center ${
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
        <p className="text-[1rem] font-medium leading-tight text-foreground">{testimonial.author}</p>
        <p className="mt-1 text-[0.86rem] leading-relaxed text-foreground/58">
          {[testimonial.role, testimonial.company].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,hsl(var(--secondary)/0.05),transparent)]" />
  </article>
);

export default TestimonialCard;
