import { useEffect, useMemo, useRef, useState } from 'react';
import { useAnimationControls, useReducedMotion } from 'framer-motion';

interface CinematicInViewOptions {
  once?: boolean;
  amount?: number;
  margin?: string;
}

const buildThresholds = (amount: number) => {
  const rounded = Math.max(0.05, Math.min(0.95, amount));
  return [0, rounded * 0.5, rounded, 1];
};

export const useCinematicInView = ({
  once = true,
  amount = 0.18,
  margin = '0px 0px -10% 0px',
}: CinematicInViewOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(reduceMotion);
  const thresholds = useMemo(() => buildThresholds(amount), [amount]);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      controls.set('show');
      return;
    }

    const element = ref.current;
    if (!element) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextInView = entry.isIntersecting && entry.intersectionRatio >= amount * 0.45;
        setInView((current) => {
          if (current === nextInView) return current;
          return nextInView;
        });

        if (cancelled) return;

        if (nextInView) {
          controls.start('show');
          if (once) observer.unobserve(element);
        } else if (!once) {
          controls.start('hidden');
        }
      },
      {
        threshold: thresholds,
        rootMargin: margin,
      },
    );

    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [amount, controls, margin, once, reduceMotion, thresholds]);

  return { ref, inView, controls, reduceMotion };
};

export default useCinematicInView;
