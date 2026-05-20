import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string | null;
  year: string | null;
  cover_url: string | null;
  categories: string[];
  excerpt: string | null;
  challenge: string | null;
  solution: string | null;
  services: string[];
  tools: string[];
  results: { label: string; value: string }[];
  gallery: string[];
  featured: boolean;
  published: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  rating: number;
  published: boolean;
  position: number;
}

export interface ClientLogoRow {
  id: string;
  name: string;
  logo_url: string | null;
  link_url: string | null;
  featured: boolean;
  published: boolean;
  position: number;
}

export interface SiteSettingsRow {
  id: string;
  nav_cta_label?: string | null;
  nav_cta_link?: string | null;
  hero_eyebrow: string | null;
  hero_headline: string | null;
  hero_subheadline: string | null;
  hero_cta_primary_label: string | null;
  hero_cta_primary_link: string | null;
  hero_cta_secondary_label: string | null;
  hero_cta_secondary_link: string | null;
  about_eyebrow: string | null;
  about_headline: string | null;
  about_body: string | null;
  studio_capabilities?: unknown;
  featured_eyebrow?: string | null;
  featured_headline?: string | null;
  featured_cta_label?: string | null;
  featured_cta_link?: string | null;
  proof_eyebrow?: string | null;
  proof_headline?: string | null;
  proof_highlight?: string | null;
  proof_items?: unknown;
  trust_eyebrow?: string | null;
  trust_headline?: string | null;
  trust_body?: string | null;
  testimonials_eyebrow?: string | null;
  testimonials_headline?: string | null;
  counter_projects: number | null;
  counter_clients: number | null;
  counter_years: number | null;
  counter_brands: number | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  cta_headline: string | null;
  cta_subheadline: string | null;
  cta_button_label: string | null;
  cta_button_link: string | null;
  footer_body?: string | null;
  footer_cta_eyebrow?: string | null;
  footer_cta_body?: string | null;
  footer_cta_label?: string | null;
  footer_cta_link?: string | null;
  social_linkedin?: string | null;
  social_instagram?: string | null;
  updated_at: string;
}

/* -------- Projects -------- */
export const useProjects = (opts?: { onlyPublished?: boolean; onlyFeatured?: boolean }) => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['projects', opts],
    queryFn: async () => {
      let q = supabase.from('projects').select('*').order('position', { ascending: true });
      if (opts?.onlyPublished) q = q.eq('published', true);
      if (opts?.onlyFeatured) q = q.eq('featured', true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as ProjectRow[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('projects-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        qc.invalidateQueries({ queryKey: ['projects'] });
        qc.invalidateQueries({ queryKey: ['project'] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
};

export const useProject = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['project', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug as string)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as ProjectRow | null;
    },
  });
};

/* -------- Testimonials -------- */
export const useTestimonials = (opts?: { onlyPublished?: boolean }) => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['testimonials', opts],
    queryFn: async () => {
      let q = supabase.from('testimonials').select('*').order('position', { ascending: true });
      if (opts?.onlyPublished) q = q.eq('published', true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as TestimonialRow[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('testimonials-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
        qc.invalidateQueries({ queryKey: ['testimonials'] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
};

/* -------- Client logos -------- */
export const useClientLogos = (opts?: { onlyPublished?: boolean }) => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['client_logos', opts],
    queryFn: async () => {
      let q = supabase.from('client_logos').select('*').order('position', { ascending: true });
      if (opts?.onlyPublished) q = q.eq('published', true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as ClientLogoRow[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('logos-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_logos' }, () => {
        qc.invalidateQueries({ queryKey: ['client_logos'] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
};

/* -------- Site settings -------- */
export const useSiteSettings = () => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as SiteSettingsRow | null;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('site-settings-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {
        qc.invalidateQueries({ queryKey: ['site_settings'] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
};
