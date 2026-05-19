import { useEffect } from 'react';
import {
  DEFAULT_SITE_KEYWORDS,
  SITE_NAME,
  SITE_TWITTER_HANDLE,
  getAbsoluteUrl,
  getDefaultSocialImageUrl,
} from '@/lib/site';

type SEO = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/portfolio" */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[] | string;
};

/**
 * Per-page SEO: sets <title>, meta description, canonical, and OG/Twitter
 * title + description. Routes that don't call this fall back to index.html
 * defaults.
 */
export function useSEO({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image,
  type = 'website',
  noindex = false,
  keywords,
}: SEO) {
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
    const resolvedImage = image || getDefaultSocialImageUrl();
    const keywordList = Array.from(
      new Set([
        ...DEFAULT_SITE_KEYWORDS,
        ...(Array.isArray(keywords)
          ? keywords
          : typeof keywords === 'string'
            ? keywords.split(',')
            : []),
      ].map((value) => value.trim()).filter(Boolean))
    );
    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    canonical.setAttribute('href', url);

    setMeta('description', description);
    setMeta('keywords', keywordList.join(', '));
    setMeta(
      'robots',
      noindex
        ? 'noindex,nofollow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    );
    setOg('og:title', ogTitle ?? title);
    setOg('og:description', ogDescription ?? description);
    setOg('og:type', type);
    setOg('og:site_name', SITE_NAME);
    setOg('og:url', url);
    setOg('og:image', resolvedImage);
    setOg('og:image:alt', ogTitle ?? title);
    setMeta('twitter:title', ogTitle ?? title);
    setMeta('twitter:description', ogDescription ?? description);
    setMeta('twitter:image', resolvedImage);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', SITE_TWITTER_HANDLE);
    setMeta('twitter:creator', SITE_TWITTER_HANDLE);
  }, [title, description, path, ogTitle, ogDescription, image, keywords, noindex, type]);
}
