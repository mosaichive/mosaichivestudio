-- Extend the single-row settings table into a broader homepage CMS.
alter table public.site_settings
  add column if not exists nav_cta_label text,
  add column if not exists nav_cta_link text,
  add column if not exists studio_capabilities jsonb default '[]'::jsonb,
  add column if not exists featured_eyebrow text,
  add column if not exists featured_headline text,
  add column if not exists featured_cta_label text,
  add column if not exists featured_cta_link text,
  add column if not exists proof_eyebrow text,
  add column if not exists proof_headline text,
  add column if not exists proof_highlight text,
  add column if not exists proof_items jsonb default '[]'::jsonb,
  add column if not exists trust_eyebrow text,
  add column if not exists trust_headline text,
  add column if not exists trust_body text,
  add column if not exists testimonials_eyebrow text,
  add column if not exists testimonials_headline text,
  add column if not exists footer_body text,
  add column if not exists footer_cta_eyebrow text,
  add column if not exists footer_cta_body text,
  add column if not exists footer_cta_label text,
  add column if not exists footer_cta_link text,
  add column if not exists social_linkedin text,
  add column if not exists social_instagram text;

update public.site_settings
set
  nav_cta_label = coalesce(nav_cta_label, 'Start a project'),
  nav_cta_link = coalesce(nav_cta_link, '/get-started'),
  studio_capabilities = case
    when studio_capabilities is null or studio_capabilities = '[]'::jsonb then
      '["Identity systems","Websites","Campaigns","Motion","Content","Product interfaces"]'::jsonb
    else studio_capabilities
  end,
  featured_eyebrow = coalesce(featured_eyebrow, 'Selected Work'),
  featured_headline = coalesce(featured_headline, 'Selected work from a serious creative partner.'),
  featured_cta_label = coalesce(featured_cta_label, 'Browse the full index'),
  featured_cta_link = coalesce(featured_cta_link, '/portfolio'),
  proof_eyebrow = coalesce(proof_eyebrow, 'Proof, not promises'),
  proof_headline = coalesce(proof_headline, 'Work that earns its place on your brand'),
  proof_highlight = coalesce(proof_highlight, '— and on your P&L.'),
  proof_items = case
    when proof_items is null or proof_items = '[]'::jsonb then
      jsonb_build_array(
        jsonb_build_object(
          'stat', coalesce(counter_years, 10)::text || '+',
          'label', 'Years in practice',
          'body', 'A decade shipping work for founders, cultural brands and mission-led businesses across Africa and beyond.'
        ),
        jsonb_build_object(
          'stat', coalesce(counter_projects, 240)::text || '+',
          'label', 'Projects shipped',
          'body', 'Identities, websites, campaigns and product interfaces — built end-to-end under one creative roof.'
        ),
        jsonb_build_object(
          'stat', coalesce(counter_brands, 32)::text,
          'label', 'Brands trusted us',
          'body', 'From early-stage ventures to established institutions — partners who came back for the next chapter.'
        )
      )
    else proof_items
  end,
  trust_eyebrow = coalesce(trust_eyebrow, 'Selected Clients'),
  trust_headline = coalesce(trust_headline, 'Trusted by foundations, founders and ambitious teams.'),
  trust_body = coalesce(trust_body, 'A growing network of institutions, founders and market leaders we''ve shaped brand and digital work for.'),
  testimonials_eyebrow = coalesce(testimonials_eyebrow, 'In Their Words'),
  testimonials_headline = coalesce(testimonials_headline, 'What it feels like to work with us.'),
  footer_body = coalesce(footer_body, 'An independent creative studio building brands with craft, strategy and a long view.'),
  footer_cta_eyebrow = coalesce(footer_cta_eyebrow, 'Start something'),
  footer_cta_body = coalesce(footer_cta_body, 'We partner with ambitious teams on work that deserves strategic depth and excellent execution.'),
  footer_cta_label = coalesce(footer_cta_label, 'Start a Project'),
  footer_cta_link = coalesce(footer_cta_link, '/get-started'),
  social_linkedin = coalesce(social_linkedin, 'https://linkedin.com'),
  social_instagram = coalesce(social_instagram, 'https://instagram.com');
