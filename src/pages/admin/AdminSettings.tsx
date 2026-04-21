import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSiteSettings, SiteSettingsRow } from '@/hooks/useStudioContent';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  asProofItems,
  asTextList,
  DEFAULT_STUDIO_CAPABILITIES,
  getDefaultProofItems,
  ProofItem,
} from '@/lib/siteContent';

const editableSettingFields = [
  'nav_cta_label',
  'nav_cta_link',
  'hero_eyebrow',
  'hero_headline',
  'hero_subheadline',
  'hero_cta_primary_label',
  'hero_cta_primary_link',
  'hero_cta_secondary_label',
  'hero_cta_secondary_link',
  'about_eyebrow',
  'about_headline',
  'about_body',
  'studio_capabilities',
  'featured_eyebrow',
  'featured_headline',
  'featured_cta_label',
  'featured_cta_link',
  'proof_eyebrow',
  'proof_headline',
  'proof_highlight',
  'proof_items',
  'trust_eyebrow',
  'trust_headline',
  'trust_body',
  'testimonials_eyebrow',
  'testimonials_headline',
  'counter_projects',
  'counter_clients',
  'counter_years',
  'counter_brands',
  'contact_email',
  'contact_phone',
  'contact_address',
  'cta_headline',
  'cta_subheadline',
  'cta_button_label',
  'cta_button_link',
  'footer_body',
  'footer_cta_eyebrow',
  'footer_cta_body',
  'footer_cta_label',
  'footer_cta_link',
  'social_linkedin',
  'social_instagram',
] as const satisfies readonly (keyof SiteSettingsRow)[];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="luxe-card p-6 bg-card space-y-4">
    <h2 className="font-display text-xl">{title}</h2>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2"><Label>{label}</Label>{children}</div>
);

const AdminSettings = () => {
  const { data, isLoading } = useSiteSettings();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<SiteSettingsRow>>({});
  const [saving, setSaving] = useState(false);
  const supportedFields = new Set(Object.keys(data ?? {}));
  const unsupportedAdvancedFields = editableSettingFields.filter((key) => !supportedFields.has(key));
  const hasFullWebsiteSchema = unsupportedAdvancedFields.length === 0;
  const capabilitiesText = asTextList(form.studio_capabilities, DEFAULT_STUDIO_CAPABILITIES).join('\n');
  const proofItems = asProofItems(form.proof_items, getDefaultProofItems(form));

  useEffect(() => { if (data) setForm(data); }, [data]);

  const set = <K extends keyof SiteSettingsRow>(key: K, value: SiteSettingsRow[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const setList = (key: keyof SiteSettingsRow, value: string) =>
    setForm((f) => ({
      ...f,
      [key]: value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  const setProof = (index: number, key: keyof ProofItem, value: string) =>
    setForm((f) => {
      const items = asProofItems(f.proof_items, getDefaultProofItems(f)).map((item) => ({ ...item }));
      items[index] = { ...items[index], [key]: value };
      return { ...f, proof_items: items };
    });

  const save = async () => {
    if (!form.id) {
      toast({
        title: 'Nothing to save',
        description: 'The settings row was not found. Refresh the page and try again.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    const payload = editableSettingFields.reduce((acc, key) => {
      if (supportedFields.has(key)) acc[key] = form[key] ?? null;
      return acc;
    }, {} as Record<string, unknown>);

    const { data: updated, error } = await supabase
      .from('site_settings')
      .update(payload)
      .eq('id', form.id)
      .select('id')
      .maybeSingle();

    setSaving(false);

    if (error) {
      toast({ title: 'Failed to save settings', description: error.message, variant: 'destructive' });
      return;
    }

    if (!updated) {
      toast({
        title: 'Settings were not saved',
        description:
          'Supabase accepted the request but did not update a row. Your account may be missing the admin/editor role.',
        variant: 'destructive',
      });
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    toast({
      title: 'Settings saved',
      description: hasFullWebsiteSchema
        ? 'The public site will update live in open tabs.'
        : 'Core settings saved. Apply the latest Supabase migration to unlock every homepage section.',
    });
  };

  if (isLoading || !form.id) {
    return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-secondary" size={28} /></div>;
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Configuration</p>
          <h1 className="font-display text-3xl md:text-4xl">Website editor</h1>
          <p className="mt-2 text-sm text-foreground/60">Edit homepage copy, navigation, footer, contact details and conversion CTAs.</p>
        </div>
        <Button onClick={save} disabled={saving} size="lg">{saving && <Loader2 className="animate-spin" size={14} />} Save changes</Button>
      </header>

      {!hasFullWebsiteSchema && (
        <div className="luxe-card p-5 bg-secondary/10 border-secondary/30 flex gap-3 text-sm text-foreground/75">
          <AlertTriangle className="text-secondary shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-medium text-foreground">Full website editing needs the latest Supabase migration.</p>
            <p className="mt-1">
              Core settings will save now. The new homepage-wide controls below become live after applying
              <code className="mx-1 rounded bg-background px-1.5 py-0.5">20260421110000_extend_site_settings_cms.sql</code>.
            </p>
          </div>
        </div>
      )}

      <Section title="Navigation">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Header CTA label"><Input value={form.nav_cta_label ?? 'Start a project'} onChange={(e) => set('nav_cta_label', e.target.value)} /></Field>
          <Field label="Header CTA link"><Input value={form.nav_cta_link ?? '/get-started'} onChange={(e) => set('nav_cta_link', e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="Hero section">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.hero_eyebrow ?? ''} onChange={(e) => set('hero_eyebrow', e.target.value)} /></Field>
          <Field label="Headline"><Input value={form.hero_headline ?? ''} onChange={(e) => set('hero_headline', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Subheadline"><Textarea rows={3} value={form.hero_subheadline ?? ''} onChange={(e) => set('hero_subheadline', e.target.value)} /></Field></div>
          <Field label="Primary CTA label"><Input value={form.hero_cta_primary_label ?? ''} onChange={(e) => set('hero_cta_primary_label', e.target.value)} /></Field>
          <Field label="Primary CTA link"><Input value={form.hero_cta_primary_link ?? ''} onChange={(e) => set('hero_cta_primary_link', e.target.value)} /></Field>
          <Field label="Secondary CTA label"><Input value={form.hero_cta_secondary_label ?? ''} onChange={(e) => set('hero_cta_secondary_label', e.target.value)} /></Field>
          <Field label="Secondary CTA link"><Input value={form.hero_cta_secondary_link ?? ''} onChange={(e) => set('hero_cta_secondary_link', e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="About section (homepage)">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.about_eyebrow ?? ''} onChange={(e) => set('about_eyebrow', e.target.value)} /></Field>
          <Field label="Headline"><Input value={form.about_headline ?? ''} onChange={(e) => set('about_headline', e.target.value)} /></Field>
        </div>
        <Field label="Body (one or more paragraphs, separated by line breaks)">
          <Textarea rows={6} value={form.about_body ?? ''} onChange={(e) => set('about_body', e.target.value)} />
        </Field>
        <Field label="Capability list (one per line)">
          <Textarea rows={5} value={capabilitiesText} onChange={(e) => setList('studio_capabilities', e.target.value)} />
        </Field>
      </Section>

      <Section title="Selected Work section">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.featured_eyebrow ?? 'Selected Work'} onChange={(e) => set('featured_eyebrow', e.target.value)} /></Field>
          <Field label="CTA label"><Input value={form.featured_cta_label ?? 'Browse the full index'} onChange={(e) => set('featured_cta_label', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Headline"><Input value={form.featured_headline ?? 'Selected work from a serious creative partner.'} onChange={(e) => set('featured_headline', e.target.value)} /></Field></div>
          <div className="sm:col-span-2"><Field label="CTA link"><Input value={form.featured_cta_link ?? '/portfolio'} onChange={(e) => set('featured_cta_link', e.target.value)} /></Field></div>
        </div>
      </Section>

      <Section title="Proof section">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.proof_eyebrow ?? 'Proof, not promises'} onChange={(e) => set('proof_eyebrow', e.target.value)} /></Field>
          <Field label="Gold highlight"><Input value={form.proof_highlight ?? '— and on your P&L.'} onChange={(e) => set('proof_highlight', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Headline"><Input value={form.proof_headline ?? 'Work that earns its place on your brand'} onChange={(e) => set('proof_headline', e.target.value)} /></Field></div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {proofItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-border p-4 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Proof card {index + 1}</p>
              <Field label="Stat"><Input value={item.stat} onChange={(e) => setProof(index, 'stat', e.target.value)} /></Field>
              <Field label="Label"><Input value={item.label} onChange={(e) => setProof(index, 'label', e.target.value)} /></Field>
              <Field label="Body"><Textarea rows={4} value={item.body} onChange={(e) => setProof(index, 'body', e.target.value)} /></Field>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Client logo / trust section">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.trust_eyebrow ?? 'Selected Clients'} onChange={(e) => set('trust_eyebrow', e.target.value)} /></Field>
          <Field label="Headline"><Input value={form.trust_headline ?? 'Trusted by foundations, founders and ambitious teams.'} onChange={(e) => set('trust_headline', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Body"><Textarea rows={3} value={form.trust_body ?? "A growing network of institutions, founders and market leaders we've shaped brand and digital work for."} onChange={(e) => set('trust_body', e.target.value)} /></Field></div>
        </div>
      </Section>

      <Section title="Testimonials section">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow"><Input value={form.testimonials_eyebrow ?? 'In Their Words'} onChange={(e) => set('testimonials_eyebrow', e.target.value)} /></Field>
          <Field label="Headline"><Input value={form.testimonials_headline ?? 'What it feels like to work with us.'} onChange={(e) => set('testimonials_headline', e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="Counters">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Projects"><Input type="number" value={form.counter_projects ?? 0} onChange={(e) => set('counter_projects', parseInt(e.target.value) || 0)} /></Field>
          <Field label="Clients"><Input type="number" value={form.counter_clients ?? 0} onChange={(e) => set('counter_clients', parseInt(e.target.value) || 0)} /></Field>
          <Field label="Years"><Input type="number" value={form.counter_years ?? 0} onChange={(e) => set('counter_years', parseInt(e.target.value) || 0)} /></Field>
          <Field label="Brands"><Input type="number" value={form.counter_brands ?? 0} onChange={(e) => set('counter_brands', parseInt(e.target.value) || 0)} /></Field>
        </div>
      </Section>

      <Section title="Contact information">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email"><Input value={form.contact_email ?? ''} onChange={(e) => set('contact_email', e.target.value)} /></Field>
          <Field label="Phone"><Input value={form.contact_phone ?? ''} onChange={(e) => set('contact_phone', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Address"><Input value={form.contact_address ?? ''} onChange={(e) => set('contact_address', e.target.value)} /></Field></div>
        </div>
      </Section>

      <Section title="Footer">
        <Field label="Footer body">
          <Textarea rows={3} value={form.footer_body ?? 'An independent creative studio building brands with craft, strategy and a long view.'} onChange={(e) => set('footer_body', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="CTA eyebrow"><Input value={form.footer_cta_eyebrow ?? 'Start something'} onChange={(e) => set('footer_cta_eyebrow', e.target.value)} /></Field>
          <Field label="CTA label"><Input value={form.footer_cta_label ?? 'Start a Project'} onChange={(e) => set('footer_cta_label', e.target.value)} /></Field>
          <Field label="CTA link"><Input value={form.footer_cta_link ?? '/get-started'} onChange={(e) => set('footer_cta_link', e.target.value)} /></Field>
          <Field label="LinkedIn URL"><Input value={form.social_linkedin ?? 'https://linkedin.com'} onChange={(e) => set('social_linkedin', e.target.value)} /></Field>
          <Field label="Instagram URL"><Input value={form.social_instagram ?? 'https://instagram.com'} onChange={(e) => set('social_instagram', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="CTA body"><Textarea rows={3} value={form.footer_cta_body ?? 'We partner with ambitious teams on work that deserves strategic depth and excellent execution.'} onChange={(e) => set('footer_cta_body', e.target.value)} /></Field></div>
        </div>
      </Section>

      <Section title="Conversion CTA (bottom of pages)">
        <Field label="Headline"><Input value={form.cta_headline ?? ''} onChange={(e) => set('cta_headline', e.target.value)} /></Field>
        <Field label="Subheadline"><Textarea rows={3} value={form.cta_subheadline ?? ''} onChange={(e) => set('cta_subheadline', e.target.value)} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Button label"><Input value={form.cta_button_label ?? ''} onChange={(e) => set('cta_button_label', e.target.value)} /></Field>
          <Field label="Button link"><Input value={form.cta_button_link ?? ''} onChange={(e) => set('cta_button_link', e.target.value)} /></Field>
        </div>
      </Section>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving} size="lg">{saving && <Loader2 className="animate-spin" size={14} />} Save changes</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
