import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useStudioContent';

const useCountUp = (end: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return count;
};

const StatItem = ({ end, suffix, label, started }: { end: number; suffix: string; label: string; started: boolean }) => {
  const value = useCountUp(end, 2000, started);
  return (
    <div className="border-l border-border pl-6 md:pl-8">
      <div className="font-display text-5xl md:text-6xl text-foreground tracking-tight">
        {value}
        <span className="text-secondary">{suffix}</span>
      </div>
      <p className="mt-3 text-sm text-foreground/60 uppercase tracking-[0.18em]">{label}</p>
    </div>
  );
};

const Counters = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { data: settings } = useSiteSettings();

  const stats = [
    { end: settings?.counter_projects ?? 240, suffix: '+', label: 'Projects Completed' },
    { end: settings?.counter_clients ?? 180, suffix: '+', label: 'Happy Clients' },
    { end: settings?.counter_years ?? 10, suffix: '+', label: 'Years of Practice' },
    { end: settings?.counter_brands ?? 32, suffix: '', label: 'Brands Served' },
  ];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-muted/40 border-y border-border">
      <div className="container-editorial">
        <motion.p
          className="eyebrow mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          By the Numbers
        </motion.p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
