import React from 'react';
import Reveal from '@/components/Reveal';
import { useSiteSettings } from '@/hooks/useStudioContent';
import { asProofItems, getDefaultProofItems } from '@/lib/siteContent';

const WhyChooseUs = () => {
  const { data: settings } = useSiteSettings();
  const proofs = asProofItems(settings?.proof_items, getDefaultProofItems(settings));
  const eyebrow = settings?.proof_eyebrow ?? 'Proof, not promises';
  const headline =
    settings?.proof_headline ?? 'Work that earns its place on your brand';
  const highlight = settings?.proof_highlight ?? '— and on your P&L.';

  return (
    <section className="py-28 md:py-36 bg-primary text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at 15% 0%, hsl(var(--secondary) / 0.22), transparent 55%)',
        }}
      />
      <div className="container-editorial relative">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-secondary before:bg-secondary">{eyebrow}</p>
            <h2 className="display-section text-balance">
              {headline}{' '}
              {highlight && <span className="gold-text">{highlight}</span>}
            </h2>
          </div>
        </div>

        <Reveal.Stagger className="grid md:grid-cols-3 gap-12 md:gap-16" stagger={0.12}>
          {proofs.map((p) => (
            <Reveal.Item key={p.label} className="border-t border-primary-foreground/20 pt-8">
              <div className="font-display text-6xl md:text-7xl text-secondary tracking-tight leading-none">
                {p.stat}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-primary-foreground/70">
                {p.label}
              </p>
              <p className="mt-6 text-primary-foreground/75 leading-relaxed">{p.body}</p>
            </Reveal.Item>
          ))}
        </Reveal.Stagger>
      </div>
    </section>
  );
};

export default WhyChooseUs;
