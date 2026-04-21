import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useStudioContent';
import { asTextList, DEFAULT_STUDIO_CAPABILITIES } from '@/lib/siteContent';

const StudioIntro = () => {
  const { data: settings } = useSiteSettings();
  const eyebrow = settings?.about_eyebrow ?? 'The Studio';
  const headline =
    settings?.about_headline ?? 'An editorial digital studio for ambitious brands.';
  const body =
    settings?.about_body ??
    'Mosaic06 is a small, senior team based in Accra. We work across identity, websites, campaigns, motion and product experiences — shaping work with taste, intent, and a quiet sense of craft. The brands we build are easier to trust and harder to ignore.';
  const capabilities = asTextList(settings?.studio_capabilities, DEFAULT_STUDIO_CAPABILITIES);

  return (
    <section className="py-28 md:py-36 bg-background border-t border-border/60" id="studio">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h2 className="display-section text-foreground text-balance">{headline}</h2>
          </motion.div>

          <motion.div
            className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg text-foreground/75 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {body.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {/* Capabilities strip — replaces the boxed services grid */}
            <ul className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-base text-foreground/80">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-secondary" />
                  {cap}
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-foreground font-medium border-b border-secondary pb-1 hover:gap-3 transition-all"
              >
                More about the studio
                <ArrowUpRight size={16} className="text-secondary" />
              </Link>
              <Link
                to="/contact"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Start a project →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioIntro;
