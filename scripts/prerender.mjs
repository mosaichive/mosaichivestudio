import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const FALLBACK_SITE_URL = 'https://mosaic06studio.design';
const DEFAULT_KEYWORDS = [
  'Mosaic Hive',
  'Mosaic06 Studio',
  'branding agency Accra',
  'web design Ghana',
  'creative agency Accra',
  'brand identity design Ghana',
  'website design Accra',
  'campaign creative Ghana',
];
const DEFAULT_CONTACT_EMAIL = 'mosaichive@gmail.com';
const DEFAULT_CONTACT_PHONE = '+233 54 490 9011';
const DEFAULT_CONTACT_PHONE_COMPACT = '+233544909011';
const DEFAULT_CONTACT_ADDRESS = 'Accra, Greater Accra Region, Ghana';
const DEFAULT_POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Accra',
  addressRegion: 'Greater Accra Region',
  addressCountry: 'GH',
};
const DEFAULT_OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
];
const DEFAULT_SERVICE_AREAS = ['Accra', 'Greater Accra Region', 'Ghana', 'Worldwide'];

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');
const getSiteUrl = () => trimTrailingSlash(process.env.VITE_SITE_URL || FALLBACK_SITE_URL);
const getDefaultImage = () => `${getSiteUrl()}/logo-favicon.png`;
const getDefaultLogo = () => `${getSiteUrl()}/site-icon.png`;

function parseEnvFile(contents) {
  return contents
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((env, line) => {
      const equalIndex = line.indexOf('=');
      if (equalIndex === -1) return env;
      const key = line.slice(0, equalIndex).trim();
      let value = line.slice(equalIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
      return env;
    }, {});
}

async function loadEnvFiles() {
  const files = ['.env.production', '.env.local', '.env'];
  for (const file of files) {
    const filePath = path.join(rootDir, file);
    try {
      const contents = await fs.readFile(filePath, 'utf8');
      const values = parseEnvFile(contents);
      for (const [key, value] of Object.entries(values)) {
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      // Ignore missing env files.
    }
  }
}

const toAbsoluteUrl = (routePath) => new URL(routePath, `${getSiteUrl()}/`).toString();
const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const escapeAttribute = (value = '') => escapeHtml(value);

const plainText = (value = '') =>
  String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const toParagraphs = (value = '') =>
  String(value)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const dedupeKeywords = (keywords = []) =>
  Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords].map((item) => item.trim()).filter(Boolean)));

const renderLinkList = (links = []) => {
  if (!links.length) return '';
  return `
    <ul style="display:grid;gap:12px;padding-left:18px;margin:0;">
      ${links
        .map(
          (link) => `
            <li>
              <a href="${escapeAttribute(link.href)}" style="color:#6f4aa2;text-decoration:none;font-weight:600;">
                ${escapeHtml(link.label)}
              </a>
            </li>`
        )
        .join('')}
    </ul>
  `;
};

const renderBulletList = (items = []) => {
  if (!items.length) return '';
  return `
    <ul style="display:grid;gap:10px;padding-left:18px;margin:0;">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  `;
};

const renderSection = (section) => `
  <section style="padding:28px 0;border-top:1px solid rgba(18,10,22,0.1);">
    <h2 style="margin:0 0 14px;font:600 30px/1.2 'Playfair Display', Georgia, serif;color:#120a16;">
      ${escapeHtml(section.title)}
    </h2>
    ${
      (section.paragraphs ?? [])
        .map(
          (paragraph) => `
            <p style="margin:0 0 14px;font:400 18px/1.75 'Raleway', Arial, sans-serif;color:rgba(18,10,22,0.8);">
              ${escapeHtml(paragraph)}
            </p>`
        )
        .join('')
    }
    ${renderBulletList(section.list)}
    ${section.list?.length && section.links?.length ? '<div style="height:20px"></div>' : ''}
    ${renderLinkList(section.links)}
  </section>
`;

const renderShell = (page) => {
  const canonical = toAbsoluteUrl(page.path);
  const sections = (page.sections ?? []).map(renderSection).join('');
  const imageBlock = page.image
    ? `
      <div style="margin:32px 0 0;">
        <img
          src="${escapeAttribute(page.image)}"
          alt="${escapeAttribute(page.imageAlt || page.heading)}"
          style="display:block;width:100%;max-width:1080px;border-radius:18px;object-fit:cover;background:#f2ede8;"
        />
      </div>
    `
    : '';
  const ctaBlock = page.cta
    ? `
      <section style="margin-top:32px;padding:28px;border-radius:20px;background:#120a16;color:#f8f3ed;">
        <p style="margin:0 0 12px;font:600 12px/1.5 'Raleway', Arial, sans-serif;letter-spacing:0.24em;text-transform:uppercase;color:#d4a64e;">
          ${escapeHtml(page.cta.eyebrow || 'Start a project')}
        </p>
        <h2 style="margin:0 0 12px;font:600 34px/1.15 'Playfair Display', Georgia, serif;">
          ${escapeHtml(page.cta.title)}
        </h2>
        <p style="margin:0 0 18px;font:400 18px/1.7 'Raleway', Arial, sans-serif;color:rgba(248,243,237,0.78);">
          ${escapeHtml(page.cta.body)}
        </p>
        <a href="${escapeAttribute(page.cta.href)}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#d4a64e;color:#120a16;font:700 14px/1 'Raleway', Arial, sans-serif;text-decoration:none;">
          ${escapeHtml(page.cta.label)}
        </a>
      </section>
    `
    : '';

  return `
    <div data-prerendered="true" data-path="${escapeAttribute(page.path)}" style="min-height:100vh;background:#f8f3ed;color:#120a16;">
      <header style="max-width:1180px;margin:0 auto;padding:28px 24px 0;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:18px;align-items:center;">
          <a href="/" style="font:700 22px/1.2 'Raleway', Arial, sans-serif;color:#120a16;text-decoration:none;">
            Mosaic06 Studio
          </a>
          <nav style="display:flex;flex-wrap:wrap;gap:16px 20px;font:600 14px/1.5 'Raleway', Arial, sans-serif;">
            <a href="/portfolio" style="color:#120a16;text-decoration:none;">Selected Work</a>
            <a href="/services" style="color:#120a16;text-decoration:none;">Services</a>
            <a href="/about" style="color:#120a16;text-decoration:none;">About</a>
            <a href="/contact" style="color:#120a16;text-decoration:none;">Contact</a>
          </nav>
        </div>
      </header>
      <main style="max-width:1180px;margin:0 auto;padding:64px 24px 88px;">
        <p style="margin:0 0 16px;font:600 12px/1.5 'Raleway', Arial, sans-serif;letter-spacing:0.24em;text-transform:uppercase;color:#8d6c37;">
          ${escapeHtml(page.eyebrow)}
        </p>
        <h1 style="margin:0;max-width:960px;font:600 clamp(42px,7vw,88px)/1.02 'Playfair Display', Georgia, serif;letter-spacing:-0.03em;color:#120a16;">
          ${escapeHtml(page.heading)}
        </h1>
        <p style="margin:24px 0 0;max-width:860px;font:400 20px/1.75 'Raleway', Arial, sans-serif;color:rgba(18,10,22,0.8);">
          ${escapeHtml(page.intro)}
        </p>
        ${imageBlock}
        <div style="max-width:980px;margin-top:36px;">
          ${sections}
        </div>
        ${ctaBlock}
      </main>
      <footer style="border-top:1px solid rgba(18,10,22,0.1);">
        <div style="max-width:1180px;margin:0 auto;padding:24px;color:rgba(18,10,22,0.68);font:400 14px/1.7 'Raleway', Arial, sans-serif;">
          Mosaic06 Studio, also known as Mosaic Hive, is a creative agency in Accra, Ghana focused on brand identity, website design, campaigns and digital experiences.
        </div>
      </footer>
    </div>
  `;
};

function upsertTag(html, regex, replacement, placement = '</head>') {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace(placement, `${replacement}\n${placement}`);
}

const buildBreadcrumbList = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const buildFaqPage = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

function applyPageTemplate(template, page) {
  const canonical = toAbsoluteUrl(page.path);
  const ogImage = page.image || getDefaultImage();
  const keywords = dedupeKeywords(page.keywords).join(', ');
  let html = template;

  html = upsertTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = upsertTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttribute(page.description)}" />`
  );
  html = upsertTag(
    html,
    /<meta name="keywords" content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${escapeAttribute(keywords)}" />`
  );
  html = upsertTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttribute(page.ogTitle || page.title)}" />`
  );
  html = upsertTag(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttribute(page.ogTitle || page.title)}" />`
  );
  html = upsertTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttribute(page.ogDescription || page.description)}" />`
  );
  html = upsertTag(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttribute(page.ogDescription || page.description)}" />`
  );
  html = upsertTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttribute(canonical)}" />`
  );
  html = upsertTag(
    html,
    /<meta property="og:image" content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeAttribute(ogImage)}" />`
  );
  html = upsertTag(
    html,
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeAttribute(ogImage)}" />`
  );
  html = upsertTag(
    html,
    /<meta property="og:type" content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${escapeAttribute(page.type || 'website')}" />`
  );
  html = upsertTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttribute(canonical)}" />`
  );

  const structuredData = page.jsonLd ? JSON.stringify(page.jsonLd) : '';
  html = html.replace(/<script id="prerender-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
  if (structuredData) {
    html = html.replace(
      '</head>',
      `  <script id="prerender-structured-data" type="application/ld+json">${structuredData}</script>\n</head>`
    );
  }

  html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${renderShell(page)}</div>`);
  return html;
}

function createStaticPages(projects) {
  const featuredProjectLinks = projects.slice(0, 4).map((project) => ({
    href: `/portfolio/${project.slug}`,
    label: `${project.title} — ${project.client}`,
  }));

  return [
    {
      path: '/',
      title: 'Branding & Web Design Agency in Accra, Ghana | Mosaic06 Studio',
      description:
        'Mosaic06 Studio is a creative agency in Accra, Ghana delivering brand identity, website design, campaigns, motion and digital product experiences for ambitious organizations.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio', 'branding agency in Accra', 'web design agency Ghana'],
      eyebrow: 'Branding & Web Design Agency in Accra, Ghana',
      heading: 'Brand systems, websites and campaigns for ambitious organizations.',
      intro:
        'Mosaic06 Studio builds brand identity systems, website design, campaigns, motion and digital product experiences for organizations in Ghana and beyond. We are also known as Mosaic Hive.',
      sections: [
        {
          title: 'What we do',
          paragraphs: [
            'We help organizations become clearer, more trusted and easier to remember through strategy-led creative work.',
          ],
          list: [
            'Brand identity design and brand systems',
            'Website design and development',
            'Campaign creative and launch support',
            'Motion, content and digital product design',
          ],
        },
        {
          title: 'Selected work',
          paragraphs: [
            'Explore recent brand, web and campaign engagements from the studio.',
          ],
          links: featuredProjectLinks.length
            ? featuredProjectLinks
            : [
                { href: '/portfolio', label: 'View selected work' },
                { href: '/services', label: 'Explore studio services' },
              ],
        },
      ],
      cta: {
        eyebrow: 'Start a project',
        title: 'Talk to the studio about your next brief.',
        body: 'If you need branding, web design, campaign creative or digital product support, send the outline and we will respond with practical next steps.',
        href: '/contact',
        label: 'Contact Mosaic06 Studio',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive', 'Mosaic06 Studio'],
          url: toAbsoluteUrl('/'),
          logo: getDefaultLogo(),
          image: getDefaultImage(),
          email: DEFAULT_CONTACT_EMAIL,
          telephone: DEFAULT_CONTACT_PHONE_COMPACT,
          address: DEFAULT_POSTAL_ADDRESS,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic06', 'Mosaic Hive'],
          url: toAbsoluteUrl('/'),
          inLanguage: 'en',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive'],
          url: toAbsoluteUrl('/'),
          logo: getDefaultLogo(),
          email: DEFAULT_CONTACT_EMAIL,
          telephone: DEFAULT_CONTACT_PHONE_COMPACT,
          address: DEFAULT_POSTAL_ADDRESS,
          areaServed: DEFAULT_SERVICE_AREAS,
          openingHoursSpecification: DEFAULT_OPENING_HOURS,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: DEFAULT_CONTACT_EMAIL,
              telephone: DEFAULT_CONTACT_PHONE_COMPACT,
              areaServed: ['GH'],
              availableLanguage: ['en'],
            },
          ],
          description:
            'Brand identity design, website design, campaign creative, motion and digital product design for ambitious organizations.',
        },
      ],
    },
    {
      path: '/services',
      title: 'Branding, Web Design & Creative Services in Accra, Ghana | Mosaic06 Studio',
      description:
        'Explore Mosaic06 Studio services across brand identity, website design, campaign creative, motion, content and product design for organizations in Accra, Ghana and beyond.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio services', 'branding services Accra', 'web design services Ghana'],
      eyebrow: 'Studio Services',
      heading: 'Brand identity, website design and campaign creative in one studio.',
      intro:
        'Clients come to Mosaic06 Studio for integrated creative support: strategy, brand identity, web design, campaign development, motion and digital product thinking.',
      sections: [
        {
          title: 'Core capabilities',
          list: [
            'Identity systems and brand architecture',
            'Website strategy, UX, UI and frontend build',
            'Campaign concepts, launch assets and rollout creative',
            'Motion systems, social content and brand films',
            'Editorial direction, copywriting and photography planning',
            'Product interfaces and dashboards',
          ],
        },
        {
          title: 'Recent proof',
          links: featuredProjectLinks.length
            ? featuredProjectLinks
            : [{ href: '/portfolio', label: 'See project case studies' }],
          paragraphs: [
            'Our public case studies show how strategy-led creative work translates into better trust, stronger launches and clearer digital experiences.',
          ],
        },
      ],
      cta: {
        title: 'Need a branding or website design partner?',
        body: 'Share your brief and we will tell you whether we are the right studio for the job.',
        href: '/get-started',
        label: 'Start a project',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Services',
          url: toAbsoluteUrl('/services'),
          description:
            'Brand identity, website design, campaign creative, motion and product design services from Mosaic06 Studio.',
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Services', url: toAbsoluteUrl('/services') },
        ]),
      ],
    },
    {
      path: '/branding-agency-accra',
      title: 'Branding Agency in Accra, Ghana | Mosaic06 Studio',
      description:
        'Mosaic06 Studio is a branding agency in Accra helping ambitious organizations shape strategy, identity systems and launch-ready brand experiences.',
      keywords: [
        'Mosaic Hive',
        'Mosaic06 Studio',
        'branding agency Accra',
        'brand identity design Ghana',
        'brand strategy agency Ghana',
      ],
      eyebrow: 'Branding Agency in Accra',
      heading: 'Brand strategy and identity systems for organizations that need authority in public.',
      intro:
        'Mosaic06 Studio builds brand identities that hold up in the market, in the boardroom and across every public-facing touchpoint. Mosaic Hive remains part of that same brand story, but this is the studio expression clients hire for strategic creative work.',
      sections: [
        {
          title: 'What clients usually need',
          paragraphs: [
            'Most teams arrive here because the business has grown faster than the brand, the organization is preparing for a more visible moment, or leadership needs a system that can scale beyond one campaign.',
          ],
          list: [
            'Brand positioning and narrative clarity',
            'Naming support, messaging direction and identity architecture',
            'A visual system that works across real channels and real teams',
          ],
        },
        {
          title: 'What Mosaic06 Studio delivers',
          paragraphs: [
            'We connect strategy to design execution so the brand does not fracture between concept, rollout and daily use.',
          ],
          list: [
            'Brand strategy, identity design and governance tools',
            'Launch assets, editorial content direction and rollout support',
            'Web design and campaign integration when the brand needs to go live fast',
          ],
        },
        {
          title: 'Relevant routes',
          paragraphs: [
            'Follow these internal routes to see the studio’s public work and project intake flow.',
          ],
          links: [
            { href: '/portfolio/gge', label: 'See the Ghana Gold Expo Foundation case study' },
            { href: '/services', label: 'Explore full studio services' },
            { href: '/get-started', label: 'Start a brand project' },
          ],
        },
        {
          title: 'Frequently asked questions',
          paragraphs: [
            'What kind of branding projects do you take on in Accra? We work on rebrands, launches, institutional identity systems, founder-led business positioning and brand refreshes that need to translate clearly across digital and physical channels.',
            'Do you only design logos? No. The studio focuses on the larger system: brand strategy, verbal direction, visual identity, rollout thinking and the tools teams need to use the brand well after launch.',
            'Can branding and web design happen together? Yes. Many engagements combine brand identity and website design so the strategy, visual system and live experience feel coherent from day one.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Brand brief',
        title: 'If the organization has outgrown its current identity, this is the right place to start.',
        body: 'Send the business context, goals and timeline. We will reply with a grounded view of scope, fit and the smartest next move.',
        href: '/get-started',
        label: 'Start a branding project',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Branding Agency in Accra, Ghana',
          url: toAbsoluteUrl('/branding-agency-accra'),
          description:
            'Branding agency landing page for Mosaic06 Studio in Accra, Ghana.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive'],
          url: toAbsoluteUrl('/branding-agency-accra'),
          areaServed: ['Accra', 'Ghana', 'Worldwide'],
          serviceType: 'Branding Agency in Accra',
          description:
            'Brand strategy, identity systems and launch-ready brand experiences for ambitious organizations.',
        },
        buildFaqPage([
          {
            question: 'What kind of branding projects do you take on in Accra?',
            answer:
              'We work on rebrands, launches, institutional identity systems, founder-led business positioning and brand refreshes that need to translate clearly across digital and physical channels.',
          },
          {
            question: 'Do you only design logos?',
            answer:
              'No. The studio focuses on the larger system: brand strategy, verbal direction, visual identity, rollout thinking and the tools teams need to use the brand well after launch.',
          },
          {
            question: 'Can branding and web design happen together?',
            answer:
              'Yes. Many engagements combine brand identity and website design so the strategy, visual system and live experience feel coherent from day one.',
          },
        ]),
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Branding Agency Accra', url: toAbsoluteUrl('/branding-agency-accra') },
        ]),
      ],
    },
    {
      path: '/web-design-ghana',
      title: 'Web Design in Ghana | Website Design Studio in Accra | Mosaic06 Studio',
      description:
        'Mosaic06 Studio designs and builds editorial, conversion-led websites in Ghana for brands, institutions and mission-led organizations.',
      keywords: [
        'Mosaic Hive',
        'Mosaic06 Studio',
        'web design Ghana',
        'website design Accra',
        'web design studio Ghana',
      ],
      eyebrow: 'Web Design in Ghana',
      heading: 'Editorial, conversion-led websites built for credibility, clarity and growth.',
      intro:
        'We design websites that make an organization easier to trust, easier to understand and easier to choose. That means stronger strategy up front, sharper structure in the middle and better execution when the site goes live.',
      sections: [
        {
          title: 'What strong web design changes',
          paragraphs: [
            'A serious website does more than look polished. It clarifies the offer, strengthens trust signals and gives every visitor a cleaner route to action.',
          ],
          list: [
            'Sharper information architecture and page hierarchy',
            'Editorial visual design aligned to brand positioning',
            'Conversion-aware page flows for inquiries, applications or fundraising',
          ],
        },
        {
          title: 'How the studio builds websites',
          paragraphs: [
            'We combine strategy, content structure, UI design and front-end implementation so the public experience stays coherent from concept to launch.',
          ],
          list: [
            'Discovery, UX planning and design direction',
            'Responsive UI systems, front-end build and CMS thinking',
            'SEO-minded page structure, technical hygiene and launch readiness',
          ],
        },
        {
          title: 'Relevant routes',
          paragraphs: [
            'These linked pages deepen the website story with proof, broader services and direct contact.',
          ],
          links: [
            {
              href: '/portfolio/terraaidinternational',
              label: 'See the Terra Aid International website case study',
            },
            { href: '/services', label: 'See all web and digital services' },
            { href: '/contact', label: 'Talk to the studio about your website' },
          ],
        },
        {
          title: 'Frequently asked questions',
          paragraphs: [
            'Do you build custom websites or use templates? We design custom websites around the organization’s goals, content and brand position. The objective is a site that feels distinctive, performant and easier to maintain over time.',
            'Can you redesign an existing website? Yes. Redesign work is common when the brand has matured, the current site no longer supports growth, or leadership needs better structure, credibility and conversion.',
            'Do you consider SEO while designing the website? Yes. Page architecture, metadata, internal linking, content hierarchy and technical SEO are considered during the build so the site launches with a stronger search foundation.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Website brief',
        title: 'If the current site undersells the work, let’s fix that at the strategy level and the execution level.',
        body: 'Share what the website needs to do, who it needs to persuade and what has not been working well enough so far.',
        href: '/get-started',
        label: 'Start a website project',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Web Design in Ghana',
          url: toAbsoluteUrl('/web-design-ghana'),
          description:
            'Website design landing page for Mosaic06 Studio in Accra, Ghana.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive'],
          url: toAbsoluteUrl('/web-design-ghana'),
          areaServed: ['Accra', 'Ghana', 'Worldwide'],
          serviceType: 'Web Design in Ghana',
          description:
            'Editorial, conversion-led website design and build services for ambitious organizations.',
        },
        buildFaqPage([
          {
            question: 'Do you build custom websites or use templates?',
            answer:
              'We design custom websites around the organization’s goals, content and brand position. The objective is a site that feels distinctive, performant and easier to maintain over time.',
          },
          {
            question: 'Can you redesign an existing website?',
            answer:
              'Yes. Redesign work is common when the brand has matured, the current site no longer supports growth, or leadership needs better structure, credibility and conversion.',
          },
          {
            question: 'Do you consider SEO while designing the website?',
            answer:
              'Yes. Page architecture, metadata, internal linking, content hierarchy and technical SEO are considered during the build so the site launches with a stronger search foundation.',
          },
        ]),
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Web Design Ghana', url: toAbsoluteUrl('/web-design-ghana') },
        ]),
      ],
    },
    {
      path: '/creative-agency-ghana',
      title: 'Creative Agency in Ghana | Brand, Web & Campaign Studio | Mosaic06 Studio',
      description:
        'Mosaic06 Studio is a creative agency in Ghana delivering branding, website design, campaign creative, content and motion for ambitious organizations.',
      keywords: [
        'Mosaic Hive',
        'Mosaic06 Studio',
        'creative agency Ghana',
        'creative agency Accra',
        'campaign agency Ghana',
      ],
      eyebrow: 'Creative Agency in Ghana',
      heading: 'One creative partner across brand, web, campaigns, content and digital experiences.',
      intro:
        'Some briefs need more than one specialist and less than five disconnected vendors. Mosaic06 Studio exists for that middle ground: integrated creative leadership with the craft standard of a boutique and the seriousness expected by visible organizations.',
      sections: [
        {
          title: 'What an integrated creative agency changes',
          paragraphs: [
            'The advantage is coherence. Strategy, design, messaging and rollout support one another instead of competing for attention or drifting apart across vendors.',
          ],
          list: [
            'A single creative point of view across the full engagement',
            'Faster decisions and less fragmentation between teams',
            'A stronger end result across campaigns, websites and brand systems',
          ],
        },
        {
          title: 'What the studio covers in practice',
          paragraphs: [
            'Engagements can start with brand, web or campaign work and expand where needed, without losing the quality or discipline of the original brief.',
          ],
          list: [
            'Brand positioning, identity systems and launch support',
            'Website strategy, UX, UI and front-end implementation',
            'Campaign creative, content systems, motion and presentation assets',
          ],
        },
        {
          title: 'Relevant routes',
          paragraphs: [
            'These pages show the breadth of the studio and where that breadth turns into proof.',
          ],
          links: [
            { href: '/portfolio', label: 'Browse selected work' },
            { href: '/portfolio/gge', label: 'See the Ghana Gold Expo Foundation project' },
            { href: '/contact', label: 'Contact Mosaic06 Studio' },
          ],
        },
        {
          title: 'Frequently asked questions',
          paragraphs: [
            'What makes Mosaic06 Studio different from hiring separate freelancers? The studio provides integrated creative leadership, clearer accountability and a more coherent end product across strategy, brand, web and campaign execution.',
            'Do you work only in Ghana? The studio is based in Accra, Ghana, and works with organizations locally and internationally when the scope and fit are right.',
            'Can one engagement include branding, a website and campaign assets? Yes. That integrated model is one of the studio’s strengths, especially when a launch, rebrand or institutional push needs consistency across every public touchpoint.',
          ],
        },
      ],
      cta: {
        eyebrow: 'Studio engagement',
        title: 'If the brief cuts across brand, web and public communication, bring it to one creative partner.',
        body: 'We can help define the scope, sequence the work and identify where integrated execution will make the biggest difference.',
        href: '/contact',
        label: 'Talk to the studio',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Creative Agency in Ghana',
          url: toAbsoluteUrl('/creative-agency-ghana'),
          description:
            'Creative agency landing page for Mosaic06 Studio in Ghana.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive'],
          url: toAbsoluteUrl('/creative-agency-ghana'),
          areaServed: ['Accra', 'Ghana', 'Worldwide'],
          serviceType: 'Creative Agency in Ghana',
          description:
            'Integrated branding, website design, campaign creative, content and motion for ambitious organizations.',
        },
        buildFaqPage([
          {
            question: 'What makes Mosaic06 Studio different from hiring separate freelancers?',
            answer:
              'The studio provides integrated creative leadership, clearer accountability and a more coherent end product across strategy, brand, web and campaign execution.',
          },
          {
            question: 'Do you work only in Ghana?',
            answer:
              'The studio is based in Accra, Ghana, and works with organizations locally and internationally when the scope and fit are right.',
          },
          {
            question: 'Can one engagement include branding, a website and campaign assets?',
            answer:
              'Yes. That integrated model is one of the studio’s strengths, especially when a launch, rebrand or institutional push needs consistency across every public touchpoint.',
          },
        ]),
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Creative Agency Ghana', url: toAbsoluteUrl('/creative-agency-ghana') },
        ]),
      ],
    },
    {
      path: '/about',
      title: 'About Mosaic06 Studio | Creative Agency in Accra, Ghana',
      description:
        'Learn about Mosaic06 Studio, a creative agency in Accra, Ghana working across brand identity, website design, campaigns, motion and digital product experiences.',
      keywords: ['Mosaic Hive', 'about Mosaic06 Studio', 'creative agency Accra Ghana'],
      eyebrow: 'About the Studio',
      heading: 'A creative agency in Accra, Ghana for organizations that want to be remembered.',
      intro:
        'Mosaic06 Studio is an independent creative agency, also known as Mosaic Hive, working with founders, institutions and mission-led organizations on branding, web design and campaign strategy.',
      sections: [
        {
          title: 'How we work',
          paragraphs: [
            'We bring strategy, design and implementation together so brands do not lose coherence between the brief, the visual system and the live experience.',
            'Our approach is calm, considered and direct. We scope honestly, build carefully and stay focused on outcomes that hold up beyond launch week.',
          ],
        },
        {
          title: 'What the studio covers',
          list: [
            'Brand identity systems',
            'Website design and development',
            'Campaign creative',
            'Motion and editorial content',
            'Digital product and dashboard interfaces',
          ],
        },
      ],
      cta: {
        title: 'See how the work looks in public.',
        body: 'The strongest introduction to the studio is still the work itself.',
        href: '/portfolio',
        label: 'View selected work',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Mosaic06 Studio',
          url: toAbsoluteUrl('/about'),
          description:
            'About the Accra-based creative agency Mosaic06 Studio and its brand, web and campaign work.',
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'About', url: toAbsoluteUrl('/about') },
        ]),
      ],
    },
    {
      path: '/portfolio',
      title: 'Portfolio | Branding, Web Design & Campaign Projects | Mosaic06 Studio',
      description:
        'Browse branding, website design, campaign and digital product projects delivered by Mosaic06 Studio in Accra, Ghana and beyond.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio portfolio', 'branding portfolio Ghana', 'web design portfolio Accra'],
      eyebrow: 'Selected Work',
      heading: 'Branding, websites and campaigns that move brands forward.',
      intro:
        'This portfolio brings together brand identity systems, website design, launch campaigns and digital product work delivered from Accra, Ghana across multiple industries.',
      sections: [
        {
          title: 'Recent case studies',
          links: featuredProjectLinks.length
            ? featuredProjectLinks
            : [{ href: '/portfolio', label: 'Browse the portfolio' }],
        },
      ],
      cta: {
        title: 'Need work at this level?',
        body: 'Tell us what you are building and we can shape the next engagement around your goals, timelines and audience.',
        href: '/contact',
        label: 'Talk to the studio',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Selected Work',
          url: toAbsoluteUrl('/portfolio'),
          description:
            'Branding, website design, campaign and product case studies from Mosaic06 Studio.',
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Portfolio', url: toAbsoluteUrl('/portfolio') },
        ]),
      ],
    },
    {
      path: '/contact',
      title: 'Contact Mosaic06 Studio | Creative Agency in Accra, Ghana',
      description:
        'Contact Mosaic06 Studio in Accra, Ghana for brand identity, web design, campaigns, motion and digital product inquiries.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio contact', 'contact creative agency Accra'],
      eyebrow: 'Contact the Studio',
      heading: 'Tell us about your next brand, website or campaign project.',
      intro:
        'If you need a branding agency in Accra, a web design partner in Ghana, or a campaign studio for a serious launch, send the outline and we will reply with honest next steps from our Accra base.',
      sections: [
        {
          title: 'Get in touch',
          paragraphs: [
            `Email: ${DEFAULT_CONTACT_EMAIL}`,
            `Phone: ${DEFAULT_CONTACT_PHONE}`,
            `Location: ${DEFAULT_CONTACT_ADDRESS}`,
            'Studio hours: Mon–Fri · 9am – 6pm GMT',
          ],
          links: [
            { href: '/get-started', label: 'Use the project inquiry form' },
            { href: '/branding-agency-accra', label: 'See local branding agency page' },
            { href: '/web-design-ghana', label: 'See local web design page' },
          ],
        },
      ],
      cta: {
        title: 'Prefer a structured brief?',
        body: 'Use the project form to share your scope, goals and timeline in one place.',
        href: '/get-started',
        label: 'Start a project',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Mosaic06 Studio',
          url: toAbsoluteUrl('/contact'),
          description:
            'Contact details and inquiry routes for Mosaic06 Studio in Accra, Ghana.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive'],
          url: toAbsoluteUrl('/'),
          logo: getDefaultLogo(),
          image: getDefaultImage(),
          email: DEFAULT_CONTACT_EMAIL,
          telephone: DEFAULT_CONTACT_PHONE_COMPACT,
          address: DEFAULT_POSTAL_ADDRESS,
          areaServed: DEFAULT_SERVICE_AREAS,
          openingHoursSpecification: DEFAULT_OPENING_HOURS,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              url: toAbsoluteUrl('/contact'),
              email: DEFAULT_CONTACT_EMAIL,
              telephone: DEFAULT_CONTACT_PHONE_COMPACT,
              availableLanguage: ['en'],
            },
          ],
          description:
            'Mosaic06 Studio is an Accra-based creative agency delivering branding, web design, campaigns, motion and digital product experiences.',
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Contact', url: toAbsoluteUrl('/contact') },
        ]),
      ],
    },
    {
      path: '/clients',
      title: 'Clients & Partners | Mosaic06 Studio',
      description:
        'See the foundations, founders and organizations that trust Mosaic06 Studio for brand, web and campaign work.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio clients', 'creative agency Ghana clients'],
      eyebrow: 'Clients and Partners',
      heading: 'Organizations that trust the studio with visible work.',
      intro:
        'Mosaic06 Studio works with founders, foundations, hospitality groups and mission-led teams that need strategic creative work to land clearly in public.',
      sections: [
        {
          title: 'Where we contribute',
          list: [
            'Brand identity systems',
            'Website design and digital platforms',
            'Campaign creative and launch support',
            'Editorial content and motion',
          ],
        },
        {
          title: 'See the resulting work',
          links: featuredProjectLinks.length
            ? featuredProjectLinks
            : [{ href: '/portfolio', label: 'View project case studies' }],
        },
      ],
      cta: {
        title: 'See the work behind the relationships.',
        body: 'The best way to evaluate fit is to explore the studio’s public case studies.',
        href: '/portfolio',
        label: 'View selected work',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Clients and Partners',
          url: toAbsoluteUrl('/clients'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Clients', url: toAbsoluteUrl('/clients') },
        ]),
      ],
    },
    {
      path: '/team',
      title: 'Team | Mosaic06 Studio, Accra Creative Agency',
      description:
        'Meet the leadership and specialist network behind Mosaic06 Studio, a creative agency in Accra, Ghana.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio team', 'creative agency team Accra'],
      eyebrow: 'Studio Team',
      heading: 'The creative and strategy leadership behind the work.',
      intro:
        'Mosaic06 Studio is led by experienced creative and strategy partners and supported by a trusted network of specialist collaborators across photography, motion and engineering.',
      sections: [
        {
          title: 'What clients get',
          list: [
            'Direct senior creative leadership',
            'Strategy linked closely to execution',
            'A curated network of trusted specialists',
          ],
        },
        {
          title: 'Interested in future collaboration?',
          links: [{ href: '/careers', label: 'See careers and portfolio submission details' }],
        },
      ],
      cta: {
        title: 'Explore the public work first.',
        body: 'The team shows up most clearly in the work we publish and the systems we build for clients.',
        href: '/portfolio',
        label: 'View selected work',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Mosaic06 Studio Team',
          url: toAbsoluteUrl('/team'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Team', url: toAbsoluteUrl('/team') },
        ]),
      ],
    },
    {
      path: '/get-started',
      title: 'Start a Project · Mosaic06 Studio',
      description:
        'Request branding, website, campaign, content or product design services from Mosaic06 Studio and share your project brief.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio project inquiry', 'hire branding agency Accra', 'website design quote Ghana'],
      eyebrow: 'Project Inquiry',
      heading: 'Share the brief, timeline and goals for your next project.',
      intro:
        'This page is for organizations that are ready to discuss branding, website design, campaign development, content or digital product work with Mosaic06 Studio.',
      sections: [
        {
          title: 'What to include',
          list: [
            'Your organization or company name',
            'The service you need',
            'The timeline and budget range',
            'The business goal behind the work',
          ],
        },
      ],
      cta: {
        title: 'Need a lighter first conversation?',
        body: 'If the project is still taking shape, use the contact page and we can start there.',
        href: '/contact',
        label: 'Contact the studio',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Start a Project',
          url: toAbsoluteUrl('/get-started'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Start a Project', url: toAbsoluteUrl('/get-started') },
        ]),
      ],
    },
    {
      path: '/portfolio-submission',
      title: 'Submit Your Portfolio · Mosaic06 Studio',
      description:
        'Share your portfolio, creative specialization and experience with Mosaic06 Studio for future collaboration opportunities.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio portfolio submission', 'creative portfolio Ghana'],
      eyebrow: 'Portfolio Submission',
      heading: 'Share your work with the studio for future collaboration.',
      intro:
        'Designers, writers, motion artists and engineers can use this page to submit a portfolio and tell the studio what kind of work they want to do next.',
      sections: [
        {
          title: 'What to send',
          list: [
            'A portfolio URL or clear work samples',
            'Your specialization',
            'A short note on experience and availability',
          ],
        },
      ],
      cta: {
        title: 'No open role today, still useful tomorrow.',
        body: 'We review strong submissions even when there is no immediate opening.',
        href: '/careers',
        label: 'See careers page',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Submit Your Portfolio',
          url: toAbsoluteUrl('/portfolio-submission'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Portfolio Submission', url: toAbsoluteUrl('/portfolio-submission') },
        ]),
      ],
    },
    {
      path: '/blog',
      title: 'Journal | Branding, Web Design & Creative Strategy Insights',
      description:
        'Insights from Mosaic06 Studio on branding, web design, editorial systems, campaigns and creative strategy. New writing coming soon.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio journal', 'branding insights Ghana', 'web design insights Accra'],
      eyebrow: 'Journal',
      heading: 'Branding, web design and creative strategy notes from the studio.',
      intro:
        'The journal is preparing future writing on brand systems, editorial web design, campaigns and creative decision-making. Until then, the case studies are the best public record of how the studio thinks.',
      sections: [
        {
          title: 'Read in the meantime',
          links: featuredProjectLinks.length
            ? featuredProjectLinks
            : [{ href: '/portfolio', label: 'Browse case studies' }],
        },
      ],
      cta: {
        title: 'Explore the work while the essays are on the way.',
        body: 'The public project archive already shows the studio’s thinking in real client contexts.',
        href: '/portfolio',
        label: 'View selected work',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Mosaic06 Studio Journal',
          url: toAbsoluteUrl('/blog'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Journal', url: toAbsoluteUrl('/blog') },
        ]),
      ],
    },
    {
      path: '/podcast',
      title: 'Podcast | Branding, Founders & Creative Practice',
      description:
        'A forthcoming Mosaic06 Studio podcast on branding, creative practice, founders and the work of building organizations worth remembering.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio podcast', 'branding podcast Ghana', 'creative practice podcast'],
      eyebrow: 'Podcast',
      heading: 'Conversations on branding, founders and creative practice.',
      intro:
        'The forthcoming Mosaic06 Studio podcast will explore how ambitious organizations are built, positioned and made more memorable through thoughtful creative work.',
      sections: [
        {
          title: 'What it will cover',
          list: [
            'Brand strategy and creative practice',
            'Founders and organization-building',
            'Campaign thinking and public communication',
          ],
          links: [{ href: '/contact', label: 'Suggest a guest or topic' }],
        },
      ],
      cta: {
        title: 'Want to suggest a guest?',
        body: 'Use the live podcast guest suggestion form inside the public page.',
        href: '/podcast',
        label: 'Open the podcast page',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Mosaic06 Studio Podcast',
          url: toAbsoluteUrl('/podcast'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Podcast', url: toAbsoluteUrl('/podcast') },
        ]),
      ],
    },
    {
      path: '/careers',
      title: 'Careers | Mosaic06 Studio',
      description:
        'Career opportunities and portfolio submissions for designers, writers, motion artists and engineers who want to work with Mosaic06 Studio.',
      keywords: ['Mosaic Hive', 'Mosaic06 Studio careers', 'creative jobs Accra', 'design portfolio Ghana'],
      eyebrow: 'Careers',
      heading: 'Future collaboration opportunities with the studio.',
      intro:
        'Mosaic06 Studio hires deliberately and keeps a curated network of designers, writers, motion artists and engineers whose work aligns with the studio’s standards.',
      sections: [
        {
          title: 'How to get on the radar',
          paragraphs: [
            'Even without a live opening, strong portfolios and clear notes about the work you want to do are useful to receive.',
          ],
          links: [{ href: '/portfolio-submission', label: 'Submit your portfolio' }],
        },
      ],
      cta: {
        title: 'Show us the work.',
        body: 'If the craft feels close to ours, the best next step is to submit a strong portfolio.',
        href: '/portfolio-submission',
        label: 'Submit your portfolio',
      },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Careers',
          url: toAbsoluteUrl('/careers'),
        },
        buildBreadcrumbList([
          { name: 'Home', url: toAbsoluteUrl('/') },
          { name: 'Careers', url: toAbsoluteUrl('/careers') },
        ]),
      ],
    },
  ];
}

async function fetchProjects() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) return [];
  const endpoint = new URL('/rest/v1/projects', supabaseUrl);
  endpoint.searchParams.set(
    'select',
    'slug,title,client,industry,year,excerpt,challenge,solution,services,results,cover_url,updated_at,created_at,categories,published'
  );
  endpoint.searchParams.set('published', 'eq.true');
  endpoint.searchParams.set('order', 'position.asc');

  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects for prerender: ${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows.filter((row) => row?.slug) : [];
}

function createProjectPage(project, projects) {
  const sections = [];
  const excerpt = plainText(project.excerpt);
  const challengeParagraphs = toParagraphs(project.challenge);
  const solutionParagraphs = toParagraphs(project.solution);
  const services = Array.isArray(project.services) ? project.services.filter(Boolean) : [];
  const results = Array.isArray(project.results)
    ? project.results
        .filter((item) => item && item.label && item.value)
        .map((item) => `${plainText(item.value)} — ${plainText(item.label)}`)
    : [];

  if (challengeParagraphs.length) {
    sections.push({ title: 'Challenge', paragraphs: challengeParagraphs });
  }
  if (solutionParagraphs.length) {
    sections.push({ title: 'Approach', paragraphs: solutionParagraphs });
  }
  if (services.length) {
    sections.push({ title: 'Services delivered', list: services.map(plainText) });
  }
  if (results.length) {
    sections.push({ title: 'Outcomes', list: results });
  }

  const nextProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3)
    .map((item) => ({
      href: `/portfolio/${item.slug}`,
      label: `${item.title} — ${item.client}`,
    }));

  if (nextProjects.length) {
    sections.push({ title: 'More case studies', links: nextProjects });
  }

  const pathName = `/portfolio/${project.slug}`;
  const title = `${plainText(project.client)} — ${plainText(project.title)} | Mosaic06 Studio Case Study`;
  const description =
    excerpt ||
    `${plainText(project.title)} case study by Mosaic06 Studio for ${plainText(project.client)}.`;

  return {
    path: pathName,
    title,
    description,
    keywords: [
      'Mosaic Hive',
      'Mosaic06 Studio',
      `${plainText(project.client)} case study`,
      `${plainText(project.title)} project`,
      ...(Array.isArray(project.categories) ? project.categories.map((item) => `${plainText(item)} project Ghana`) : []),
    ],
    eyebrow: `Case Study · ${plainText(project.year || project.client)}`,
    heading: plainText(project.title),
    intro:
      excerpt ||
      `A public case study from Mosaic06 Studio for ${plainText(project.client)} across ${Array.isArray(project.categories) ? project.categories.map(plainText).join(', ') : 'creative work'}.`,
    image: project.cover_url || getDefaultImage(),
    imageAlt: `${plainText(project.client)} — ${plainText(project.title)}`,
    type: 'article',
    sections,
    cta: {
      title: 'Need a project like this built carefully?',
      body: 'Contact the studio to discuss brand identity, website design, campaign work or digital product support.',
      href: '/contact',
      label: 'Start a conversation',
    },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: plainText(project.title),
        headline: `${plainText(project.client)} — ${plainText(project.title)}`,
        description,
        url: toAbsoluteUrl(pathName),
        image: project.cover_url ? [project.cover_url] : [getDefaultImage()],
        creator: {
          '@type': 'Organization',
          name: 'Mosaic06 Studio',
          alternateName: ['Mosaic Hive'],
          url: toAbsoluteUrl('/'),
        },
        about: plainText(project.client),
        dateCreated: project.created_at,
        dateModified: project.updated_at,
      },
      buildBreadcrumbList([
        { name: 'Home', url: toAbsoluteUrl('/') },
        { name: 'Portfolio', url: toAbsoluteUrl('/portfolio') },
        { name: plainText(project.title), url: toAbsoluteUrl(pathName) },
      ]),
    ],
  };
}

async function writeRoutePage(template, page) {
  const destination =
    page.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, page.path.replace(/^\/+/, ''), 'index.html');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, applyPageTemplate(template, page), 'utf8');
}

async function main() {
  await loadEnvFiles();

  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
  const projects = await fetchProjects().catch((error) => {
    console.warn(error.message);
    return [];
  });

  const pages = [...createStaticPages(projects), ...projects.map((project) => createProjectPage(project, projects))];
  await Promise.all(pages.map((page) => writeRoutePage(template, page)));

  console.log(`Prerendered ${pages.length} public routes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
