import React, { startTransition, useDeferredValue, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Search,
  ShieldCheck,
  Sparkles,
  Users2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSEO } from '@/hooks/useSEO';
import { useAuth } from '@/context/AuthContext';
import CreativeProfileCard from '@/components/marketplace/CreativeProfileCard';
import HireCreativeDialog from '@/components/marketplace/HireCreativeDialog';
import {
  MARKETPLACE_CREATIVES,
  MARKETPLACE_DISCIPLINES,
  MarketplaceCreative,
  getMarketplaceDisplayName,
  getMarketplaceMetadata,
} from '@/lib/marketplace';

const MarketplacePage = () => {
  useSEO({
    title: 'Mosaic06 Creative Hub · Curated marketplace for bold creative talent',
    description:
      'Browse curated creatives across brand identity, motion, product, web and campaign design. Hire through Mosaic06 Creative Hub with a faster, more structured brief process.',
    path: '/marketplace',
  });

  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [discipline, setDiscipline] =
    useState<(typeof MARKETPLACE_DISCIPLINES)[number]>('All disciplines');
  const [selectedCreative, setSelectedCreative] = useState<MarketplaceCreative | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const metadata = getMarketplaceMetadata(user);

  const creatives = [...MARKETPLACE_CREATIVES]
    .filter((creative) => {
      const matchesDiscipline =
        discipline === 'All disciplines' || creative.category === discipline;

      const haystack = [
        creative.name,
        creative.category,
        creative.headline,
        creative.bio,
        creative.location,
        ...creative.specialties,
        ...creative.portfolioHighlights,
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery = !deferredQuery || haystack.includes(deferredQuery);
      return matchesDiscipline && matchesQuery;
    })
    .sort((left, right) => {
      if (Number(right.featured) !== Number(left.featured)) {
        return Number(right.featured) - Number(left.featured);
      }
      if (Number(right.verified) !== Number(left.verified)) {
        return Number(right.verified) - Number(left.verified);
      }
      return left.rateFrom - right.rateFrom;
    });

  const featuredCreatives = creatives.filter((creative) => creative.featured).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-background pt-32">
        <section className="container-editorial pb-16">
          <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
            <div className="space-y-8">
              <span className="eyebrow">Mosaic06 Creative Hub</span>
              <div className="space-y-6">
                <h1 className="display-hero max-w-4xl text-balance">
                  Discover creative partners built for ambitious briefs.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-foreground/70 md:text-xl">
                  Inspired by the strongest curated talent marketplaces, this hub is
                  designed to help clients locate serious creative talent quickly and
                  hire with more clarity, structure and trust.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-full px-7">
                  <Link to="/marketplace/auth?tab=creative">
                    Join as a creative
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-7">
                  <Link to="/marketplace/auth?tab=signin">Client login</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <div className="luxe-card bg-card/90 p-6">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-foreground/45">
                  What the reference site does well
                </p>
                <div className="mt-5 space-y-4 text-sm leading-7 text-foreground/72">
                  <p>
                    The strongest signal on
                    {' '}
                    <a
                      href="https://www.accracreativeshub.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondary underline-offset-4 hover:underline"
                    >
                      Accra Creatives Hub
                    </a>
                    {' '}
                    is simple: curated talent, visible trust markers and a clear route
                    from discovery to hire.
                  </p>
                  <p>
                    This Mosaic06 version keeps that structure, but translates it into
                    your studio voice and brand language.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                {[
                  {
                    label: 'Curated creatives',
                    value: '6',
                    body: 'Seeded with high-calibre profiles across identity, web, motion and campaigns.',
                  },
                  {
                    label: 'Response rhythm',
                    value: '< 24h',
                    body: 'Hire requests are structured and routed fast through the studio workflow.',
                  },
                ].map((item) => (
                  <div key={item.label} className="luxe-card bg-card/90 p-6">
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-foreground/45">
                      {item.label}
                    </p>
                    <p className="mt-4 font-display text-4xl text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/68">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-editorial pb-20">
          <div className="luxe-card overflow-hidden border-border/70 bg-card/85">
            <div className="grid gap-8 border-b border-border/70 px-6 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
              <div className="space-y-4">
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-foreground/45">
                  Marketplace directory
                </p>
                <h2 className="display-section text-balance">
                  Search by discipline, scan the shortlist, send the brief.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr]">
                <label className="relative flex items-center">
                  <Search className="pointer-events-none absolute left-4 h-4 w-4 text-foreground/35" />
                  <Input
                    value={query}
                    onChange={(event) =>
                      startTransition(() => setQuery(event.target.value))
                    }
                    placeholder="Search by name, city, specialty or project type"
                    className="h-12 rounded-full border-border/70 pl-11"
                  />
                </label>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  {MARKETPLACE_DISCIPLINES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => startTransition(() => setDiscipline(item))}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        item === discipline
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-foreground/70 hover:border-foreground/25 hover:text-foreground'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 md:grid-cols-3 lg:px-8">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Curated shortlist',
                  body: 'A tight marketplace built around trusted categories and confident specialists.',
                },
                {
                  icon: BriefcaseBusiness,
                  title: 'Structured briefs',
                  body: 'Clients do not start cold. Every hire request arrives with a proper project brief.',
                },
                {
                  icon: Users2,
                  title: 'Studio-led quality',
                  body: 'The workflow still feels premium because the studio remains close to the handoff.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border/70 bg-background/65 p-5">
                  <Icon className="h-5 w-5 text-secondary" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/68">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-editorial pb-10">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.26em] text-secondary">
                Featured now
              </p>
              <h2 className="display-section max-w-3xl text-balance">
                A first-pass shortlist for clients who need strong direction fast.
              </h2>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/65 lg:flex">
              <Sparkles className="h-4 w-4 text-secondary" />
              {creatives.length}
              {' '}
              creatives visible
            </div>
          </div>
        </section>

        <section className="container-editorial pb-20">
          {creatives.length > 0 ? (
            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-8">
                {featuredCreatives.slice(0, 1).map((creative) => (
                  <CreativeProfileCard
                    key={creative.id}
                    creative={creative}
                    onHire={setSelectedCreative}
                  />
                ))}
              </div>

              <div className="grid gap-8">
                {creatives
                  .filter((creative) => !featuredCreatives.slice(0, 1).some((item) => item.id === creative.id))
                  .map((creative) => (
                    <CreativeProfileCard
                      key={creative.id}
                      creative={creative}
                      onHire={setSelectedCreative}
                      compact
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="luxe-card bg-card p-10 text-center">
              <h3 className="font-display text-3xl text-foreground">
                No creatives match that combination yet.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-foreground/65">
                Try a broader search term or switch back to all disciplines to reopen the
                full shortlist.
              </p>
            </div>
          )}
        </section>

        <section className="container-editorial pb-24">
          <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] bg-[linear-gradient(135deg,hsl(274_47%_14%),hsl(279_42%_21%),hsl(39_65%_52%))] p-8 text-primary-foreground md:p-10">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground/70">
                For creatives
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
                Create your account, shape your profile, then submit for review.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-primary-foreground/82">
                The current build gives creatives a proper sign-up path, a workspace for
                profile details, and a review submission flow that reaches the studio
                immediately.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="secondary" className="rounded-full px-6">
                  <Link to="/marketplace/auth?tab=creative">Apply as a creative</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/marketplace/account">Open my account</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Client accounts',
                  body: 'Clients can sign in, save their contact context and move from browse to brief faster on repeat projects.',
                },
                {
                  title: 'Creative applications',
                  body: 'Creative sign-up captures discipline, location, portfolio and positioning, then routes a review request to the studio.',
                },
                {
                  title: 'Live notifications',
                  body: 'Hire requests use the same live email and SMS notification pipeline already powering the public site forms.',
                },
                {
                  title: 'Brand fit',
                  body: 'The marketplace is intentionally styled inside Mosaic06 rather than feeling like a separate template or cloned product.',
                },
              ].map((item) => (
                <div key={item.title} className="luxe-card bg-card p-6">
                  <div className="inline-flex rounded-full bg-secondary/12 p-2 text-secondary">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <h3 className="mt-5 text-xl font-medium text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/68">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <HireCreativeDialog
        creative={selectedCreative}
        open={Boolean(selectedCreative)}
        onOpenChange={(open) => {
          if (!open) setSelectedCreative(null);
        }}
        defaults={{
          name: user ? getMarketplaceDisplayName(user) : '',
          email: user?.email ?? '',
          company: metadata.company,
          phone: metadata.phone,
        }}
      />
    </>
  );
};

export default MarketplacePage;
