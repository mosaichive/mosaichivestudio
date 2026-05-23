import React from 'react';
import { MotionValue, motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';

interface MouseParallaxLayerProps {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth?: number;
  className?: string;
}

const MouseParallaxLayer = ({
  children,
  mouseX,
  mouseY,
  depth = 26,
  className = '',
}: MouseParallaxLayerProps) => {
  const reduceMotion = useReducedMotion();
  const rawX = useTransform(mouseX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-depth, depth]);
  const rawY = useTransform(mouseY, [-0.5, 0.5], reduceMotion ? [0, 0] : [-depth, depth]);
  const x = useSpring(rawX, { stiffness: 36, damping: 18, mass: 0.9 });
  const y = useSpring(rawY, { stiffness: 36, damping: 18, mass: 0.9 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], reduceMotion ? [0, 0] : [depth * 0.18, -depth * 0.18]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-depth * 0.18, depth * 0.18]);

  return (
    <motion.div
      aria-hidden
      className={`absolute inset-0 ${className}`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformPerspective: 1400,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

export default MouseParallaxLayer;
