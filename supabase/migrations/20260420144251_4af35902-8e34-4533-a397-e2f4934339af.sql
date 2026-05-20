
-- Standardize project categories to curated set: Brand, Web, Product, Campaign, Motion, E-commerce
UPDATE public.projects SET categories = ARRAY['Brand','Web']      WHERE slug = 'aurelia-atelier';
UPDATE public.projects SET categories = ARRAY['Brand','Campaign'] WHERE slug = 'noir-roast';
UPDATE public.projects SET categories = ARRAY['Web','Product']    WHERE slug = 'salestallysystem';
UPDATE public.projects SET categories = ARRAY['Brand','Web']      WHERE slug = 'terraaidinternational';
UPDATE public.projects SET categories = ARRAY['E-commerce','Brand','Web'] WHERE slug = 'maggstrove';

-- Tighten industry labels for editorial feel
UPDATE public.projects SET industry = 'Fintech'      WHERE slug = 'salestallysystem';
UPDATE public.projects SET industry = 'Non-profit'   WHERE slug = 'terraaidinternational';
UPDATE public.projects SET industry = 'Fashion'      WHERE slug = 'maggstrove';

-- Ensure short one-line excerpts exist on featured projects
UPDATE public.projects SET excerpt = 'A modern sales and inventory platform with a calm, confident interface.'
  WHERE slug = 'salestallysystem' AND (excerpt IS NULL OR excerpt = '');
UPDATE public.projects SET excerpt = 'A digital identity for an environmental movement protecting West African ecosystems.'
  WHERE slug = 'terraaidinternational' AND (excerpt IS NULL OR excerpt = '');
UPDATE public.projects SET excerpt = 'A boutique fashion store rebuilt as a quiet, considered shopping experience.'
  WHERE slug = 'maggstrove' AND (excerpt IS NULL OR excerpt = '');

-- Backfill site_settings counters if currently 0/NULL so the homepage never reads "0+"
UPDATE public.site_settings
SET counter_projects = COALESCE(NULLIF(counter_projects, 0), 240),
    counter_clients  = COALESCE(NULLIF(counter_clients,  0), 180),
    counter_years    = COALESCE(NULLIF(counter_years,    0), 10),
    counter_brands   = COALESCE(NULLIF(counter_brands,   0), 32);
