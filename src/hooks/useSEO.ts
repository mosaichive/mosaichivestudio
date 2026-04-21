import { useEffect } from 'react';
import { getAbsoluteUrl, getDefaultSocialImageUrl } from '@/lib/site';

type SEO = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/portfolio" */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * Per-page SEO: sets <title>, meta description, canonical, and OG/Twitter
 * title + description. Routes that don't call this fall back to index.html
 * defaults.
 */
export function useSEO({ title, description, path, ogTitle, ogDescription }: SEO) {
  useEffect(() => {
    document.title = title;

    const ensure = (selector: string, factory: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = factory();
        document.head.appendChild(el);
      }
      return el;
    };

    const setMeta = (name: string, content: string) => {
      const el = ensure(`meta[name="${name}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('name', name);
        return m;
      });
      el.setAttribute('content', content);
    };
    const setOg = (property: string, content: string) => {
      const el = ensure(`meta[property="${property}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('property', property);
        return m;
      });
      el.setAttribute('content', content);
    };

    const url = getAbsoluteUrl(path);
    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    canonical.setAttribute('href', url);

    setMeta('description', description);
    setOg('og:title', ogTitle ?? title);
    setOg('og:description', ogDescription ?? description);
    setOg('og:type', 'website');
    setOg('og:url', url);
    setOg('og:image', getDefaultSocialImageUrl());
    setMeta('twitter:title', ogTitle ?? title);
    setMeta('twitter:description', ogDescription ?? description);
    setMeta('twitter:image', getDefaultSocialImageUrl());
    setMeta('twitter:card', 'summary_large_image');
  }, [title, description, path, ogTitle, ogDescription]);
}
