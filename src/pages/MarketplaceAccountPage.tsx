import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, LogOut, Save, SendHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreativeProfileCard from '@/components/marketplace/CreativeProfileCard';
import HireCreativeDialog from '@/components/marketplace/HireCreativeDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSEO } from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  MarketplaceCreative,
  getCreativePreviewFromMetadata,
  getMarketplaceDisplayName,
  getMarketplaceMetadata,
} from '@/lib/marketplace';
import { submitLeadNotification } from '@/lib/leadNotifications';

const MarketplaceAccountPage = () => {
  useSEO({
    title: 'Mosaic06 Creative Hub · Account workspace',
    description:
      'Manage your Mosaic06 Creative Hub account, refine your creative profile, and move from browse to brief with less friction.',
    path: '/marketplace/account',
  });

  const { user, loading, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState<MarketplaceCreative | null>(null);
  const [form, setForm] = useState({
    accountType: 'client',
    name: '',
    company: '',
    phone: '',
    location: '',
    discipline: '',
    headline: '',
    bio: '',
    portfolioUrl: '',
    websiteUrl: '',
    rateFrom: '',
    skills: '',
  });

  const metadata = getMarketplaceMetadata(user);
  const previewCreative = getCreativePreviewFromMetadata({
    ...metadata,
    account_type:
      form.accountType === 'creative' ? 'creative' : 'client',
    display_name: form.name,
    company: form.company,
    phone: form.phone,
    location: form.location,
    creative_category: form.discipline,
    creative_headline: form.headline,
    creative_bio: form.bio,
    creative_portfolio_url: form.portfolioUrl,
    creative_website_url: form.websiteUrl,
    creative_rate_from: form.rateFrom,
    creative_skills: form.skills,
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      accountType: metadata.account_type === 'creative' ? 'creative' : 'client',
      name: metadata.display_name || getMarketplaceDisplayName(user),
      company: metadata.company,
      phone: metadata.phone,
      location: metadata.location,
      discipline: metadata.creative_category,
      headline: metadata.creative_headline,
      bio: metadata.creative_bio,
      portfolioUrl: metadata.creative_portfolio_url,
      websiteUrl: metadata.creative_website_url,
      rateFrom: metadata.creative_rate_from,
      skills: metadata.creative_skills,
    });
  }, [
    user,
    metadata.account_type,
    metadata.company,
    metadata.creative_bio,
    metadata.creative_category,
    metadata.creative_headline,
    metadata.creative_portfolio_url,
    metadata.creative_rate_from,
    metadata.creative_skills,
    metadata.creative_website_url,
    metadata.display_name,
    metadata.location,
    metadata.phone,
  ]);

  if (!loading && !user) return <Navigate to="/marketplace/auth" replace />;
  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;

  const persistMetadata = async (extraMeta?: Record<string, string>) => {
    if (!user) return;

    const nextMeta = {
      ...user.user_metadata,
      account_type: form.accountType,
      display_name: form.name,
      company: form.company,
      phone: form.phone,
      location: form.location,
      creative_category: form.discipline,
      creative_headline: form.headline,
      creative_bio: form.bio,
      creative_portfolio_url: form.portfolioUrl,
      creative_website_url: form.websiteUrl,
      creative_rate_from: form.rateFrom,
      creative_skills: form.skills,
      ...extraMeta,
    };

    const { error: userError } = await supabase.auth.updateUser({ data: nextMeta });
    if (userError) throw userError;

    await supabase
      .from('profiles')
      .update({
        display_name: form.name,
      })
      .eq('user_id', user.id);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!form.name.trim()) {
      toast({
        title: 'Add your name first',
        description: 'A saved account needs a clear display name.',
        variant: 'destructive',
      });
      return;
    }

    if (form.accountType === 'creative' && !form.discipline.trim()) {
      toast({
        title: 'Add your discipline',
        description: 'Creative profiles need a primary discipline before saving.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      await persistMetadata();
      toast({
        title: 'Account saved',
        description: 'Your marketplace profile details have been updated.',
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to save your marketplace data.';
      toast({
        title: 'Save failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (!user) return;
    if (form.accountType !== 'creative') return;
    if (!form.name.trim() || !form.discipline.trim() || !form.portfolioUrl.trim() || !form.bio.trim()) {
      toast({
        title: 'Profile not ready yet',
        description:
          'Add your name, discipline, portfolio URL and summary before sending for review.',
        variant: 'destructive',
      });
      return;
    }

    setReviewSubmitting(true);
    try {
      await persistMetadata({
        creative_application_submitted_at: new Date().toISOString(),
      });

      await submitLeadNotification({
        formName: 'Creative profile review request',
        source: 'marketplace-account',
        contact: {
          name: form.name,
          email: user.email ?? '',
          phone: form.phone,
          company: form.company,
        },
        fields: {
          Discipline: form.discipline,
          Location: form.location,
          Headline: form.headline,
          Portfolio: form.portfolioUrl,
          Website: form.websiteUrl || 'Not provided',
          'Starting rate': form.rateFrom || 'Not provided',
          Skills: form.skills || 'Not provided',
          Bio: form.bio,
        },
        legacyServiceRequest: {
          fullName: form.name,
          email: user.email ?? '',
          phone: form.phone || 'Not provided',
          company: form.company || undefined,
          service: 'Creative profile review',
          serviceType: form.discipline,
          budget: form.rateFrom || undefined,
          projectDetails: [
            form.headline,
            '',
            form.bio,
            '',
            `Portfolio: ${form.portfolioUrl}`,
            form.websiteUrl ? `Website: ${form.websiteUrl}` : '',
            form.skills ? `Skills: ${form.skills}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
        },
      });

      toast({
        title: 'Sent for review',
        description:
          'Your creative profile request has been sent to the studio for review.',
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to submit your profile right now.';
      toast({
        title: 'Review request failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setReviewSubmitting(false);
    }
  };

  const reviewDate = metadata.creative_application_submitted_at
    ? new Date(metadata.creative_application_submitted_at).toLocaleDateString('en-GH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <Navbar />
      <main className="bg-background pt-32">
        <section className="container-editorial pb-16">
          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-end">
            <div className="space-y-5">
              <span className="eyebrow">Account workspace</span>
              <h1 className="display-section max-w-3xl text-balance">
                Save your details, shape your profile, keep the hire flow ready.
              </h1>
              <p className="max-w-xl text-base leading-8 text-foreground/68">
                This is the signed-in layer for the new marketplace: clients can save
                their working details, while creatives can build a profile and submit
                it for review.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 xl:justify-end">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/marketplace">
                  Open marketplace
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </section>

        <section className="container-editorial pb-24">
          <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-6">
              <div className="luxe-card bg-card p-6 md:p-8">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-foreground/45">
                  Account type
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      value: 'client',
                      title: 'Client account',
                      body: 'Best for people briefing and hiring creatives.',
                    },
                    {
                      value: 'creative',
                      title: 'Creative account',
                      body: 'Best for designers, strategists and creative specialists applying to join.',
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({ ...current, accountType: option.value }))
                      }
                      className={`rounded-3xl border p-5 text-left transition-colors ${
                        form.accountType === option.value
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background hover:border-foreground/20'
                      }`}
                    >
                      <h2 className="text-lg font-medium">{option.title}</h2>
                      <p
                        className={`mt-3 text-sm leading-7 ${
                          form.accountType === option.value
                            ? 'text-primary-foreground/80'
                            : 'text-foreground/65'
                        }`}
                      >
                        {option.body}
                      </p>
                    </button>
                  ))}
                </div>

                {form.accountType === 'creative' && metadata.creative_application_submitted_at ? (
                  <div className="mt-6 rounded-3xl border border-secondary/30 bg-secondary/10 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium text-foreground">Profile review submitted</p>
                        <p className="mt-2 text-sm leading-7 text-foreground/68">
                          Your last review request was sent on
                          {' '}
                          {reviewDate}
                          . You can keep refining the profile below and resubmit when
                          you have stronger material.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {previewCreative ? (
                <CreativeProfileCard creative={previewCreative} onHire={setSelectedCreative} />
              ) : (
                <div className="luxe-card bg-card p-8">
                  <h2 className="font-display text-3xl text-foreground">
                    Your client workspace is ready.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-foreground/68">
                    Save your company and contact details here, then move into the public
                    marketplace whenever you want to brief a creative.
                  </p>
                  <Button asChild className="mt-6 rounded-full">
                    <Link to="/marketplace">
                      Browse creatives
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="luxe-card bg-card p-6 md:p-8">
              <div className="mb-6 space-y-2">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-foreground/45">
                  Details
                </p>
                <h2 className="font-display text-3xl text-foreground">
                  {form.accountType === 'creative'
                    ? 'Build your creative profile'
                    : 'Save your client details'}
                </h2>
                <p className="text-sm leading-7 text-foreground/65">
                  {form.accountType === 'creative'
                    ? 'This saves your profile foundation to your secure account metadata. The public marketplace remains curated by the studio.'
                    : 'These details prefill future hire requests so repeat briefs move faster.'}
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Full name</Label>
                    <Input
                      id="account-name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-location">Location</Label>
                    <Input
                      id="account-location"
                      value={form.location}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, location: event.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="account-company">Company / organisation</Label>
                    <Input
                      id="account-company"
                      value={form.company}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, company: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-phone">Phone</Label>
                    <Input
                      id="account-phone"
                      value={form.phone}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, phone: event.target.value }))
                      }
                    />
                  </div>
                </div>

                {form.accountType === 'creative' ? (
                  <>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="account-discipline">Primary discipline</Label>
                        <Input
                          id="account-discipline"
                          value={form.discipline}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              discipline: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-rate">Starting rate</Label>
                        <Input
                          id="account-rate"
                          value={form.rateFrom}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              rateFrom: event.target.value,
                            }))
                          }
                          placeholder="e.g. GHS 3,500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account-headline">Positioning headline</Label>
                      <Input
                        id="account-headline"
                        value={form.headline}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            headline: event.target.value,
                          }))
                        }
                        placeholder="Summarise the kind of work clients should know you for."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account-bio">Profile summary</Label>
                      <Textarea
                        id="account-bio"
                        rows={6}
                        value={form.bio}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, bio: event.target.value }))
                        }
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="account-portfolio">Portfolio URL</Label>
                        <Input
                          id="account-portfolio"
                          value={form.portfolioUrl}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              portfolioUrl: event.target.value,
                            }))
                          }
                          placeholder="https://"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-website">Website URL</Label>
                        <Input
                          id="account-website"
                          value={form.websiteUrl}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              websiteUrl: event.target.value,
                            }))
                          }
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account-skills">Key skills</Label>
                      <Input
                        id="account-skills"
                        value={form.skills}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, skills: event.target.value }))
                        }
                        placeholder="Comma-separated, e.g. brand systems, packaging, launch kits"
                      />
                    </div>
                  </>
                ) : null}

                <div className="flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    className="rounded-full"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save account'}
                  </Button>

                  {form.accountType === 'creative' ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      onClick={handleSubmitForReview}
                      disabled={reviewSubmitting}
                    >
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      {reviewSubmitting ? 'Submitting...' : 'Submit for review'}
                    </Button>
                  ) : null}

                  <Button asChild variant="ghost" className="rounded-full">
                    <Link to="/marketplace">
                      Back to marketplace
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
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
          name: form.name,
          email: user?.email ?? '',
          company: form.company,
          phone: form.phone,
        }}
      />
    </>
  );
};

export default MarketplaceAccountPage;
