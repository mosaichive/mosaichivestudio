import type { User } from '@supabase/supabase-js';

export type MarketplaceAccountType = 'client' | 'creative';

export type MarketplaceCreative = {
  id: string;
  slug: string;
  name: string;
  category: string;
  headline: string;
  bio: string;
  location: string;
  rateFrom: number;
  responseTime: string;
  availability: string;
  yearsExperience: number;
  featured: boolean;
  verified: boolean;
  specialties: string[];
  portfolioHighlights: string[];
  engagement: string;
  tone: string;
};

export type MarketplaceMetadata = {
  account_type: MarketplaceAccountType | null;
  display_name: string;
  company: string;
  phone: string;
  location: string;
  creative_category: string;
  creative_headline: string;
  creative_bio: string;
  creative_portfolio_url: string;
  creative_website_url: string;
  creative_rate_from: string;
  creative_skills: string;
  creative_application_submitted_at: string;
};

const cleanString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export const MARKETPLACE_DISCIPLINES = [
  'All disciplines',
  'Brand Identity',
  'Campaign Design',
  'Editorial Design',
  'Motion Graphics',
  'Product Design',
  'Social Content',
  'Web Design & Build',
] as const;

export const MARKETPLACE_CREATIVES: MarketplaceCreative[] = [
  {
    id: 'adwoa-biney',
    slug: 'adwoa-biney',
    name: 'Adwoa Biney',
    category: 'Brand Identity',
    headline: 'Identity systems for institutions, cultural brands and serious launches.',
    bio: 'Adwoa builds naming-led identity systems with the discipline to travel across signage, print, digital and executive presentations.',
    location: 'Accra, Ghana',
    rateFrom: 4500,
    responseTime: 'Within 24 hours',
    availability: 'Open for June starts',
    yearsExperience: 9,
    featured: true,
    verified: true,
    specialties: ['Naming support', 'Visual systems', 'Launch kits'],
    portfolioHighlights: ['Foundation rebrand', 'Investor deck suite', 'Identity rollout'],
    engagement: 'Best for brand refreshes, launches and institutional positioning work.',
    tone: 'from-[#26133a] via-[#4a245f] to-[#c89b44]',
  },
  {
    id: 'michael-tetteh',
    slug: 'michael-tetteh',
    name: 'Michael Tetteh',
    category: 'Motion Graphics',
    headline: 'Motion systems that make campaigns feel expensive, precise and memorable.',
    bio: 'Michael turns static campaigns into launch-ready motion toolkits across social, events, LED screens and paid media assets.',
    location: 'Accra, Ghana',
    rateFrom: 3200,
    responseTime: 'Same day',
    availability: 'Taking short-turn campaign work',
    yearsExperience: 7,
    featured: true,
    verified: true,
    specialties: ['Launch films', 'Event screens', 'Social loops'],
    portfolioHighlights: ['Event opener', 'Campaign toolkit', 'Motion brand guide'],
    engagement: 'Strong fit for product launches, political campaigns and cultural moments.',
    tone: 'from-[#1a213d] via-[#253f6c] to-[#6eb7d6]',
  },
  {
    id: 'sena-dzakpasu',
    slug: 'sena-dzakpasu',
    name: 'Sena Dzakpasu',
    category: 'Product Design',
    headline: 'Product and interface design for teams building credible digital services.',
    bio: 'Sena works with founders and operators to shape flows, product direction and interface systems that feel calm, modern and trustworthy.',
    location: 'Tema, Ghana',
    rateFrom: 5800,
    responseTime: 'Within 12 hours',
    availability: 'Available for discovery sprints',
    yearsExperience: 8,
    featured: true,
    verified: true,
    specialties: ['UX systems', 'Founder sprints', 'Design QA'],
    portfolioHighlights: ['Mobile wallet UX', 'B2B dashboard', 'Growth experiments'],
    engagement: 'Ideal for fintech, SaaS and internal tools that need stronger product thinking.',
    tone: 'from-[#132531] via-[#1f5460] to-[#a6d3b6]',
  },
  {
    id: 'nana-yeboah',
    slug: 'nana-yeboah',
    name: 'Nana Yeboah',
    category: 'Editorial Design',
    headline: 'Editorial and publication design with authority, rhythm and cultural fluency.',
    bio: 'Nana designs reports, magazines, programmes and high-stakes documents that need to feel premium and easy to read.',
    location: 'Kumasi, Ghana',
    rateFrom: 2800,
    responseTime: 'Within 24 hours',
    availability: 'Open for publication projects',
    yearsExperience: 10,
    featured: false,
    verified: true,
    specialties: ['Reports', 'Publications', 'Event programmes'],
    portfolioHighlights: ['Annual report', 'Festival programme', 'Editorial template'],
    engagement: 'Best for foundations, public institutions and culture-led organisations.',
    tone: 'from-[#3a181b] via-[#6f2432] to-[#e1ad6b]',
  },
  {
    id: 'esi-menson',
    slug: 'esi-menson',
    name: 'Esi Menson',
    category: 'Social Content',
    headline: 'Fast-moving content design for brands that need sharp weekly output.',
    bio: 'Esi creates modular content systems for brands that need consistency across launches, campaigns, community and paid media.',
    location: 'Accra, Ghana',
    rateFrom: 1800,
    responseTime: 'Within 6 hours',
    availability: 'Three monthly retainer slots open',
    yearsExperience: 5,
    featured: false,
    verified: true,
    specialties: ['Campaign bursts', 'Retainer design', 'Content systems'],
    portfolioHighlights: ['Weekly retainer', 'Launch countdown', 'Creator toolkit'],
    engagement: 'A strong fit for brands needing reliable, premium social output every week.',
    tone: 'from-[#2f1927] via-[#81406c] to-[#f0ba71]',
  },
  {
    id: 'kojo-bannor',
    slug: 'kojo-bannor',
    name: 'Kojo Bannor',
    category: 'Web Design & Build',
    headline: 'Design-led websites built to convert, explain and hold attention.',
    bio: 'Kojo pairs visual direction with front-end execution to build launch sites, campaign microsites and service-led web experiences.',
    location: 'Takoradi, Ghana',
    rateFrom: 6200,
    responseTime: 'Within 24 hours',
    availability: 'Open for July builds',
    yearsExperience: 8,
    featured: false,
    verified: true,
    specialties: ['Marketing sites', 'Microsites', 'Front-end systems'],
    portfolioHighlights: ['Launch website', 'Campaign landing page', 'CMS refresh'],
    engagement: 'Best for launch-driven teams that need design and build in one partner.',
    tone: 'from-[#1d1733] via-[#293e78] to-[#70b1f2]',
  },
];

export const getMarketplaceMetadata = (user: User | null): MarketplaceMetadata => {
  const meta = user?.user_metadata ?? {};
  const accountType = cleanString(meta.account_type);

  return {
    account_type:
      accountType === 'creative' || accountType === 'client'
        ? (accountType as MarketplaceAccountType)
        : null,
    display_name: cleanString(meta.display_name) || cleanString(meta.full_name),
    company: cleanString(meta.company),
    phone: cleanString(meta.phone),
    location: cleanString(meta.location),
    creative_category: cleanString(meta.creative_category),
    creative_headline: cleanString(meta.creative_headline),
    creative_bio: cleanString(meta.creative_bio),
    creative_portfolio_url: cleanString(meta.creative_portfolio_url),
    creative_website_url: cleanString(meta.creative_website_url),
    creative_rate_from: cleanString(meta.creative_rate_from),
    creative_skills: cleanString(meta.creative_skills),
    creative_application_submitted_at: cleanString(meta.creative_application_submitted_at),
  };
};

export const getMarketplaceDisplayName = (user: User | null) => {
  const metadata = getMarketplaceMetadata(user);
  if (metadata.display_name) return metadata.display_name;
  if (user?.email) return user.email.split('@')[0];
  return 'Guest';
};

export const formatRate = (rateFrom: number) =>
  new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    maximumFractionDigits: 0,
  }).format(rateFrom);

export const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('');

export const getCreativePreviewFromMetadata = (
  metadata: MarketplaceMetadata,
): MarketplaceCreative | null => {
  if (metadata.account_type !== 'creative') return null;

  const name = metadata.display_name || 'Your profile';
  const category = metadata.creative_category || 'Creative discipline';
  const headline =
    metadata.creative_headline || 'Shape a stronger profile before sending it for review.';
  const bio =
    metadata.creative_bio ||
    'Use your account workspace to define your positioning, services and links before the studio reviews your profile.';
  const specialties = metadata.creative_skills
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  return {
    id: 'account-preview',
    slug: 'account-preview',
    name,
    category,
    headline,
    bio,
    location: metadata.location || 'Add your location',
    rateFrom: Number(metadata.creative_rate_from) || 2500,
    responseTime: 'Within 24 hours',
    availability: metadata.creative_application_submitted_at
      ? 'Submitted for review'
      : 'Draft profile',
    yearsExperience: 0,
    featured: false,
    verified: false,
    specialties: specialties.length > 0 ? specialties : ['Positioning', 'Craft', 'Readiness'],
    portfolioHighlights: metadata.creative_portfolio_url
      ? ['Portfolio link added', 'Ready for editorial review', 'Profile draft saved']
      : ['Add a portfolio URL', 'Define your offer', 'Submit when ready'],
    engagement: metadata.creative_portfolio_url
      ? 'Your application is taking shape. Keep refining it before review.'
      : 'Add a portfolio link and a stronger summary so clients know where you are strongest.',
    tone: 'from-[#2f1d3e] via-[#5d2c72] to-[#c89b44]',
  };
};
