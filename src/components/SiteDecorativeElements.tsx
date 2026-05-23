import React, { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import MouseParallaxLayer from './MouseParallaxLayer';

interface AnimatedPathAccentProps {
  className?: string;
  viewBox: string;
  primaryPath: string;
  secondaryPath?: string;
  duration?: number;
  delay?: number;
  opacity?: number;
}

const AnimatedPathAccent = ({
  className = '',
  viewBox,
  primaryPath,
  secondaryPath,
  duration = 18,
  delay = 0,
  opacity = 0.34,
}: AnimatedPathAccentProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      viewBox={viewBox}
      className={`absolute ${className}`}
      style={{ opacity, overflow: 'visible', willChange: 'transform, opacity', mixBlendMode: 'screen' }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -8, 0],
              rotate: [0, 1.5, -0.8, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: duration + 8,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      <motion.path
        d={primaryPath}
        fill="none"
        stroke="hsl(var(--foreground) / 0.16)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10 18"
        initial={reduceMotion ? false : { pathLength: 0.9, opacity: 0.14, strokeDashoffset: 0 }}
        animate={
          reduceMotion
            ? { opacity: 0.22 }
            : {
                pathLength: [0.82, 1, 0.88],
                opacity: [0.12, 0.34, 0.18],
                strokeDashoffset: [0, -36, -72],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0.3 }
            : {
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
              }
        }
      />

      {secondaryPath ? (
        <motion.path
          d={secondaryPath}
          fill="none"
          stroke="hsl(var(--secondary) / 0.22)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 14"
          initial={reduceMotion ? false : { opacity: 0.12, strokeDashoffset: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.16 }
              : {
                  opacity: [0.1, 0.26, 0.14],
                  strokeDashoffset: [0, 18, 36],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.3 }
              : {
                  duration: duration - 2,
                  delay: delay + 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        />
      ) : null}
    </motion.svg>
  );
};

interface OrbitalAccentProps {
  className?: string;
  size?: string;
  duration?: number;
  delay?: number;
  opacity?: number;
}

const OrbitalAccent = ({
  className = '',
  size = '14rem',
  duration = 24,
  delay = 0,
  opacity = 0.34,
}: OrbitalAccentProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`absolute ${className}`}
      style={{ width: size, height: size, opacity, willChange: 'transform' }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: duration + 10,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      <div className="absolute inset-0 rounded-full border border-foreground/10" />
      <div className="absolute inset-[11%] rounded-full border border-secondary/18" />
      <div className="absolute inset-[26%] rounded-full border border-foreground/8" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/55 shadow-[0_0_24px_hsl(var(--secondary)/0.4)]" />

      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
              }
        }
      >
        <span className="absolute left-1/2 top-[-0.3rem] h-3 w-3 -translate-x-1/2 rounded-full border border-secondary/35 bg-background/70 shadow-[0_0_18px_hsl(var(--secondary)/0.28)] backdrop-blur-sm" />
        <span className="absolute bottom-[14%] right-[10%] h-2.5 w-2.5 rotate-45 border border-foreground/18 bg-background/55 backdrop-blur-sm" />
      </motion.div>
    </motion.div>
  );
};

interface WireframeAccentProps {
  className?: string;
  duration?: number;
  delay?: number;
  opacity?: number;
}

const WireframeAccent = ({
  className = '',
  duration = 26,
  delay = 0,
  opacity = 0.3,
}: WireframeAccentProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`absolute ${className}`}
      style={{ willChange: 'transform, opacity', opacity, mixBlendMode: 'screen' }}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: [0, 360],
              scale: [1, 1.03, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }
      }
    >
      <svg viewBox="0 0 160 160" className="h-full w-full overflow-visible">
        <polygon
          points="80,14 130,42 130,98 80,126 30,98 30,42"
          fill="none"
          stroke="hsl(var(--foreground) / 0.16)"
          strokeWidth="1.2"
        />
        <polygon
          points="80,34 112,52 112,88 80,106 48,88 48,52"
          fill="none"
          stroke="hsl(var(--secondary) / 0.18)"
          strokeWidth="1"
        />
        <line x1="80" y1="14" x2="80" y2="34" stroke="hsl(var(--foreground) / 0.14)" strokeWidth="1" />
        <line x1="130" y1="42" x2="112" y2="52" stroke="hsl(var(--foreground) / 0.14)" strokeWidth="1" />
        <line x1="130" y1="98" x2="112" y2="88" stroke="hsl(var(--foreground) / 0.14)" strokeWidth="1" />
        <line x1="80" y1="126" x2="80" y2="106" stroke="hsl(var(--foreground) / 0.14)" strokeWidth="1" />
        <line x1="30" y1="98" x2="48" y2="88" stroke="hsl(var(--foreground) / 0.14)" strokeWidth="1" />
        <line x1="30" y1="42" x2="48" y2="52" stroke="hsl(var(--foreground) / 0.14)" strokeWidth="1" />
        <circle cx="80" cy="14" r="2" fill="hsl(var(--secondary) / 0.5)" />
        <circle cx="130" cy="42" r="2" fill="hsl(var(--foreground) / 0.2)" />
        <circle cx="130" cy="98" r="2" fill="hsl(var(--foreground) / 0.2)" />
      </svg>
    </motion.div>
  );
};

const SiteDecorativeElements = () => {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    const resetPointer = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', resetPointer);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', resetPointer);
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={8} className="hidden lg:block">
        <motion.div
          className="absolute left-[-4%] top-[10%] h-[16rem] w-[16rem] rounded-[40%]"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, hsl(var(--secondary) / 0.18), transparent 68%)',
            filter: 'blur(72px)',
            opacity: 0.22,
            mixBlendMode: 'screen',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 12, 0],
                  y: [0, -8, 0],
                  scale: [1, 1.06, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 22,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />

        <AnimatedPathAccent
          className="left-[2%] top-[11%] h-[11rem] w-[18rem]"
          viewBox="0 0 320 220"
          primaryPath="M12 162C62 108 96 76 156 74C214 72 232 118 282 116C300 116 312 110 318 102"
          secondaryPath="M22 188C84 146 118 138 166 138C218 138 248 154 300 144"
          duration={20}
          opacity={0.24}
        />
      </MouseParallaxLayer>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={11} className="hidden xl:block">
        <OrbitalAccent className="right-[5%] top-[22%]" size="12rem" duration={24} opacity={0.26} />
        <motion.div
          className="absolute right-[14%] top-[30%] h-[8rem] w-[8rem] rounded-full border border-secondary/14"
          style={{
            boxShadow: '0 0 80px hsl(var(--secondary) / 0.12)',
            willChange: 'transform, opacity',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 0.98, 1],
                  opacity: [0.14, 0.24, 0.16],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </MouseParallaxLayer>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={9}>
        <div className="absolute left-[4%] top-[42%] hidden lg:block">
          <motion.div
            className="absolute left-0 top-0 h-14 w-14 rotate-12 rounded-[1.4rem] border border-foreground/10 bg-background/18 backdrop-blur-md"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                    rotate: [12, 20, 12],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 16,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
          <motion.div
            className="absolute left-14 top-12 h-10 w-10 rotate-45 rounded-[0.9rem] border border-secondary/16 bg-secondary/8 backdrop-blur-sm"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 8, 0],
                    rotate: [45, 54, 45],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
          <motion.div
            className="absolute left-28 top-4 h-3 w-3 rounded-full bg-secondary/40 shadow-[0_0_22px_hsl(var(--secondary)/0.22)]"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.16, 0.38, 0.2],
                    scale: [1, 1.2, 1],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        </div>

        <motion.svg
          className="absolute right-[4%] top-[52%] hidden h-[10rem] w-[20rem] lg:block"
          viewBox="0 0 360 180"
          fill="none"
          style={{ opacity: 0.22, mixBlendMode: 'screen', overflow: 'visible' }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <motion.path
            d="M18 128H116L156 76H238L282 112H342"
            stroke="hsl(var(--foreground) / 0.16)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="6 18"
            animate={
              reduceMotion
                ? undefined
                : {
                    strokeDashoffset: [0, -40, -80],
                    opacity: [0.12, 0.28, 0.14],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 16,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
          />
          <circle cx="116" cy="128" r="4" fill="hsl(var(--secondary) / 0.34)" />
          <circle cx="156" cy="76" r="4" fill="hsl(var(--foreground) / 0.16)" />
          <circle cx="238" cy="76" r="4" fill="hsl(var(--secondary) / 0.22)" />
          <circle cx="282" cy="112" r="4" fill="hsl(var(--foreground) / 0.16)" />
        </motion.svg>
      </MouseParallaxLayer>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={10} className="hidden lg:block">
        <motion.div
          className="absolute left-[10%] top-[68%] h-[18rem] w-[18rem] rounded-full"
          style={{
            background:
              'conic-gradient(from 160deg at 50% 50%, hsl(var(--primary) / 0.14), transparent 26%, hsl(var(--secondary) / 0.16) 52%, transparent 82%)',
            filter: 'blur(82px)',
            opacity: 0.24,
            mixBlendMode: 'multiply',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [0, -14, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 24,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
        <WireframeAccent className="left-[8%] top-[72%] h-[8.5rem] w-[8.5rem]" duration={28} opacity={0.24} />
      </MouseParallaxLayer>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={12} className="hidden xl:block">
        <AnimatedPathAccent
          className="right-[3%] top-[82%] h-[9rem] w-[18rem]"
          viewBox="0 0 320 180"
          primaryPath="M12 64C72 64 108 38 150 38C190 38 202 74 238 74C270 74 286 52 314 28"
          secondaryPath="M8 132C62 116 108 110 158 116C214 124 248 148 314 146"
          duration={22}
          delay={0.8}
          opacity={0.22}
        />
        <OrbitalAccent className="right-[11%] top-[88%]" size="10rem" duration={20} opacity={0.2} />
      </MouseParallaxLayer>
    </div>
  );
};

export default SiteDecorativeElements;
