import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { uploadStudioAsset } from '@/lib/uploadStudioAsset';

interface FormState {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  cover_url: string | null;
  excerpt: string;
  challenge: string;
  solution: string;
  categoriesText: string;
  servicesText: string;
  toolsText: string;
  results: { label: string; value: string }[];
  gallery: string[];
  featured: boolean;
  published: boolean;
}

const empty: FormState = {
  slug: '',
  title: '',
  client: '',
  industry: '',
  year: new Date().getFullYear().toString(),
  cover_url: null,
  excerpt: '',
  challenge: '',
  solution: '',
  categoriesText: '',
  servicesText: '',
  toolsText: '',
  results: [],
  gallery: [],
  featured: false,
  published: true,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const AdminProjectEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id!).maybeSingle();
      if (error || !data) {
        toast({ title: 'Project not found', variant: 'destructive' });
        navigate('/admin/projects');
        return;
      }
      setForm({
        slug: data.slug,
        title: data.title,
        client: data.client,
        industry: data.industry ?? '',
        year: data.year ?? '',
        cover_url: data.cover_url,
        excerpt: data.excerpt ?? '',
        challenge: data.challenge ?? '',
        solution: data.solution ?? '',
        categoriesText: (data.categories ?? []).join(', '),
        servicesText: (data.services ?? []).join('\n'),
        toolsText: (data.tools ?? []).join(', '),
        results: (data.results as { label: string; value: string }[]) ?? [],
        gallery: data.gallery ?? [],
        featured: data.featured,
        published: data.published,
      });
      setLoading(false);
    })();
  }, [id, isNew, navigate, toast]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    if (!form.title || !form.client) {
      toast({ title: 'Title and client are required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const payload = {
      slug,
      title: form.title,
      client: form.client,
      industry: form.industry || null,
      year: form.year || null,
      cover_url: form.cover_url,
      excerpt: form.excerpt || null,
      challenge: form.challenge || null,
      solution: form.solution || null,
      categories: form.categoriesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      services: form.servicesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      tools: form.toolsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      results: form.results,
      gallery: form.gallery,
      featured: form.featured,
      published: form.published,
    };

    const { error } = isNew
      ? await supabase.from('projects').insert(payload as never)
      : await supabase.from('projects').update(payload as never).eq('id', id!);

    setSaving(false);
    if (error) {
      toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: isNew ? 'Project created' : 'Project saved' });
    navigate('/admin/projects');
  };

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setGalleryUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map((f) => uploadStudioAsset(f, 'gallery')));
      set('gallery', [...form.gallery, ...urls]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      toast({ title: 'Upload error', description: message, variant: 'destructive' });
    } finally {
      setGalleryUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-secondary" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
      >
        <ArrowLeft size={14} /> All projects
      </Link>

      <header>
        <p className="eyebrow mb-2">{isNew ? 'New project' : 'Edit project'}</p>
        <h1 className="font-display text-3xl md:text-4xl">{form.title || 'Untitled project'}</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: main fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="luxe-card p-6 bg-card space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Client *</Label>
                <Input value={form.client} onChange={(e) => set('client', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input value={form.industry} onChange={(e) => set('industry', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input value={form.year} onChange={(e) => set('year', e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => set('slug', slugify(e.target.value))}
                  placeholder={slugify(form.title) || 'auto-generated'}
                />
                <p className="text-xs text-foreground/50">/portfolio/{form.slug || slugify(form.title) || 'slug'}</p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Excerpt (one-line summary)</Label>
                <Textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Categories (comma separated)</Label>
                <Input
                  value={form.categoriesText}
                  onChange={(e) => set('categoriesText', e.target.value)}
                  placeholder="Branding, Web Design"
                />
              </div>
            </div>
          </div>

          <div className="luxe-card p-6 bg-card space-y-5">
            <h2 className="font-display text-xl">Story</h2>
            <div className="space-y-2">
              <Label>The challenge</Label>
              <Textarea
                value={form.challenge}
                onChange={(e) => set('challenge', e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>The solution</Label>
              <Textarea
                value={form.solution}
                onChange={(e) => set('solution', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="luxe-card p-6 bg-card space-y-5">
            <h2 className="font-display text-xl">Services & Tools</h2>
            <div className="space-y-2">
              <Label>Services provided (one per line)</Label>
              <Textarea
                value={form.servicesText}
                onChange={(e) => set('servicesText', e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label>Tools used (comma separated)</Label>
              <Input value={form.toolsText} onChange={(e) => set('toolsText', e.target.value)} />
            </div>
          </div>

          <div className="luxe-card p-6 bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Results</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  set('results', [...form.results, { label: '', value: '' }])
                }
              >
                <Plus size={14} /> Add result
              </Button>
            </div>
            {form.results.length === 0 && (
              <p className="text-sm text-foreground/50">No results added yet.</p>
            )}
            {form.results.map((r, i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={r.label}
                    onChange={(e) => {
                      const copy = [...form.results];
                      copy[i] = { ...copy[i], label: e.target.value };
                      set('results', copy);
                    }}
                    placeholder="e.g. Online revenue"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs">Value</Label>
                  <Input
                    value={r.value}
                    onChange={(e) => {
                      const copy = [...form.results];
                      copy[i] = { ...copy[i], value: e.target.value };
                      set('results', copy);
                    }}
                    placeholder="e.g. +218%"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => set('results', form.results.filter((_, idx) => idx !== i))}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>

          <div className="luxe-card p-6 bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Gallery</h2>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleGalleryUpload(e.target.files)}
                />
                <Button variant="outline" size="sm" asChild disabled={galleryUploading}>
                  <span>
                    {galleryUploading ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                    Upload images
                  </span>
                </Button>
              </label>
            </div>
            {form.gallery.length === 0 ? (
              <p className="text-sm text-foreground/50">No gallery images yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.gallery.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => set('gallery', form.gallery.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 text-foreground hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: cover + flags + save */}
        <div className="space-y-6">
          <div className="luxe-card p-6 bg-card">
            <ImageUploader
              value={form.cover_url}
              onChange={(url) => set('cover_url', url)}
              folder="covers"
              label="Cover image"
            />
          </div>

          <div className="luxe-card p-6 bg-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Featured</Label>
                <p className="text-xs text-foreground/60">Show on homepage</p>
              </div>
              <Switch checked={form.featured} onCheckedChange={(v) => set('featured', v)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Published</Label>
                <p className="text-xs text-foreground/60">Visible on site</p>
              </div>
              <Switch checked={form.published} onCheckedChange={(v) => set('published', v)} />
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="animate-spin" size={16} />}
            {isNew ? 'Create project' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectEditor;
