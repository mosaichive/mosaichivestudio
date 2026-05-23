import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GradientOrbProps {
  className?: string;
  size: string;
  gradient: string;
  blur?: number;
  opacity?: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
  duration?: number;
  delay?: number;
  driftX?: number;
  driftY?: number;
  scale?: number;
}

const GradientOrb = ({
  className = '',
  size,
  gradient,
  blur = 72,
  opacity = 0.26,
  blendMode = 'screen',
  duration = 18,
  delay = 0,
  driftX = 18,
  driftY = 22,
  scale = 1.08,
}: GradientOrbProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        filter: `blur(${blur}px)`,
        background: gradient,
        mixBlendMode: blendMode,
        willChange: 'transform, opacity',
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, driftX, -driftX * 0.72, 0],
              y: [0, -driftY, driftY * 0.62, 0],
              scale: [1, scale, 0.97, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    />
  );
};

export default GradientOrb;
