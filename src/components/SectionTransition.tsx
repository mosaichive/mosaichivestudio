import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

type SectionTone = 'primary' | 'secondary' | 'neutral';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
}

const toneMap: Record<SectionTone, { top: string; bottom: string; divider: string }> = {
  primary: {
    top: 'radial-gradient(70% 100% at 50% 0%, hsl(var(--primary) / 0.1), transparent 74%)',
    bottom: 'radial-gradient(70% 100% at 50% 100%, hsl(var(--secondary) / 0.08), transparent 76%)',
    divider: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.18), hsl(var(--secondary) / 0.16), transparent)',
  },
  secondary: {
    top: 'radial-gradient(70% 100% at 50% 0%, hsl(var(--secondary) / 0.12), transparent 74%)',
    bottom: 'radial-gradient(70% 100% at 50% 100%, hsl(var(--primary) / 0.08), transparent 76%)',
    divider: 'linear-gradient(90deg, transparent, hsl(var(--secondary) / 0.18), hsl(var(--foreground) / 0.12), transparent)',
  },
  neutral: {
    top: 'radial-gradient(70% 100% at 50% 0%, hsl(var(--foreground) / 0.06), transparent 74%)',
    bottom: 'radial-gradient(70% 100% at 50% 100%, hsl(var(--foreground) / 0.04), transparent 76%)',
    divider: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.14), transparent)',
  },
};

const SectionTransition = ({ children, className = '', tone = 'primary' }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
  });

  const y = useTransform(easedProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [36, 0, -18]);
  const scale = useTransform(easedProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.985, 1, 0.992]);
  const overlayOpacity = useTransform(easedProgress, [0, 0.22, 0.78, 1], [0, 0.55, 0.48, 0]);
  const dividerScaleX = useTransform(easedProgress, [0, 0.4, 0.85], [0.52, 1, 0.68]);
  const blurOpacity = useTransform(easedProgress, [0, 0.3, 0.8, 1], [0, 0.26, 0.18, 0]);

  const toneConfig = toneMap[tone];

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={reduceMotion ? undefined : { y, scale, willChange: 'transform' }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-20 h-28"
        style={{ opacity: overlayOpacity, background: toneConfig.top }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-20 h-28"
        style={{ opacity: overlayOpacity, background: toneConfig.bottom }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-0 hidden md:block"
        style={{ opacity: blurOpacity }}
      >
        <motion.div
          className="h-px origin-center"
          style={{
            scaleX: dividerScaleX,
            background: toneConfig.divider,
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2"
          style={{
            background:
              'linear-gradient(180deg, hsl(var(--secondary) / 0.28), hsl(var(--foreground) / 0.04), transparent)',
          }}
        />
        <motion.div
          className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-secondary/18 bg-background/70 shadow-[0_0_22px_hsl(var(--secondary)/0.18)] backdrop-blur-sm"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.22, 1],
                  opacity: [0.42, 0.72, 0.42],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 6.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] inset-y-[18%] rounded-[2.5rem] blur-3xl"
        style={{
          opacity: blurOpacity,
          background:
            'radial-gradient(70% 58% at 50% 50%, hsl(var(--background) / 0.36), transparent 72%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default SectionTransition;
