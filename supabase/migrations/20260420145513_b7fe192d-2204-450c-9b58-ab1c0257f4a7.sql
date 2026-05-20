
-- 1. Update hero copy to editorial portfolio-led headline
UPDATE public.site_settings
SET hero_headline = 'Brands and digital experiences people remember.',
    hero_subheadline = 'An editorial digital studio working across identity, web, campaigns, motion and product — for ambitious brands and mission-led businesses.',
    hero_cta_primary_label = 'View selected work',
    hero_cta_primary_link = '/portfolio',
    hero_cta_secondary_label = 'Start a project',
    hero_cta_secondary_link = '/contact';

-- 2. Curate services + tools so they read as clean editorial labels (not raw CMS dumps)

-- SikaFlow
UPDATE public.projects
SET services = ARRAY['Product Strategy','UX & UI Design','Frontend Development','Dashboard & Data Viz','Payments Integration'],
    tools    = ARRAY['Figma','React','Tailwind CSS','Node.js','Vercel','Paystack']
WHERE slug = 'salestallysystem';

-- Maggs Trove
UPDATE public.projects
SET services = ARRAY['E-commerce Strategy','UX & UI Design','Frontend Development','Backend & APIs','Payments Integration'],
    tools    = ARRAY['Figma','React','Node.js','Paystack','Vercel']
WHERE slug = 'maggstrove';

-- Terra Aid International — already clean, light tighten
UPDATE public.projects
SET services = ARRAY['Brand Identity','Website Design & Build','Photography Direction','Editorial Copywriting','CMS Build'],
    tools    = ARRAY['Figma','Webflow','Sanity CMS']
WHERE slug = 'terraaidinternational';

-- Aurelia Atelier — already clean, normalize labels
UPDATE public.projects
SET services = ARRAY['Brand Strategy','Visual Identity','Editorial Art Direction','Website Design & Build','Lookbook Production'],
    tools    = ARRAY['Figma','Adobe InDesign','Webflow','Capture One']
WHERE slug = 'aurelia-atelier';

-- Noir Roast — already clean
UPDATE public.projects
SET services = ARRAY['Brand Identity','Packaging System','Copywriting','Print Production'],
    tools    = ARRAY['Adobe Illustrator','Photoshop','InDesign']
WHERE slug = 'noir-roast';
