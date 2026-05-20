const FALLBACK_SITE_URL = 'https://mosaic06studio.design';
const FALLBACK_SUPABASE_URL = 'https://nqixloyeucqkzytsgkmu.supabase.co';
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xaXhsb3lldWNxa3p5dHNna211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NTA4ODgsImV4cCI6MjA4MzAyNjg4OH0.dxR5_ERx5MXxPsSFjwRyuK2MzV-hEb2QuwN4WUpWWQg';

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const getSiteUrl = () => trimTrailingSlash(process.env.VITE_SITE_URL || FALLBACK_SITE_URL);

const toAbsoluteUrl = (path) => new URL(path, `${getSiteUrl()}/`).toString();

const toDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split('T')[0];
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;');

const getStaticPages = () => [
  { path: '/' },
  { path: '/services' },
  { path: '/branding-agency-accra' },
  { path: '/web-design-ghana' },
  { path: '/creative-agency-ghana' },
  { path: '/about' },
  { path: '/portfolio' },
  { path: '/blog' },
  { path: '/contact' },
  { path: '/clients' },
  { path: '/team' },
  { path: '/get-started' },
  { path: '/podcast' },
  { path: '/careers' },
  { path: '/portfolio-submission' },
];

const getPublishedProjects = async () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const supabaseKey =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return [];

  const endpoint = new URL('/rest/v1/projects', supabaseUrl);
  endpoint.searchParams.set('select', 'slug,updated_at,published');
  endpoint.searchParams.set('published', 'eq.true');
  endpoint.searchParams.set('order', 'position.asc');

  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase sitemap fetch failed with ${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows)
    ? rows
        .filter((row) => row?.slug)
        .map((row) => ({
          path: `/portfolio/${row.slug}`,
          lastmod: toDate(row.updated_at),
        }))
    : [];
};

const toUrlNode = ({ path, lastmod }) => {
  const loc = toAbsoluteUrl(path);
  const lastmodNode = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : '';

  return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodNode}\n  </url>`;
};

export default async function handler(_req, res) {
  const staticPages = getStaticPages();
  let projectPages = [];

  try {
    projectPages = await getPublishedProjects();
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error);
  }

  const entries = [...staticPages, ...projectPages];
  const dedupedEntries = Array.from(new Map(entries.map((entry) => [entry.path, entry])).values());
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...dedupedEntries.map(toUrlNode),
    '</urlset>',
  ].join('\n');

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
