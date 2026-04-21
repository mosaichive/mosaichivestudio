import React from 'react';
import { useClientLogos, useSiteSettings } from '@/hooks/useStudioContent';

const TrustLogos = () => {
  const { data: logos } = useClientLogos({ onlyPublished: true });
  const { data: settings } = useSiteSettings();
  const list = logos && logos.length > 0 ? logos : [];
  const doubled = [...list, ...list];
  const eyebrow = settings?.trust_eyebrow ?? 'Selected Clients';
  const headline =
    settings?.trust_headline ?? 'Trusted by foundations, founders and ambitious teams.';
  const body =
    settings?.trust_body ??
    "A small selection of partners we've shaped brand and digital work for.";

  if (list.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden border-y border-border">
      <div className="container-editorial mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-balance max-w-[22ch]">
            {headline}
          </h2>
        </div>
        <p className="text-sm text-foreground/60 max-w-xs">
          {body}
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex marquee-track gap-12 md:gap-16 items-center w-max">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex items-center justify-center min-w-[140px] md:min-w-[180px] h-20 md:h-24 px-6 md:px-8 rounded-sm bg-background/70 dark:bg-white border border-border/50 dark:border-white/10"
            >
              {logo.logo_url ? (
                <img
                  src={logo.logo_url}
                  alt={logo.name}
                  className="max-h-12 md:max-h-14 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="font-display text-base md:text-lg tracking-[0.18em] text-foreground/80 dark:text-primary whitespace-nowrap uppercase text-center">
                  {logo.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
