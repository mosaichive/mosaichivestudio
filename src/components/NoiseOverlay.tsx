import React from 'react';

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

const NoiseOverlay = ({ opacity = 0.045, className = '' }: NoiseOverlayProps) => {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 mix-blend-soft-light ${className}`}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.85'/%3E%3C/svg%3E\")",
        backgroundSize: '220px 220px',
      }}
    />
  );
};

export default NoiseOverlay;
