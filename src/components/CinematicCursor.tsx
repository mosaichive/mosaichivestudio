import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type CursorStyle = 'default' | 'button' | 'project' | 'text' | 'hidden';

interface CursorState {
  style: CursorStyle;
  label: string;
  visible: boolean;
  active: boolean;
  magnetic: boolean;
  rect: DOMRect | null;
}

const DEFAULT_STATE: CursorState = {
  style: 'default',
  label: '',
  visible: false,
  active: false,
  magnetic: false,
  rect: null,
};

const CinematicCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>(DEFAULT_STATE);
  const lastSignature = useRef('');

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 420, damping: 32, mass: 0.22 });
  const y = useSpring(targetY, { stiffness: 420, damping: 32, mass: 0.22 });
  const trailX = useSpring(targetX, { stiffness: 170, damping: 26, mass: 0.8 });
  const trailY = useSpring(targetY, { stiffness: 170, damping: 26, mass: 0.8 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const nextEnabled = finePointerQuery.matches && hoverQuery.matches && !reduceMotionQuery.matches;
      setEnabled(nextEnabled);
      document.documentElement.classList.toggle('has-cinematic-cursor', nextEnabled);
    };

    update();
    finePointerQuery.addEventListener('change', update);
    hoverQuery.addEventListener('change', update);
    reduceMotionQuery.addEventListener('change', update);

    return () => {
      document.documentElement.classList.remove('has-cinematic-cursor');
      finePointerQuery.removeEventListener('change', update);
      hoverQuery.removeEventListener('change', update);
      reduceMotionQuery.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setState(DEFAULT_STATE);
      return;
    }

    const resolveTargetState = (target: EventTarget | null): CursorState => {
      const element = target instanceof Element ? target : null;
      if (!element) return { ...DEFAULT_STATE, visible: true };

      const nativeCursorTarget = element.closest('input, textarea, select, option, iframe, video, [contenteditable="true"], [data-native-cursor]');
      if (nativeCursorTarget) {
        return { style: 'hidden', label: '', visible: false, active: false, magnetic: false, rect: null };
      }

      const interactive = element.closest<HTMLElement>('[data-cursor-style], [data-cursor-label], a, button, [role="button"]');
      if (!interactive) return { ...DEFAULT_STATE, visible: true };

      const style = (interactive.dataset.cursorStyle as CursorStyle | undefined) ??
        (interactive.matches('button, [role="button"]') ? 'button' : 'default');

      return {
        style,
        label: interactive.dataset.cursorLabel ?? '',
        visible: true,
        active: true,
        magnetic: interactive.dataset.cursorMagnetic === 'true' || interactive.hasAttribute('data-magnetic'),
        rect: interactive.getBoundingClientRect(),
      };
    };

    const applyPointer = (event: PointerEvent) => {
      const nextState = resolveTargetState(event.target);
      const pointerX = event.clientX;
      const pointerY = event.clientY;
      const centerX = nextState.magnetic && nextState.rect ? nextState.rect.left + nextState.rect.width / 2 : pointerX;
      const centerY = nextState.magnetic && nextState.rect ? nextState.rect.top + nextState.rect.height / 2 : pointerY;
      const nextX = nextState.magnetic ? pointerX + (centerX - pointerX) * 0.28 : pointerX;
      const nextY = nextState.magnetic ? pointerY + (centerY - pointerY) * 0.28 : pointerY;

      targetX.set(nextX);
      targetY.set(nextY);

      const signature = `${nextState.style}|${nextState.label}|${nextState.visible}|${nextState.active}|${nextState.magnetic}`;
      if (signature !== lastSignature.current) {
        lastSignature.current = signature;
        setState(nextState);
      }
    };

    const hideCursor = () => {
      lastSignature.current = '';
      setState(DEFAULT_STATE);
    };

    window.addEventListener('pointermove', applyPointer, { passive: true });
    window.addEventListener('pointerdown', applyPointer, { passive: true });
    window.addEventListener('pointerleave', hideCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      window.removeEventListener('pointermove', applyPointer);
      window.removeEventListener('pointerdown', applyPointer);
      window.removeEventListener('pointerleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
    };
  }, [enabled, targetX, targetY]);

  if (!enabled) return null;

  const scale =
    state.style === 'project'
      ? 2.8
      : state.style === 'button'
        ? 2
        : state.style === 'text'
          ? 0.25
          : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <motion.div
        className="absolute h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.24),transparent_68%)] blur-2xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'screen',
          opacity: state.visible ? 0.55 : 0,
          willChange: 'transform, opacity',
        }}
      />

      <motion.div
        className="absolute h-3 w-3 rounded-full bg-foreground dark:bg-white"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
          opacity: state.visible && state.style !== 'hidden' ? 1 : 0,
          willChange: 'transform, opacity',
        }}
      />

      <motion.div
        className="absolute rounded-full border border-white/85"
        style={{
          x,
          y,
          width: 26,
          height: 26,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
          opacity: state.visible && state.style !== 'hidden' ? 0.96 : 0,
          willChange: 'transform, opacity',
        }}
        animate={{
          scale,
          borderColor: state.style === 'project' ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.82)',
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence>
        {state.label && state.visible && state.style !== 'hidden' ? (
          <motion.div
            key={state.label}
            className="absolute"
            style={{
              x,
              y,
              translateX: '-50%',
              translateY: '-50%',
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -34, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex min-w-[6rem] justify-center rounded-full border border-white/18 bg-background/58 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-foreground shadow-[0_14px_36px_-24px_hsl(var(--foreground)/0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-black/28 dark:text-white">
              {state.label}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default CinematicCursor;
