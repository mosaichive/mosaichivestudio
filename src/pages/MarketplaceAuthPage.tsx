import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Loader2, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { submitLeadNotification } from '@/lib/leadNotifications';
import { MARKETPLACE_DISCIPLINES } from '@/lib/marketplace';
import { useSEO } from '@/hooks/useSEO';
import logo from '@/assets/logo.png';

const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

const clientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(6).max(120),
  company: z.string().trim().min(2).max(160),
  location: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
});

const creativeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(6).max(120),
  discipline: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(160),
  headline: z.string().trim().min(8).max(140),
  bio: z.string().trim().min(40).max(900),
  portfolioUrl: z.string().trim().url(),
  websiteUrl: z.string().trim().url().optional().or(z.literal('')),
  rateFrom: z.string().trim().min(1).max(40),
  skills: z.string().trim().min(3).max(240),
});

type AuthTab = 'signin' | 'client' | 'creative';

const isAuthTab = (value: string | null): value is AuthTab =>
  value === 'signin' || value === 'client' || value === 'creative';

const MarketplaceAuthPage = () => {
  useSEO({
    title: 'Mosaic06 Creative Hub · Login and signup',
    description:
      'Create a client or creative account for the Mosaic06 Creative Hub. Clients get a faster hire workflow, while creatives can submit a profile for review.',
    path: '/marketplace/auth',
  });

  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = isAuthTab(searchParams.get('tab')) ? searchParams.get('tab') : 'signin';
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const [submitting, setSubmitting] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    location: '',
    phone: '',
  });
  const [creativeForm, setCreativeForm] = useState({
    name: '',
    email: '',
    password: '',
    discipline: 'Brand Identity',
    location: '',
    headline: '',
    bio: '',
    portfolioUrl: '',
    websiteUrl: '',
    rateFrom: '',
    skills: '',
  });

  useEffect(() => {
    setSearchParams({ tab }, { replace: true });
  }, [tab, setSearchParams]);

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;
  if (!loading && user && !isAdmin) return <Navigate to="/marketplace/account" replace />;

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = signInSchema.safeParse(signInForm);
    if (!parsed.success) {
      toast({
        title: 'Check your login details',
        description: 'Enter a valid email address and password.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(parsed.data.email, parsed.data.password);
    setSubmitting(false);

    if (error) {
      toast({
        title: 'Authentication error',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    navigate('/marketplace/account');
  };

  const handleClientSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = clientSchema.safeParse(clientForm);

    if (!parsed.success) {
      toast({
        title: 'Please complete the form',
        description: 'A few client account fields still need attention.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    const { error } = await signUp(parsed.data.email, parsed.data.password, {
      displayName: parsed.data.name,
      redirectTo: '/marketplace/account',
      metadata: {
        account_type: 'client',
        display_name: parsed.data.name,
        company: parsed.data.company,
        location: parsed.data.location,
        phone: parsed.data.phone,
      },
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: 'Could not create account',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Client account created',
      description:
        'Check your inbox if email confirmation is enabled, then sign in to continue.',
    });
    setTab('signin');
    setSignInForm({ email: parsed.data.email, password: '' });
  };

  const handleCreativeSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = creativeSchema.safeParse(creativeForm);

    if (!parsed.success) {
      toast({
        title: 'Please complete the application',
        description: 'Your creative profile needs a few more details.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    const { error } = await signUp(parsed.data.email, parsed.data.password, {
      displayName: parsed.data.name,
      redirectTo: '/marketplace/account',
      metadata: {
        account_type: 'creative',
        display_name: parsed.data.name,
        location: parsed.data.location,
        creative_category: parsed.data.discipline,
        creative_headline: parsed.data.headline,
        creative_bio: parsed.data.bio,
        creative_portfolio_url: parsed.data.portfolioUrl,
        creative_website_url: parsed.data.websiteUrl,
        creative_rate_from: parsed.data.rateFrom,
        creative_skills: parsed.data.skills,
      },
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: 'Could not create account',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    submitLeadNotification({
      formName: 'Creative hub application',
      source: 'marketplace-signup',
      contact: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
      fields: {
        Discipline: parsed.data.discipline,
        Location: parsed.data.location,
        Headline: parsed.data.headline,
        Bio: parsed.data.bio,
        Portfolio: parsed.data.portfolioUrl,
        Website: parsed.data.websiteUrl || 'Not provided',
        'Starting rate': parsed.data.rateFrom,
        Skills: parsed.data.skills,
      },
      legacyServiceRequest: {
        fullName: parsed.data.name,
        email: parsed.data.email,
        phone: 'Not provided',
        service: 'Creative marketplace application',
        serviceType: parsed.data.discipline,
        budget: parsed.data.rateFrom,
        projectDetails: [
          parsed.data.headline,
          '',
          parsed.data.bio,
          '',
          `Portfolio: ${parsed.data.portfolioUrl}`,
          parsed.data.websiteUrl ? `Website: ${parsed.data.websiteUrl}` : '',
          `Skills: ${parsed.data.skills}`,
        ]
          .filter(Boolean)
          .join('\n'),
      },
    }).catch((notifyError) => {
      console.error('Creative hub signup notification failed:', notifyError);
    });

    toast({
      title: 'Creative account created',
      description:
        'Your details have been saved. Confirm your email if needed, then sign in and refine your profile.',
    });
    setTab('signin');
    setSignInForm({ email: parsed.data.email, password: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container-editorial grid min-h-screen gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,hsl(274_47%_13%),hsl(281_43%_22%),hsl(39_65%_52%))] p-8 text-primary-foreground md:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_34%)]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-8">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to marketplace
              </Link>

              <div className="space-y-5">
                <img src={logo} alt="" className="h-11 w-auto brightness-0 invert" />
                <p className="text-[0.78rem] uppercase tracking-[0.28em] text-primary-foreground/72">
                  Mosaic06 Creative Hub
                </p>
                <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]">
                  Login for clients.
                  <br />
                  Signup for creatives.
                </h1>
                <p className="max-w-xl text-base leading-8 text-primary-foreground/82 md:text-lg">
                  This section opens the marketplace properly: clients get a cleaner path
                  to browse and brief, while creatives get a structured onboarding flow
                  to submit their profile and portfolio for review.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Users2,
                  title: 'Client-ready',
                  body: 'Save contact details once, then move faster every time you brief a creative.',
                },
                {
                  icon: Sparkles,
                  title: 'Creative intake',
                  body: 'Signup captures positioning, portfolio and specialisation from the start.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Studio-led',
                  body: 'Admin access still lives separately at the studio auth route for internal control.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-3xl border border-white/15 bg-white/8 p-5 backdrop-blur">
                  <Icon className="h-5 w-5 text-secondary" />
                  <h2 className="mt-4 text-lg font-medium text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-7 text-primary-foreground/76">{body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/12 bg-black/12 p-6 backdrop-blur">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground/65">
                Studio admin?
              </p>
              <p className="mt-3 text-sm leading-7 text-primary-foreground/78">
                Internal content management remains on the dedicated admin route so the
                marketplace auth and the studio CMS stay cleanly separated.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-5 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/auth">
                  Open admin access
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[2rem] border border-border/70 bg-card p-6 shadow-[0_30px_80px_-35px_rgba(39,18,55,0.25)] md:p-8 lg:p-10">
            <Tabs value={tab} onValueChange={(value) => setTab(value as AuthTab)}>
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-full bg-muted/65 p-1">
                <TabsTrigger value="signin" className="rounded-full py-3">
                  Login
                </TabsTrigger>
                <TabsTrigger value="client" className="rounded-full py-3">
                  Client signup
                </TabsTrigger>
                <TabsTrigger value="creative" className="rounded-full py-3">
                  Creative signup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-8">
                <div className="mb-6 space-y-2">
                  <h2 className="font-display text-3xl text-foreground">Welcome back</h2>
                  <p className="text-sm leading-7 text-foreground/65">
                    Sign in to continue into your marketplace account or client workspace.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSignIn}>
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInForm.email}
                      onChange={(event) =>
                        setSignInForm((current) => ({ ...current, email: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInForm.password}
                      onChange={(event) =>
                        setSignInForm((current) => ({ ...current, password: event.target.value }))
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Sign in
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="client" className="mt-8">
                <div className="mb-6 space-y-2">
                  <h2 className="font-display text-3xl text-foreground">Create a client account</h2>
                  <p className="text-sm leading-7 text-foreground/65">
                    Save your details once so the hire flow becomes faster, cleaner and more
                    repeatable.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleClientSignup}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="client-name">Full name</Label>
                      <Input
                        id="client-name"
                        value={clientForm.name}
                        onChange={(event) =>
                          setClientForm((current) => ({ ...current, name: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-email">Email</Label>
                      <Input
                        id="client-email"
                        type="email"
                        value={clientForm.email}
                        onChange={(event) =>
                          setClientForm((current) => ({ ...current, email: event.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="client-company">Company / organisation</Label>
                      <Input
                        id="client-company"
                        value={clientForm.company}
                        onChange={(event) =>
                          setClientForm((current) => ({ ...current, company: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-location">Location</Label>
                      <Input
                        id="client-location"
                        value={clientForm.location}
                        onChange={(event) =>
                          setClientForm((current) => ({ ...current, location: event.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="client-phone">Phone</Label>
                      <Input
                        id="client-phone"
                        value={clientForm.phone}
                        onChange={(event) =>
                          setClientForm((current) => ({ ...current, phone: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-password">Password</Label>
                      <Input
                        id="client-password"
                        type="password"
                        value={clientForm.password}
                        onChange={(event) =>
                          setClientForm((current) => ({ ...current, password: event.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Create client account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="creative" className="mt-8">
                <div className="mb-6 space-y-2">
                  <h2 className="font-display text-3xl text-foreground">
                    Apply as a creative
                  </h2>
                  <p className="text-sm leading-7 text-foreground/65">
                    Start your account with enough signal for a real editorial review:
                    discipline, point of view, portfolio and pricing direction.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleCreativeSignup}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="creative-name">Full name</Label>
                      <Input
                        id="creative-name"
                        value={creativeForm.name}
                        onChange={(event) =>
                          setCreativeForm((current) => ({ ...current, name: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creative-email">Email</Label>
                      <Input
                        id="creative-email"
                        type="email"
                        value={creativeForm.email}
                        onChange={(event) =>
                          setCreativeForm((current) => ({ ...current, email: event.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="creative-discipline">Primary discipline</Label>
                      <select
                        id="creative-discipline"
                        value={creativeForm.discipline}
                        onChange={(event) =>
                          setCreativeForm((current) => ({
                            ...current,
                            discipline: event.target.value,
                          }))
                        }
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      >
                        {MARKETPLACE_DISCIPLINES.filter((item) => item !== 'All disciplines').map(
                          (item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creative-location">Location</Label>
                      <Input
                        id="creative-location"
                        value={creativeForm.location}
                        onChange={(event) =>
                          setCreativeForm((current) => ({
                            ...current,
                            location: event.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creative-headline">Positioning headline</Label>
                    <Input
                      id="creative-headline"
                      value={creativeForm.headline}
                      onChange={(event) =>
                        setCreativeForm((current) => ({
                          ...current,
                          headline: event.target.value,
                        }))
                      }
                      placeholder="e.g. Brand systems for institutions entering a bigger stage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creative-bio">Short profile summary</Label>
                    <Textarea
                      id="creative-bio"
                      rows={5}
                      value={creativeForm.bio}
                      onChange={(event) =>
                        setCreativeForm((current) => ({ ...current, bio: event.target.value }))
                      }
                      placeholder="Summarise the kind of work you do, the clients you serve best, and how you think."
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="creative-portfolio">Portfolio URL</Label>
                      <Input
                        id="creative-portfolio"
                        type="url"
                        value={creativeForm.portfolioUrl}
                        onChange={(event) =>
                          setCreativeForm((current) => ({
                            ...current,
                            portfolioUrl: event.target.value,
                          }))
                        }
                        placeholder="https://"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creative-website">Website URL</Label>
                      <Input
                        id="creative-website"
                        type="url"
                        value={creativeForm.websiteUrl}
                        onChange={(event) =>
                          setCreativeForm((current) => ({
                            ...current,
                            websiteUrl: event.target.value,
                          }))
                        }
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="creative-rate">Starting rate</Label>
                      <Input
                        id="creative-rate"
                        value={creativeForm.rateFrom}
                        onChange={(event) =>
                          setCreativeForm((current) => ({
                            ...current,
                            rateFrom: event.target.value,
                          }))
                        }
                        placeholder="e.g. GHS 3,500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creative-skills">Key skills</Label>
                      <Input
                        id="creative-skills"
                        value={creativeForm.skills}
                        onChange={(event) =>
                          setCreativeForm((current) => ({
                            ...current,
                            skills: event.target.value,
                          }))
                        }
                        placeholder="Comma-separated"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creative-password">Password</Label>
                    <Input
                      id="creative-password"
                      type="password"
                      value={creativeForm.password}
                      onChange={(event) =>
                        setCreativeForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Create creative account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarketplaceAuthPage;
