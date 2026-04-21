import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversionCTA from '@/components/ConversionCTA';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';

const team = [
  {
    name: 'Maxwell Osei-Bosompem',
    role: 'Founder · Creative Direction',
    image: '/lovable-uploads/e594de62-18f6-46e4-a266-716e18dc50db.png',
    bio: 'Maxwell leads the studio and sets creative direction across identity, web and campaigns. He works directly on every engagement.',
  },
  {
    name: 'Richard Owusu Sekyere',
    role: 'Strategy · Consulting',
    image: '/lovable-uploads/ff985dfe-0c19-4dda-85a4-dffe3ff86ac2.png',
    bio: 'Richard partners with founders and leadership teams on positioning, narrative and the strategic side of brand work.',
  },
];

const TeamPage = () => {
  useSEO({
    title: 'Team · Mosaic06 Studio',
    description:
      'The leadership and specialist network behind Mosaic06 — creative direction, strategy and craft applied to every engagement.',
    path: '/team',
  });

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-20 md:pb-28 border-b border-border/60">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Team</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                The hands behind{' '}
                <span className="italic text-secondary">the work</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Mosaic06 is led by experienced creative and strategy partners, supported by a
                trusted network of photographers, motion artists and engineers we've worked with
                for years.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <Reveal.Stagger className="grid md:grid-cols-2 gap-12 md:gap-16">
              {team.map((m) => (
                <Reveal.Item key={m.name} className="group">
                  <div className="relative overflow-hidden rounded-sm bg-muted aspect-[4/5] mb-6">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-[0.24em] text-foreground/45 mb-3">
                    {m.role}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-[-0.01em] mb-3">
                    {m.name}
                  </h2>
                  <p className="text-foreground/70 leading-relaxed max-w-prose">{m.bio}</p>
                </Reveal.Item>
              ))}
            </Reveal.Stagger>

            <Reveal as="div" className="mt-24 max-w-xl" delay={0.1}>
              <p className="eyebrow mb-6">Join us</p>
              <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-[-0.01em] mb-4">
                We hire slowly and rarely.
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                If your craft feels close to ours, we'd still love to see your work.
              </p>
              <Link
                to="/careers"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-secondary hover:text-secondary transition-colors"
              >
                Careers <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>

        <ConversionCTA />
      </main>
      <Footer />
    </>
  );
};

export default TeamPage;
