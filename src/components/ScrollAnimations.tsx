import { useEffect } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const ScrollAnimations = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const easedProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.8 });
  const easedScrollY = useSpring(scrollY, { stiffness: 120, damping: 26, mass: 0.8 });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('has-scroll-motion');

    return () => {
      root.classList.remove('has-scroll-motion');
      root.style.removeProperty('--site-scroll-progress');
      root.style.removeProperty('--site-scroll-y');
    };
  }, []);

  useMotionValueEvent(easedProgress, 'change', (latest) => {
    document.documentElement.style.setProperty('--site-scroll-progress', latest.toFixed(4));
  });

  useMotionValueEvent(easedScrollY, 'change', (latest) => {
    document.documentElement.style.setProperty('--site-scroll-y', latest.toFixed(2));
  });

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.style.setProperty('--site-scroll-progress', '0');
      document.documentElement.style.setProperty('--site-scroll-y', '0');
    }
  }, [reduceMotion]);

  return null;
};

export default ScrollAnimations;
