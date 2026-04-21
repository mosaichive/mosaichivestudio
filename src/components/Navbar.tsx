import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import logo from '@/assets/logo.png';
import { useSiteSettings } from '@/hooks/useStudioContent';

const navLinks = [
  { name: 'Work', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Studio', path: '/about' },
  { name: 'Journal', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  const { data: settings } = useSiteSettings();
  const ctaLabel = settings?.nav_cta_label ?? 'Start a project';
  const ctaLink = settings?.nav_cta_link ?? '/get-started';

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-editorial flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Mosaic06 Studio home">
          <img
            src={logo}
            alt=""
            className={`h-9 w-auto transition-transform duration-300 hover:scale-105 ${
              mounted && theme === 'dark' ? 'brightness-0 invert' : ''
            }`}
          />
          <span className="hidden sm:inline font-display text-lg tracking-tight">
            Mosaic06<span className="text-secondary">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link key={l.path} to={l.path} className="nav-link">
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
          </button>

          <Link
            to={ctaLink}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {ctaLabel}
            <ArrowUpRight size={14} />
          </Link>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[64px] bg-background z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-editorial py-12 flex flex-col gap-2">
          {navLinks.map((l, i) => (
            <Link
              key={l.path}
              to={l.path}
              className="font-display text-4xl py-4 border-b border-border text-foreground hover:text-secondary transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.name}
            </Link>
          ))}
          <Link
            to={ctaLink}
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-full font-medium"
          >
            {ctaLabel} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
