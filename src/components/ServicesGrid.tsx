import React from 'react';
import { Palette, Film, Camera, Code2, Megaphone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';

const services = [
  {
    number: '01',
    title: 'Graphic Design',
    icon: Palette,
    description:
      'Brand identities, editorial systems and print work that look effortless and outlast trends.',
    href: '/services/graphic-design',
  },
  {
    number: '02',
    title: 'Motion Graphics',
    icon: Film,
    description:
      'Logo animations, explainer films and social cutdowns that move your message — literally.',
    href: '/services/motion-graphics',
  },
  {
    number: '03',
    title: 'Video Production',
    icon: Camera,
    description:
      'Brand films, documentary work and campaign content shot, edited and graded in-house.',
    href: '/services/video-editing',
  },
  {
    number: '04',
    title: 'Website Development',
    icon: Code2,
    description:
      'Editorial-quality marketing sites and product experiences engineered to convert.',
    href: '/services/web-design',
  },
  {
    number: '05',
    title: 'Digital Marketing',
    icon: Megaphone,
    description:
      'Performance-led campaigns across paid social, search and email — built around the work.',
    href: '/services/digital-marketing',
  },
];

const ServicesGrid = () => {
  return (
    <section className="py-28 md:py-36 bg-muted/40" id="services">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-24 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">What We Do</p>
            <h2 className="display-section text-foreground text-balance">
              Five disciplines.{' '}
              <span className="gold-text">One studio.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-foreground/70 text-lg leading-relaxed">
            We combine craft and strategy across every surface where your brand
            shows up — so the work feels written by the same hand.
          </p>
        </div>

        <Reveal.Stagger
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden"
          stagger={0.1}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Reveal.Item key={service.number}>
                <Link
                  to={service.href}
                  className="group block h-full p-8 md:p-10 bg-background hover:bg-primary transition-colors duration-500"
                >
                  <div className="flex items-start justify-between mb-12">
                    <span className="text-xs font-mono tracking-widest text-foreground/40 group-hover:text-primary-foreground/60 transition-colors">
                      {service.number}
                    </span>
                    <Icon
                      className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-500"
                      strokeWidth={1.25}
                    />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-4 text-foreground group-hover:text-primary-foreground transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 group-hover:text-primary-foreground/75 leading-relaxed text-[15px] mb-8 transition-colors">
                    {service.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 group-hover:text-secondary transition-colors">
                    Learn more
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              </Reveal.Item>
            );
          })}

          {/* CTA tile filling the 6th cell */}
          <Reveal.Item className="bg-primary text-primary-foreground p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-6">
                Need something else?
              </p>
              <h3 className="font-display text-2xl md:text-3xl leading-tight">
                Tell us what you're building. We'll tell you if we're the right studio.
              </h3>
            </div>
            <Link
              to="/get-started"
              className="mt-8 inline-flex items-center gap-2 text-secondary font-medium border-b border-secondary/40 pb-1 self-start hover:border-secondary transition-colors"
            >
              Start a conversation <ArrowUpRight size={16} />
            </Link>
          </Reveal.Item>
        </Reveal.Stagger>
      </div>
    </section>
  );
};

export default ServicesGrid;
