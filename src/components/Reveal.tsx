import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Tag = 'div' | 'section' | 'article' | 'header' | 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'span' | 'ul';
type RevealMode = 'fade-up' | 'scale-in' | 'blur-up' | 'text';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: Tag;
  once?: boolean;
  amount?: number;
  margin?: string;
  mode?: RevealMode;
};

const buildVariants = (
  reduceMotion: boolean,
  mode: RevealMode,
  y: number,
  duration: number,
  delay: number,
): Variants => {
  const hiddenBase = reduceMotion ? {} : { opacity: 0 };

  const hidden =
    mode === 'scale-in'
      ? { ...hiddenBase, scale: reduceMotion ? 1 : 0.965, y: reduceMotion ? 0 : y * 0.45 }
      : mode === 'blur-up'
        ? { ...hiddenBase, y: reduceMotion ? 0 : y, filter: reduceMotion ? 'blur(0px)' : 'blur(12px)' }
        : mode === 'text'
          ? {
              ...hiddenBase,
              y: reduceMotion ? 0 : y,
              filter: reduceMotion ? 'blur(0px)' : 'blur(14px)',
              clipPath: reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
            }
          : { ...hiddenBase, y: reduceMotion ? 0 : y };

  const show =
    mode === 'scale-in'
      ? {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: reduceMotion ? 0 : duration, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : delay },
        }
      : mode === 'blur-up'
        ? {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: reduceMotion ? 0 : duration, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : delay },
          }
        : mode === 'text'
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              clipPath: 'inset(0% 0% 0% 0%)',
              transition: { duration: reduceMotion ? 0 : duration, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : delay },
            }
          : {
              opacity: 1,
              y: 0,
              transition: { duration: reduceMotion ? 0 : duration, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : delay },
            };

  return { hidden, show };
};

const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
  as = 'div',
  once = true,
  amount = 0.2,
  margin = '0px 0px -10% 0px',
  mode = 'fade-up',
}) => {
  const reduceMotion = useReducedMotion();
  const variants = buildVariants(reduceMotion, mode, y, duration, delay);
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: Tag;
  once?: boolean;
  amount?: number;
  margin?: string;
  y?: number;
  duration?: number;
  mode?: RevealMode;
};

const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  as = 'div',
  once = true,
  amount = 0.15,
  margin = '0px 0px -8% 0px',
  y = 28,
  duration = 0.6,
  mode = 'fade-up',
}) => {
  const reduceMotion = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : delayChildren,
      },
    },
  };
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin }}
      variants={container}
      data-reveal-y={y}
      data-reveal-duration={duration}
      data-reveal-mode={mode}
    >
      {children}
    </MotionTag>
  );
};

type ItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  duration?: number;
  mode?: RevealMode;
};

const Item: React.FC<ItemProps> = ({
  children,
  className,
  as = 'div',
  y = 28,
  duration = 0.6,
  mode = 'fade-up',
}) => {
  const reduceMotion = useReducedMotion();
  const variants = buildVariants(reduceMotion, mode, y, duration, 0);
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
