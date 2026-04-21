import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useStudioContent';

const ConversionCTA = () => {
  const { data: settings } = useSiteSettings();
  const headline = settings?.cta_headline ?? 'Have a project worth doing well?';
  const subheadline =
    settings?.cta_subheadline ??
    'Tell us what you\u2019re building. We reply to every inquiry within one working day with honest, useful next steps.';
  const buttonLabel = settings?.cta_button_label ?? 'Start a project';
  const buttonLink = settings?.cta_button_link ?? '/contact';

  // Highlight final two words in gold
  const renderHeadline = () => {
    const words = headline.split(' ');
    if (words.length < 3) return headline;
    const last = words.slice(-2).join(' ');
    const rest = words.slice(0, -2).join(' ');
    return (
      <>
        {rest} <span className="gold-text">{last}</span>
      </>
    );
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-sm bg-primary text-primary-foreground p-12 md:p-20 grain-overlay"
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
                Work with the studio
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-[5rem] leading-[1.02] tracking-[-0.02em] text-balance max-w-[18ch]">
                {renderHeadline()}
              </h2>
              <p className="mt-8 text-lg md:text-xl text-primary-foreground/75 max-w-xl leading-relaxed">
                {subheadline}
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to={buttonLink}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-all"
              >
                {buttonLabel}
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-foreground/25 text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/10 transition-all"
              >
                Book a call
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionCTA;
