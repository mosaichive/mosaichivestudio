const FALLBACK_SITE_URL = 'https://www.mosaic06studio.design';

export const SITE_NAME = 'Mosaic06 Studio';
export const SITE_TWITTER_HANDLE = '@mosaic06studio';
export const DEFAULT_SOCIAL_IMAGE_PATH = '/logo-favicon.png';
export const DEFAULT_SITE_KEYWORDS = [
  'Mosaic Hive',
  'Mosaic06 Studio',
  'branding agency Accra',
  'web design Ghana',
  'creative agency Accra',
  'brand identity design Ghana',
  'website design Accra',
  'campaign creative Ghana',
];

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getSiteUrl = () => {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();
  if (configuredUrl) return trimTrailingSlash(configuredUrl);

  if (typeof window !== 'undefined' && window.location.origin) {
    return trimTrailingSlash(window.location.origin);
  }

  return FALLBACK_SITE_URL;
};

export const getAbsoluteUrl = (path = '/') => new URL(path, `${getSiteUrl()}/`).toString();

export const getDefaultSocialImageUrl = () => getAbsoluteUrl(DEFAULT_SOCIAL_IMAGE_PATH);
