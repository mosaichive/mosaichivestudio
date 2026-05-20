import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Workshops, audits and a deep listen. We get fluent in your business before we open Figma.',
  },
  {
    n: '02',
    title: 'Strategy',
    body: 'Positioning, audience mapping and a creative brief everyone signs off on — including us.',
  },
  {
    n: '03',
    title: 'Design / Production',
    body: 'The making part. Identity, film, web, content — crafted in tight feedback loops, not month-long silences.',
  },
  {
    n: '04',
    title: 'Refinement',
    body: 'We pressure-test the work in real environments and revise until it feels inevitable.',
  },
  {
    n: '05',
    title: 'Delivery & Growth',
    body: 'Final files, training, launch support — and an ongoing relationship as you scale the work.',
  },
];

const Process = () => {
  return (
    <section className="py-28 md:py-36 bg-background" id="process">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-24 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">How We Work</p>
            <h2 className="display-section text-foreground text-balance">
              A process built around the work — not the timesheet.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-foreground/70 text-lg leading-relaxed">
            Five clear stages. No surprises, no scope theatre. You always know
            where the project is, who's working on it, and what's next.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative"
              >
                {/* Dot */}
                <div className="hidden md:block absolute left-1/2 top-4 w-3 h-3 rounded-full bg-secondary -translate-x-1/2 ring-8 ring-background" />

                <div className={i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-2 md:pl-16'}>
                  <span className="font-mono text-xs tracking-widest text-foreground/40">
                    Step {step.n}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl mt-3 mb-4">
                    {step.title}
                  </h3>
                </div>
                <div className={i % 2 === 0 ? 'md:pl-16' : 'md:order-1 md:text-right md:pr-16'}>
                  <p className="text-foreground/70 text-lg leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
