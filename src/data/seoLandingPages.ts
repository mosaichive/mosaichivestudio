export type SeoLandingSection = {
  title: string;
  body: string;
  bullets: string[];
};

export type SeoLandingLink = {
  label: string;
  to: string;
  description: string;
};

export type SeoLandingFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPageDefinition = {
  path: string;
  label: string;
  title: string;
  description: string;
  keywords: string[];
  eyebrow: string;
  heading: string;
  intro: string;
  positioning: string;
  highlights: string[];
  sections: SeoLandingSection[];
  relatedLinks: SeoLandingLink[];
  faqs: SeoLandingFaq[];
  cta: {
    eyebrow: string;
    headline: string;
    body: string;
    label: string;
    to: string;
  };
};

export const seoLandingPages: SeoLandingPageDefinition[] = [
  {
    path: '/branding-agency-accra',
    label: 'Branding Agency Accra',
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
    positioning:
      'For launches, rebrands, institutional positioning and growing businesses that need more than a logo.',
    highlights: [
      'Brand strategy grounded in audience, ambition and market context',
      'Identity systems designed for digital, print, campaigns and internal alignment',
      'Launch-ready implementation across web, content and communications',
    ],
    sections: [
      {
        title: 'What clients usually need',
        body:
          'Most teams arrive here because the business has grown faster than the brand, the organization is preparing for a more visible moment, or leadership needs a system that can scale beyond one campaign.',
        bullets: [
          'Brand positioning and narrative clarity',
          'Naming support, messaging direction and identity architecture',
          'A visual system that works across real channels and real teams',
        ],
      },
      {
        title: 'What Mosaic06 Studio delivers',
        body:
          'We connect strategy to design execution so the brand does not fracture between concept, rollout and daily use.',
        bullets: [
          'Brand strategy, identity design and governance tools',
          'Launch assets, editorial content direction and rollout support',
          'Web design and campaign integration when the brand needs to go live fast',
        ],
      },
      {
        title: 'Why the work lands',
        body:
          'The studio combines editorial taste with practical operating discipline, which means the identity is not only beautiful, it is usable by the people responsible for growth.',
        bullets: [
          'Senior creative direction from first conversation to delivery',
          'Systems built for credibility, trust and easier adoption',
          'A stronger public impression across brand, web and campaign touchpoints',
        ],
      },
    ],
    relatedLinks: [
      {
        label: 'See the Ghana Gold Expo Foundation case study',
        to: '/portfolio/gge',
        description: 'A live example of strategic identity, campaign thinking and public-facing execution.',
      },
      {
        label: 'Explore full studio services',
        to: '/services',
        description: 'See how branding connects to website design, campaigns, motion and product experiences.',
      },
      {
        label: 'Start a brand project',
        to: '/get-started',
        description: 'Share your timeline, scope and organizational context with the studio.',
      },
    ],
    faqs: [
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
    ],
    cta: {
      eyebrow: 'Brand brief',
      headline: 'If the organization has outgrown its current identity, this is the right place to start.',
      body:
        'Send the business context, goals and timeline. We will reply with a grounded view of scope, fit and the smartest next move.',
      label: 'Start a branding project',
      to: '/get-started',
    },
  },
  {
    path: '/web-design-ghana',
    label: 'Web Design Ghana',
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
    positioning:
      'For brands, institutions and growing teams that need more than a template and expect the website to move the business.',
    highlights: [
      'Site architecture shaped around audience questions and decision paths',
      'Design systems that feel premium on desktop and mobile',
      'Launch support across content, CMS structure, forms and measurement',
    ],
    sections: [
      {
        title: 'What strong web design changes',
        body:
          'A serious website does more than look polished. It clarifies the offer, strengthens trust signals and gives every visitor a cleaner route to action.',
        bullets: [
          'Sharper information architecture and page hierarchy',
          'Editorial visual design aligned to brand positioning',
          'Conversion-aware page flows for inquiries, applications or fundraising',
        ],
      },
      {
        title: 'How the studio builds websites',
        body:
          'We combine strategy, content structure, UI design and front-end implementation so the public experience stays coherent from concept to launch.',
        bullets: [
          'Discovery, UX planning and design direction',
          'Responsive UI systems, front-end build and CMS thinking',
          'SEO-minded page structure, technical hygiene and launch readiness',
        ],
      },
      {
        title: 'Where this is especially useful',
        body:
          'The strongest fit is usually a brand or organization that has grown in ambition and now needs a site that reflects the level of work already happening behind the scenes.',
        bullets: [
          'Foundations and mission-led organizations building public trust',
          'Professional services firms and founder-led companies',
          'Campaigns, events and launches that need a focused digital home',
        ],
      },
    ],
    relatedLinks: [
      {
        label: 'See the Terra Aid International website case study',
        to: '/portfolio/terraaidinternational',
        description: 'A live example of editorial web design aligned to mission, donor trust and clarity.',
      },
      {
        label: 'See all web and digital services',
        to: '/services',
        description: 'Review how site strategy, identity systems and campaign work connect inside one studio.',
      },
      {
        label: 'Talk to the studio about your website',
        to: '/contact',
        description: 'Use the contact page if you want a lighter first conversation before submitting a full brief.',
      },
    ],
    faqs: [
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
    ],
    cta: {
      eyebrow: 'Website brief',
      headline: 'If the current site undersells the work, let’s fix that at the strategy level and the execution level.',
      body:
        'Share what the website needs to do, who it needs to persuade and what has not been working well enough so far.',
      label: 'Start a website project',
      to: '/get-started',
    },
  },
  {
    path: '/creative-agency-ghana',
    label: 'Creative Agency Ghana',
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
    positioning:
      'For launches, institutions, founder-led companies and teams that need strategy carried all the way through execution.',
    highlights: [
      'Brand identity, website design and campaign thinking under one roof',
      'Creative direction that stays coherent across disciplines and deadlines',
      'A public-facing standard designed to make organizations look larger, sharper and more trusted',
    ],
    sections: [
      {
        title: 'What an integrated creative agency changes',
        body:
          'The advantage is coherence. Strategy, design, messaging and rollout support one another instead of competing for attention or drifting apart across vendors.',
        bullets: [
          'A single creative point of view across the full engagement',
          'Faster decisions and less fragmentation between teams',
          'A stronger end result across campaigns, websites and brand systems',
        ],
      },
      {
        title: 'What the studio covers in practice',
        body:
          'Engagements can start with brand, web or campaign work and expand where needed, without losing the quality or discipline of the original brief.',
        bullets: [
          'Brand positioning, identity systems and launch support',
          'Website strategy, UX, UI and front-end implementation',
          'Campaign creative, content systems, motion and presentation assets',
        ],
      },
      {
        title: 'Why serious teams choose this model',
        body:
          'When the work is public, the cost of inconsistency is high. This studio model keeps the story, the experience and the design language aligned.',
        bullets: [
          'Senior ownership with fewer handoff failures',
          'Creative work designed to hold up across channels',
          'Stronger perception for the organization in moments that matter',
        ],
      },
    ],
    relatedLinks: [
      {
        label: 'Browse selected work',
        to: '/portfolio',
        description: 'Review case studies across identity, websites, campaigns and product experiences.',
      },
      {
        label: 'See the Ghana Gold Expo Foundation project',
        to: '/portfolio/gge',
        description: 'A strong example of mission, visibility and creative execution meeting in one public project.',
      },
      {
        label: 'Contact Mosaic06 Studio',
        to: '/contact',
        description: 'Reach the studio directly when the brief is broad and you need help framing the right scope.',
      },
    ],
    faqs: [
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
    ],
    cta: {
      eyebrow: 'Studio engagement',
      headline: 'If the brief cuts across brand, web and public communication, bring it to one creative partner.',
      body:
        'We can help define the scope, sequence the work and identify where integrated execution will make the biggest difference.',
      label: 'Talk to the studio',
      to: '/contact',
    },
  },
];

export const seoLandingPageMap = Object.fromEntries(
  seoLandingPages.map((page) => [page.path, page])
) as Record<string, SeoLandingPageDefinition>;
