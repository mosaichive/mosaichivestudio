import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useSiteSettings } from '@/hooks/useStudioContent';

const getPhoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

const Footer = () => {
  const { data: settings } = useSiteSettings();
  const email = settings?.contact_email ?? 'hello@mosaic06studio.com';
  const phone = settings?.contact_phone ?? '+233 20 298 5474';
  const address = settings?.contact_address ?? 'Accra, Ghana';
  const body =
    settings?.footer_body ??
    'An independent creative studio building brands with craft, strategy and a long view.';
  const ctaEyebrow = settings?.footer_cta_eyebrow ?? 'Start something';
  const ctaBody = settings?.footer_cta_body ?? 'We take on a small number of projects each quarter.';
  const ctaLabel = settings?.footer_cta_label ?? 'Start a Project';
  const ctaLink = settings?.footer_cta_link ?? '/get-started';
  const linkedin = settings?.social_linkedin ?? 'https://linkedin.com';
  const instagram = settings?.social_instagram ?? 'https://instagram.com';

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-editorial pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-16 pb-16 border-b border-primary-foreground/15">
          {/* Studio block */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Mosaic06 Studio"
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="font-display text-xl">Mosaic06 Studio</span>
            </Link>
            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-md mb-8">
              {body}
            </p>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors">
                <Mail size={16} className="text-secondary" />
                {email}
              </a>
              <a href={getPhoneHref(phone)} className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors">
                <Phone size={16} className="text-secondary" />
                {phone}
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin size={16} className="text-secondary" />
                {address}
              </div>
            </div>
          </div>

          {/* Studio links */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-5">Studio</p>
            <ul className="space-y-3 text-primary-foreground/75">
              <li><Link to="/about" className="hover:text-secondary transition-colors">About</Link></li>
              <li><Link to="/team" className="hover:text-secondary transition-colors">Team</Link></li>
              <li><Link to="/careers" className="hover:text-secondary transition-colors">Careers</Link></li>
              <li><Link to="/clients" className="hover:text-secondary transition-colors">Clients</Link></li>
            </ul>
          </div>

          {/* Work links */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-5">Work</p>
            <ul className="space-y-3 text-primary-foreground/75">
              <li><Link to="/portfolio" className="hover:text-secondary transition-colors">Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Journal</Link></li>
              <li><Link to="/podcast" className="hover:text-secondary transition-colors">Podcast</Link></li>
            </ul>
          </div>

          {/* CTA block */}
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-5">{ctaEyebrow}</p>
            <p className="text-primary-foreground/75 mb-6 leading-relaxed">
              {ctaBody}
            </p>
            <Link
              to={ctaLink}
              className="group inline-flex items-center gap-2 px-5 py-3 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/90 transition-all"
            >
              {ctaLabel}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Mosaic06 Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              <Instagram size={18} />
            </a>
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">Privacy</Link>
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
