const FALLBACK_SITE_URL = 'https://mosaic06studio.design';

export const SITE_NAME = 'Mosaic06 Studio';
export const SITE_TWITTER_HANDLE = '@mosaic06studio';
export const DEFAULT_SOCIAL_IMAGE_PATH = '/logo-favicon.png';

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
