import React, { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import GradientOrb from './GradientOrb';
import MouseParallaxLayer from './MouseParallaxLayer';
import NoiseOverlay from './NoiseOverlay';

const AmbientBackground = () => {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const driftX = useSpring(mouseX, { stiffness: 24, damping: 20, mass: 1.1 });
  const driftY = useSpring(mouseY, { stiffness: 24, damping: 20, mass: 1.1 });

  useEffect(() => {
    if (reduceMotion) return;

    const updatePointer = (event: PointerEvent) => {
      const nextX = event.clientX / window.innerWidth - 0.5;
      const nextY = event.clientY / window.innerHeight - 0.5;
      mouseX.set(nextX);
      mouseY.set(nextY);
    };

    const resetPointer = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer);

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', resetPointer);
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          x: driftX,
          y: driftY,
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_0%,hsl(var(--primary)/0.11),transparent_55%),radial-gradient(110%_90%_at_8%_12%,hsl(var(--secondary)/0.1),transparent_44%),radial-gradient(95%_85%_at_90%_18%,hsl(var(--primary)/0.09),transparent_40%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))] dark:bg-[radial-gradient(120%_90%_at_50%_0%,hsl(var(--secondary)/0.08),transparent_50%),radial-gradient(120%_95%_at_12%_10%,hsl(var(--primary)/0.2),transparent_42%),radial-gradient(95%_80%_at_88%_18%,hsl(var(--secondary)/0.1),transparent_38%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))]" />
      </motion.div>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={18}>
        <motion.div
          className="absolute left-[-14%] top-[8%] h-[32rem] w-[38rem] rounded-full"
          style={{
            background:
              'conic-gradient(from 140deg at 50% 50%, hsl(var(--primary) / 0.18), transparent 35%, hsl(var(--secondary) / 0.14) 62%, transparent 86%)',
            filter: 'blur(96px)',
            mixBlendMode: 'multiply',
            opacity: 0.38,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [0, 18, -10, 0],
                  scale: [1, 1.04, 0.98, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 26,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />

        <motion.div
          className="absolute right-[-16%] top-[18%] h-[30rem] w-[36rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 32%, hsl(var(--secondary) / 0.16), transparent 34%), linear-gradient(145deg, hsl(var(--primary) / 0.14), transparent 68%)',
            filter: 'blur(94px)',
            mixBlendMode: 'screen',
            opacity: 0.42,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [0, -16, 12, 0],
                  scale: [1, 1.05, 0.97, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 30,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </MouseParallaxLayer>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={32}>
        <GradientOrb
          className="left-[-8rem] top-[4rem]"
          size="28rem"
          gradient="radial-gradient(circle at 35% 35%, hsl(var(--secondary) / 0.35), transparent 68%)"
          blur={82}
          opacity={0.22}
          blendMode="screen"
          duration={20}
          driftX={22}
          driftY={26}
        />
        <GradientOrb
          className="right-[-10rem] top-[32%]"
          size="31rem"
          gradient="radial-gradient(circle at 48% 46%, hsl(var(--primary) / 0.28), transparent 70%)"
          blur={88}
          opacity={0.18}
          blendMode="multiply"
          duration={22}
          delay={1.5}
          driftX={26}
          driftY={18}
        />
        <GradientOrb
          className="bottom-[-8rem] left-[26%]"
          size="23rem"
          gradient="radial-gradient(circle at 50% 50%, hsl(var(--secondary) / 0.2), transparent 72%)"
          blur={74}
          opacity={0.16}
          blendMode="soft-light"
          duration={18}
          delay={0.7}
          driftX={18}
          driftY={20}
        />
      </MouseParallaxLayer>

      <MouseParallaxLayer mouseX={mouseX} mouseY={mouseY} depth={14}>
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(to right, hsl(var(--foreground) / 0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.08) 1px, transparent 1px)',
            backgroundSize: '7.5rem 7.5rem',
            maskImage: 'radial-gradient(circle at center, black 18%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 18%, transparent 72%)',
            mixBlendMode: 'multiply',
            willChange: 'transform',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 20, 0],
                  y: [0, 14, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 24,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        />
      </MouseParallaxLayer>

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 52% at 50% 16%, hsl(var(--background) / 0.12), transparent 70%), radial-gradient(60% 48% at 50% 100%, hsl(var(--primary) / 0.08), transparent 72%)',
          mixBlendMode: 'soft-light',
          willChange: 'transform, opacity',
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.58, 0.72, 0.6, 0.58],
                scale: [1, 1.02, 0.995, 1],
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,hsl(var(--background)/0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_34%,hsl(var(--background)/0.48)_100%)]" />
      <NoiseOverlay className="opacity-[0.9]" />
    </div>
  );
};

export default AmbientBackground;
