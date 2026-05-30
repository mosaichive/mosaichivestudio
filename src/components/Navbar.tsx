import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import logo from '@/assets/logo.png';
import { cn } from '@/lib/utils';
import { useSiteSettings } from '@/hooks/useStudioContent';

const navLinks = [
  { name: 'Work', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Studio', path: '/about' },
  { name: 'Journal', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const isActivePath = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

interface FloatingNavLinkProps {
  label: string;
  to: string;
  active: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}

const FloatingNavLink: React.FC<FloatingNavLinkProps> = ({
  label,
  to,
  active,
  mobile = false,
  onNavigate,
}) => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 24, mass: 0.42 });
  const y = useSpring(rawY, { stiffness: 240, damping: 24, mass: 0.42 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * (mobile ? 12 : 10));
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * (mobile ? 8 : 6));
  };

  const resetPointer = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className={cn('inline-flex', mobile && 'w-full')}
      style={reduceMotion ? undefined : { x, y, willChange: 'transform' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={resetPointer}
    >
      <Link
        to={to}
        onClick={onNavigate}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-colors duration-300',
          mobile
            ? 'w-full px-6 py-4 text-[2rem] font-display tracking-[-0.03em] text-foreground'
            : 'px-4 py-2.5 text-sm font-medium text-foreground/74 hover:text-foreground',
        )}
      >
        <motion.span
          aria-hidden
          className={cn(
            'absolute inset-0 rounded-full',
            mobile ? 'bg-white/[0.04] dark:bg-white/[0.05]' : 'bg-white/[0.05] dark:bg-white/[0.05]',
          )}
          animate={{ opacity: hovered || active ? 1 : mobile ? 0.18 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {active ? (
          <motion.span
            layoutId={mobile ? 'mobile-nav-active-indicator' : 'desktop-nav-active-indicator'}
            className={cn(
              'absolute inset-0 rounded-full border',
              mobile
                ? 'border-white/12 bg-white/[0.07] shadow-[0_18px_40px_-30px_hsl(var(--foreground)/0.34)]'
                : 'border-white/14 bg-white/[0.08] shadow-[0_16px_30px_-24px_hsl(var(--foreground)/0.3)]',
            )}
            transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.54 }}
          />
        ) : null}

        <motion.span
          aria-hidden
          className={cn(
            'absolute left-1/2 rounded-full bg-secondary',
            mobile ? 'bottom-3 h-[2px]' : 'bottom-1.5 h-px',
          )}
          style={{ x: '-50%' }}
          animate={{
            width: hovered || active ? (mobile ? '72%' : '58%') : mobile ? '18%' : '14%',
            opacity: hovered || active ? 0.92 : 0.42,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        <span className="relative z-10">{label}</span>
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  const { data: settings } = useSiteSettings();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const ctaLabel = settings?.nav_cta_label ?? 'Start a project';
  const ctaLink = settings?.nav_cta_link ?? '/get-started';

  const shellAlphaFrom = useTransform(scrollY, [0, 160], [0.34, 0.82]);
  const shellAlphaTo = useTransform(scrollY, [0, 160], [0.12, 0.58]);
  const shellBorderAlpha = useTransform(scrollY, [0, 160], [0.14, 0.26]);
  const shellShadowAlpha = useTransform(scrollY, [0, 160], [0.14, 0.24]);
  const shellScale = useTransform(scrollY, [0, 160], [1, 0.985]);
  const shellY = useTransform(scrollY, [0, 160], [0, -3]);

  const shellBackground = useMotionTemplate`linear-gradient(145deg, hsl(var(--background) / ${shellAlphaFrom}), hsl(var(--background) / ${shellAlphaTo}))`;
  const shellBorder = useMotionTemplate`hsl(var(--foreground) / ${shellBorderAlpha})`;
  const shellShadow = useMotionTemplate`0 28px 70px -42px hsl(var(--foreground) / ${shellShadowAlpha})`;

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 16);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
        style={reduceMotion ? undefined : { y: shellY }}
      >
        <motion.div
          className="container-editorial"
          style={reduceMotion ? undefined : { scale: shellScale, transformOrigin: 'top center' }}
        >
          <motion.div
            className="floating-navbar-shell"
            style={{
              background: shellBackground,
              borderColor: shellBorder,
              boxShadow: shellShadow,
            }}
            animate={{
              paddingTop: scrolled ? '0.7rem' : '0.88rem',
              paddingBottom: scrolled ? '0.7rem' : '0.88rem',
            }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            data-scrolled={scrolled}
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_0%,hsl(var(--secondary)/0.16),transparent_32%),radial-gradient(circle_at_80%_10%,hsl(var(--primary)/0.12),transparent_38%)] opacity-70" />

            <div className="relative z-10 flex items-center justify-between gap-3 px-3 sm:px-4 md:px-6">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full px-2 py-1"
                aria-label="Mosaic06 Studio home"
              >
                <img
                  src={logo}
                  alt="Mosaic06 Studio"
                  className={`h-9 w-auto transition-transform duration-300 hover:scale-[1.03] ${
                    mounted && theme === 'dark' ? 'brightness-0 invert' : ''
                  }`}
                />
                <span className="sr-only">Mosaic06 Studio</span>
              </Link>

              <LayoutGroup>
                <nav className="hidden lg:flex items-center gap-2">
                  {navLinks.map((link) => (
                    <FloatingNavLink
                      key={link.path}
                      label={link.name}
                      to={link.path}
                      active={isActivePath(pathname, link.path)}
                    />
                  ))}
                </nav>
              </LayoutGroup>

              <div className="flex items-center gap-2 md:gap-3">
                <motion.button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-foreground/70 transition-colors hover:text-foreground dark:border-white/10 dark:bg-white/[0.04]"
                  aria-label="Toggle theme"
                  whileHover={reduceMotion ? undefined : { y: -1.5, scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                >
                  {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
                </motion.button>

                <motion.div
                  className="hidden sm:inline-flex"
                  whileHover={reduceMotion ? undefined : { y: -1.5, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Link
                    to={ctaLink}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/12 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_20px_40px_-26px_hsl(var(--primary)/0.6)]"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)/0.94),hsl(var(--secondary)/0.82)_135%)]" />
                    <span className="absolute inset-0 translate-y-full bg-[linear-gradient(135deg,hsl(var(--secondary)/0.28),transparent_60%)] transition-transform duration-500 group-hover:translate-y-0" />
                    <span className="relative z-10">{ctaLabel}</span>
                    <ArrowUpRight
                      size={14}
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </motion.div>

                <motion.button
                  className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-foreground dark:border-white/10 dark:bg-white/[0.04]"
                  onClick={() => setIsOpen((open) => !open)}
                  aria-label="Toggle menu"
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                >
                  <motion.span
                    animate={reduceMotion ? undefined : { rotate: isOpen ? 90 : 0, scale: isOpen ? 1.05 : 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 px-3 pb-3 pt-24 md:px-5 md:pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-background/72 backdrop-blur-2xl"
              initial={reduceMotion ? false : { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.9rem)' }}
              animate={reduceMotion ? undefined : { clipPath: 'circle(140% at calc(100% - 2.5rem) 2.9rem)' }}
              exit={reduceMotion ? undefined : { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.9rem)' }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="floating-menu-panel relative h-[calc(100svh-7.5rem)] overflow-hidden rounded-[2rem] border border-white/12"
              initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 16, scale: 0.985, filter: 'blur(8px)' }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-secondary/12 blur-3xl"
                animate={reduceMotion ? undefined : { x: [0, 30, -8, 0], y: [0, 20, -12, 0], scale: [1, 1.08, 0.98, 1] }}
                transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-primary/16 blur-3xl"
                animate={reduceMotion ? undefined : { x: [0, -22, 12, 0], y: [0, -16, 18, 0], scale: [1, 0.96, 1.06, 1] }}
                transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(140deg,hsl(var(--background)/0.78),hsl(var(--background)/0.62))]" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.08,
                      },
                    },
                  }}
                  className="space-y-3 pt-8"
                >
                  <LayoutGroup>
                    {navLinks.map((link) => (
                      <motion.div
                        key={link.path}
                        variants={{
                          hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
                          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                        }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <FloatingNavLink
                          label={link.name}
                          to={link.path}
                          active={isActivePath(pathname, link.path)}
                          mobile
                          onNavigate={() => setIsOpen(false)}
                        />
                      </motion.div>
                    ))}
                  </LayoutGroup>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.16, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] px-5 py-5 shadow-[0_20px_50px_-38px_hsl(var(--foreground)/0.34)]">
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-secondary/82">
                      Mosaic06 Studio
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/68">
                      Branding, websites, campaigns and digital experiences for ambitious organisations.
                    </p>
                  </div>

                  <Link
                    to={ctaLink}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/12 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-[0_24px_52px_-30px_hsl(var(--primary)/0.58)]"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)/0.94),hsl(var(--secondary)/0.82)_135%)]" />
                    <span className="relative z-10">{ctaLabel}</span>
                    <ArrowUpRight
                      size={16}
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
