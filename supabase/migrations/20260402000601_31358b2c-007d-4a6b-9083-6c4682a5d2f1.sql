
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Convenience function for current user
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- user_roles RLS
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.is_admin());

-- Timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ==================== SERVICES ====================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  short_description TEXT,
  full_description TEXT,
  image_url TEXT,
  starting_price NUMERIC,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE USING (public.is_admin());

-- ==================== PRICING PACKAGES ====================
CREATE TABLE public.pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  price NUMERIC,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_pricing_packages_updated_at BEFORE UPDATE ON public.pricing_packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published pricing" ON public.pricing_packages FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert pricing" ON public.pricing_packages FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update pricing" ON public.pricing_packages FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete pricing" ON public.pricing_packages FOR DELETE USING (public.is_admin());

-- ==================== PORTFOLIO PROJECTS ====================
CREATE TABLE public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  client_name TEXT,
  description TEXT,
  cover_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  completion_date DATE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published portfolio" ON public.portfolio_projects FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert portfolio" ON public.portfolio_projects FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update portfolio" ON public.portfolio_projects FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete portfolio" ON public.portfolio_projects FOR DELETE USING (public.is_admin());

-- ==================== GROWTH PLANS ====================
CREATE TABLE public.growth_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  details TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  price NUMERIC,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.growth_plans ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_growth_plans_updated_at BEFORE UPDATE ON public.growth_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published growth plans" ON public.growth_plans FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert growth plans" ON public.growth_plans FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update growth plans" ON public.growth_plans FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete growth plans" ON public.growth_plans FOR DELETE USING (public.is_admin());

-- ==================== SHOP PRODUCTS ====================
CREATE TABLE public.shop_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  cover_image_url TEXT,
  downloadable_urls JSONB DEFAULT '[]'::jsonb,
  price NUMERIC,
  availability_status TEXT NOT NULL DEFAULT 'available',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_shop_products_updated_at BEFORE UPDATE ON public.shop_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published products" ON public.shop_products FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert products" ON public.shop_products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update products" ON public.shop_products FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete products" ON public.shop_products FOR DELETE USING (public.is_admin());

-- ==================== TEAM MEMBERS ====================
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role_title TEXT,
  short_bio TEXT,
  photo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published team" ON public.team_members FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert team" ON public.team_members FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update team" ON public.team_members FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete team" ON public.team_members FOR DELETE USING (public.is_admin());

-- ==================== CONTACT MESSAGES ====================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view messages" ON public.contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update messages" ON public.contact_messages FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete messages" ON public.contact_messages FOR DELETE USING (public.is_admin());

-- ==================== PAGE CONTENT ====================
CREATE TABLE public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page_name, section_key)
);
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON public.page_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view published page content" ON public.page_content FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admins can insert page content" ON public.page_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update page content" ON public.page_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete page content" ON public.page_content FOR DELETE USING (public.is_admin());

-- ==================== SEO SETTINGS ====================
CREATE TABLE public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view SEO settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert SEO" ON public.seo_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update SEO" ON public.seo_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete SEO" ON public.seo_settings FOR DELETE USING (public.is_admin());

-- ==================== MEDIA LIBRARY ====================
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  bucket_name TEXT DEFAULT 'media',
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage media" ON public.media_library FOR ALL USING (public.is_admin());

-- ==================== GLOBAL SETTINGS ====================
CREATE TABLE public.global_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_global_settings_updated_at BEFORE UPDATE ON public.global_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Public can view global settings" ON public.global_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert global settings" ON public.global_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update global settings" ON public.global_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete global settings" ON public.global_settings FOR DELETE USING (public.is_admin());

-- ==================== STORAGE BUCKET ====================
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.is_admin());
