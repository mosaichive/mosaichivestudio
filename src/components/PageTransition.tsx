import React from 'react';
import { motion } from 'framer-motion';

/**
 * Soft, editorial page transition.
 *
 * Two layers:
 *  1. A subtle dark overlay that fades in/out — no branded color, no wipe.
 *  2. The page content lifts and fades gently underneath.
 *
 * Used inside <AnimatePresence mode="wait"> in App.tsx, keyed by route.
 */

const overlayVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0.35,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
  },
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[100] pointer-events-none bg-foreground"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
