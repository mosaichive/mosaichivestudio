import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Tag = 'div' | 'section' | 'article' | 'header' | 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'span' | 'ul';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: Tag;
  once?: boolean;
};

/**
 * Single-element scroll reveal (fade + lift).
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
  as = 'div',
  once = true,
}) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : delay,
      },
    },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: '0px 0px -10% 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

/* ---------------- Stagger group ---------------- */

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Time between each child reveal (s). */
  stagger?: number;
  /** Delay before the first child reveals (s). */
  delayChildren?: number;
  as?: Tag;
  once?: boolean;
  /** Lift distance for child items (px). */
  y?: number;
  /** Per-child duration (s). */
  duration?: number;
};

/**
 * Wrap a list of items with `Reveal.Stagger` and use `Reveal.Item` for each child.
 * Children animate one after another as the group enters the viewport.
 */
const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  as = 'div',
  once = true,
  y = 28,
  duration = 0.6,
}) => {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15, margin: '0px 0px -8% 0px' }}
      variants={container}
      // Pass per-item config to children via context-less props on the container element.
      data-reveal-y={y}
      data-reveal-duration={duration}
    >
      {children}
    </MotionTag>
  );
};

type ItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  /** Override y for this single item. */
  y?: number;
  /** Override duration for this single item. */
  duration?: number;
};

const Item: React.FC<ItemProps> = ({ children, className, as = 'div', y = 28, duration = 0.6 }) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : duration, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
};

type RevealComponent = React.FC<RevealProps> & {
  Stagger: typeof Stagger;
  Item: typeof Item;
};

const RevealWithStagger = Reveal as RevealComponent;
RevealWithStagger.Stagger = Stagger;
RevealWithStagger.Item = Item;

export default RevealWithStagger;
