import type { SiteSettingsRow } from '@/hooks/useStudioContent';
import { SITE_NAME, getAbsoluteUrl, getDefaultSiteIconUrl, getDefaultSocialImageUrl } from '@/lib/site';

export const STUDIO_EMAIL = 'mosaichive@gmail.com';
export const STUDIO_PHONE = '+233 54 490 9011';
export const STUDIO_ADDRESS = 'Accra, Greater Accra Region, Ghana';
export const STUDIO_HOURS_LABEL = 'Mon–Fri · 9am – 6pm GMT';
export const STUDIO_SERVICE_AREAS = ['Accra', 'Greater Accra Region', 'Ghana', 'Worldwide'];

const EMAIL_PLACEHOLDERS = new Set(['hello@mosaic06studio.com', 'info@mosaic06studio.com']);
const PHONE_PLACEHOLDERS = new Set(['+233 20 298 5474', '+233202985474']);
const ADDRESS_PLACEHOLDERS = new Set(['Accra, Ghana', '123 Marketing Street, East Legon, Accra, Ghana']);
const GENERIC_SOCIAL_HOSTS = new Set(['linkedin.com', 'instagram.com']);

type StudioSettingsLike = Partial<SiteSettingsRow> | null | undefined;

const normalizeEmail = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed || EMAIL_PLACEHOLDERS.has(trimmed.toLowerCase())) return STUDIO_EMAIL;
  return trimmed;
};

const normalizePhone = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed) return STUDIO_PHONE;
  const digits = trimmed.replace(/[^\d+]/g, '');
  if (!digits || PHONE_PLACEHOLDERS.has(trimmed) || PHONE_PLACEHOLDERS.has(digits)) return STUDIO_PHONE;
  return trimmed;
};

const normalizeAddress = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed || ADDRESS_PLACEHOLDERS.has(trimmed)) return STUDIO_ADDRESS;
  return trimmed;
};

const normalizeSocialUrl = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '');
    const path = url.pathname.replace(/\/+$/, '');
    if (GENERIC_SOCIAL_HOSTS.has(host) && (!path || path === '')) return null;
    return url.toString();
  } catch {
    return null;
  }
};

export const getStudioProfile = (settings?: StudioSettingsLike) => {
  const email = normalizeEmail(settings?.contact_email);
  const phone = normalizePhone(settings?.contact_phone);
  const address = normalizeAddress(settings?.contact_address);
  const sameAs = [normalizeSocialUrl(settings?.social_linkedin), normalizeSocialUrl(settings?.social_instagram)]
    .filter((value): value is string => Boolean(value));

  return {
    name: SITE_NAME,
    alternateNames: ['Mosaic Hive', 'Mosaic06 Studio'],
    email,
    phone,
    address,
    postalAddress: {
      '@type': 'PostalAddress',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra Region',
      addressCountry: 'GH',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs,
    socialLinks: sameAs,
    logo: getDefaultSiteIconUrl(),
    image: getDefaultSocialImageUrl(),
    serviceAreas: STUDIO_SERVICE_AREAS,
  };
};

export const buildHomeStructuredData = (settings?: StudioSettingsLike) => {
  const profile = getStudioProfile(settings);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: profile.name,
      alternateName: profile.alternateNames,
      url: getAbsoluteUrl('/'),
      logo: profile.logo,
      image: profile.image,
      email: profile.email,
      telephone: profile.phone,
      address: profile.postalAddress,
      sameAs: profile.sameAs.length > 0 ? profile.sameAs : undefined,
      description:
        'Creative agency in Accra, Ghana building identity systems, websites, campaigns, motion and digital product experiences.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: profile.name,
      alternateName: ['Mosaic06', 'Mosaic Hive'],
      url: getAbsoluteUrl('/'),
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: profile.name,
      alternateName: ['Mosaic Hive'],
      url: getAbsoluteUrl('/'),
      logo: profile.logo,
      image: profile.image,
      email: profile.email,
      telephone: profile.phone,
      address: profile.postalAddress,
      areaServed: profile.serviceAreas,
      openingHoursSpecification: profile.openingHoursSpecification,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: profile.email,
          telephone: profile.phone,
          areaServed: ['GH'],
          availableLanguage: ['en'],
        },
      ],
      sameAs: profile.sameAs.length > 0 ? profile.sameAs : undefined,
      description:
        'Brand identity design, website design, campaign creative, motion and digital product design for ambitious organizations in Ghana and beyond.',
    },
  ];
};

export const buildContactStructuredData = (settings?: StudioSettingsLike) => {
  const profile = getStudioProfile(settings);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Mosaic06 Studio',
      url: getAbsoluteUrl('/contact'),
      description:
        'Contact details for Mosaic06 Studio, a branding, web design and campaign studio based in Accra, Ghana.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: profile.name,
      alternateName: ['Mosaic Hive'],
      url: getAbsoluteUrl('/'),
      logo: profile.logo,
      image: profile.image,
      email: profile.email,
      telephone: profile.phone,
      address: profile.postalAddress,
      areaServed: profile.serviceAreas,
      openingHoursSpecification: profile.openingHoursSpecification,
      sameAs: profile.sameAs.length > 0 ? profile.sameAs : undefined,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: getAbsoluteUrl('/contact'),
          email: profile.email,
          telephone: profile.phone,
          availableLanguage: ['en'],
        },
      ],
      description:
        'Mosaic06 Studio is an Accra-based creative agency delivering branding, web design, campaigns, motion and digital product experiences.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getAbsoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: getAbsoluteUrl('/contact'),
        },
      ],
    },
  ];
};
