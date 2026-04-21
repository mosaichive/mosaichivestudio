import caseAurelia from '@/assets/cases/case-aurelia.jpg';
import caseNoirRoast from '@/assets/cases/case-noir-roast.jpg';
import caseVaultFintech from '@/assets/cases/case-vault-fintech.jpg';
import caseMaisonHotel from '@/assets/cases/case-maison-hotel.jpg';
import caseHeritageFilm from '@/assets/cases/case-heritage-film.jpg';
import caseVelvetSkin from '@/assets/cases/case-velvet-skin.jpg';

export type Category =
  | 'Branding'
  | 'Web Design'
  | 'Motion'
  | 'Video'
  | 'Marketing'
  | 'Packaging';

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  cover: string;
  categories: Category[];
  excerpt: string;
  challenge: string;
  solution: string;
  services: string[];
  tools: string[];
  results: { label: string; value: string }[];
  gallery: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'aurelia-atelier',
    title: 'A Quiet Rebellion in Luxury Fashion',
    client: 'Aurelia Atelier',
    industry: 'Luxury Fashion',
    year: '2025',
    cover: caseAurelia,
    categories: ['Branding', 'Web Design'],
    excerpt:
      'Repositioning a heritage atelier into a modern editorial brand without losing its quiet authority.',
    challenge:
      'Aurelia Atelier had three decades of craft history but was being mistaken for a generic fashion label by a younger, digitally-native audience. Their existing identity felt dated, the website couldn\'t convert browsers into clients, and their story was getting lost in a saturated market.',
    solution:
      'We led a six-week brand intensive — interviewing the founders, archive-diving through past collections, and rebuilding the identity around a single editorial principle: restraint. A new wordmark, a refined gold-on-aubergine palette, an editorial photography direction, and a commerce-ready website that reads like a fashion magazine.',
    services: [
      'Brand Strategy',
      'Visual Identity',
      'Editorial Art Direction',
      'Website Design & Development',
      'Lookbook Production',
    ],
    tools: ['Figma', 'Adobe InDesign', 'Webflow', 'Capture One'],
    results: [
      { label: 'Online revenue', value: '+218%' },
      { label: 'Average order value', value: '+64%' },
      { label: 'Press features', value: '11 in 90 days' },
    ],
    gallery: [caseAurelia, caseVelvetSkin, caseMaisonHotel],
    featured: true,
  },
  {
    slug: 'noir-roast',
    title: 'A Coffee Brand Worth Reading',
    client: 'Noir Roast Co.',
    industry: 'Specialty Coffee',
    year: '2025',
    cover: caseNoirRoast,
    categories: ['Branding', 'Packaging'],
    excerpt:
      'Turning a specialty roaster into a shelf-stopping editorial brand built for both cafés and grocery aisles.',
    challenge:
      'Noir Roast had outstanding beans and a loyal café following, but supermarket buyers couldn\'t place them. The packaging looked artisanal but inconsistent across SKUs, and they were being undercut by cheaper, better-presented competitors at retail.',
    solution:
      'We developed a modular packaging system anchored by a custom serif wordmark and a single accent gold. Each origin became its own editorial chapter, with story copy printed on the back like a magazine column. Retail-ready, but unmistakably craft.',
    services: [
      'Brand Identity',
      'Packaging System',
      'Copywriting',
      'Print Production Direction',
    ],
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign'],
    results: [
      { label: 'New retail accounts', value: '34' },
      { label: 'Wholesale revenue', value: '+142%' },
      { label: 'Repeat purchase rate', value: '58%' },
    ],
    gallery: [caseNoirRoast, caseAurelia, caseVelvetSkin],
    featured: true,
  },
  {
    slug: 'vault-fintech',
    title: 'Making Finance Feel Inevitable',
    client: 'Vault',
    industry: 'Fintech',
    year: '2026',
    cover: caseVaultFintech,
    categories: ['Motion', 'Web Design', 'Marketing'],
    excerpt:
      'A motion-led product launch that took a private-banking app from beta to 40k users in one quarter.',
    challenge:
      'Vault was launching a wealth-management app into a category dominated by trust-driven incumbents. They needed to feel established on day one, explain a complex product in seconds, and acquire affluent users without sounding like a startup.',
    solution:
      'We built a launch system: a motion-graphics film that explained the product in 70 seconds, a marketing site engineered for conversion, and a paid social campaign of 24 cinematic cutdowns. Every frame held the same calm, confident tone.',
    services: [
      'Motion Graphics',
      'Launch Film',
      'Website Development',
      'Performance Marketing',
    ],
    tools: ['After Effects', 'Cinema 4D', 'Figma', 'Webflow', 'Meta Ads'],
    results: [
      { label: 'Sign-ups in 90 days', value: '40,200' },
      { label: 'Cost per acquisition', value: '−47%' },
      { label: 'Launch film views', value: '2.1M' },
    ],
    gallery: [caseVaultFintech, caseHeritageFilm, caseMaisonHotel],
    featured: true,
  },
  {
    slug: 'maison-belmar',
    title: 'A Boutique Hotel That Reads Like a Novel',
    client: 'Maison Belmar',
    industry: 'Hospitality',
    year: '2025',
    cover: caseMaisonHotel,
    categories: ['Web Design', 'Branding'],
    excerpt:
      'A new digital home for a 14-room boutique hotel — designed to feel like an invitation, not a booking funnel.',
    challenge:
      'Maison Belmar relied entirely on third-party booking platforms, losing 18% to commission and brand control. They needed a direct-booking site that matched the in-person experience: intimate, slow, and unmistakably theirs.',
    solution:
      'We art-directed an on-property photo shoot, wrote room descriptions like a travel essay, and built a site with a bespoke direct-booking flow that converts on first visit. The whole experience was tuned for evening browsing on a phone in bed.',
    services: [
      'Website Design & Development',
      'Photography Direction',
      'Copywriting',
      'CMS Build',
    ],
    tools: ['Figma', 'Webflow', 'Sanity CMS'],
    results: [
      { label: 'Direct bookings', value: '+312%' },
      { label: 'Commission saved (Y1)', value: '$94k' },
      { label: 'Avg. session time', value: '4m 18s' },
    ],
    gallery: [caseMaisonHotel, caseAurelia, caseVelvetSkin],
  },
  {
    slug: 'heritage-films',
    title: 'A Documentary Series That Travelled',
    client: 'Heritage Films',
    industry: 'Media & Culture',
    year: '2025',
    cover: caseHeritageFilm,
    categories: ['Video', 'Motion'],
    excerpt:
      'Producing a six-part cultural documentary that landed on three streaming platforms and a film-festival circuit.',
    challenge:
      'Heritage Films had the access and the stories but no in-house production capacity. They needed a studio that could shoot, edit, color-grade and deliver broadcast-quality episodes on a tight independent budget.',
    solution:
      'We staffed a small, senior crew, designed a consistent visual language (warm, painterly, slow), and built an end-to-end pipeline from shot list to finished delivery. Six episodes, six months, one cohesive series.',
    services: [
      'Video Production',
      'Cinematography',
      'Post-Production',
      'Color Grading',
      'Title & Motion Design',
    ],
    tools: ['Sony FX6', 'DaVinci Resolve', 'Premiere Pro', 'After Effects'],
    results: [
      { label: 'Streaming pickups', value: '3 platforms' },
      { label: 'Festival selections', value: '7' },
      { label: 'Audience reach', value: '1.4M' },
    ],
    gallery: [caseHeritageFilm, caseVaultFintech, caseMaisonHotel],
  },
  {
    slug: 'velvet-skin',
    title: 'A Skincare Launch That Sold Out',
    client: 'Velvet Skin',
    industry: 'Beauty & Wellness',
    year: '2026',
    cover: caseVelvetSkin,
    categories: ['Marketing', 'Branding', 'Motion'],
    excerpt:
      'An integrated digital launch for a clean-beauty range — from product naming to a sold-out first drop.',
    challenge:
      'Velvet Skin was launching into one of the most saturated DTC categories in the world. Without a strong brand point of view and a campaign that travelled, the product would never reach the shelf — let alone leave it.',
    solution:
      'We named the range, designed the identity, art-directed the campaign shoot, and ran a 30-day launch across Instagram, TikTok and Meta. A single, restrained creative line — repeated, varied, and adapted ruthlessly to each surface.',
    services: [
      'Brand Identity',
      'Campaign Art Direction',
      'Content Production',
      'Paid Social Strategy',
    ],
    tools: ['Figma', 'Photoshop', 'Premiere Pro', 'Meta Ads', 'TikTok Ads'],
    results: [
      { label: 'First drop', value: 'Sold out in 9 days' },
      { label: 'ROAS', value: '6.4x' },
      { label: 'Email list growth', value: '+18,400' },
    ],
    gallery: [caseVelvetSkin, caseAurelia, caseNoirRoast],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const getFeaturedCaseStudies = () =>
  caseStudies.filter((c) => c.featured);
