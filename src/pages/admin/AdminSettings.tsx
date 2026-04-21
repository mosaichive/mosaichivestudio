import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSiteSettings, SiteSettingsRow } from '@/hooks/useStudioContent';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const editableSettingFields = [
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

  useEffect(() => { if (data) setForm(data); }, [data]);

  const set = <K extends keyof SiteSettingsRow>(key: K, value: SiteSettingsRow[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

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
      acc[key] = form[key] ?? null;
      return acc;
    }, {} as Partial<SiteSettingsRow>);

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
    toast({ title: 'Settings saved', description: 'The public site will update live in open tabs.' });
  };

  if (isLoading || !form.id) {
    return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-secondary" size={28} /></div>;
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Configuration</p>
          <h1 className="font-display text-3xl md:text-4xl">Site settings</h1>
          <p className="mt-2 text-sm text-foreground/60">Edit the copy and numbers used across the public site.</p>
        </div>
        <Button onClick={save} disabled={saving} size="lg">{saving && <Loader2 className="animate-spin" size={14} />} Save changes</Button>
      </header>

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
