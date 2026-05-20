import React from 'react';
import { useReducedMotion } from 'framer-motion';

const PublicAmbientMotion = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className={`ambient-orb ambient-orb-one ${reduceMotion ? '' : 'ambient-animate-one'}`} />
      <div className={`ambient-orb ambient-orb-two ${reduceMotion ? '' : 'ambient-animate-two'}`} />
      <div className={`ambient-orb ambient-orb-three ${reduceMotion ? '' : 'ambient-animate-three'}`} />
      <div className={`ambient-grid ${reduceMotion ? '' : 'ambient-grid-animate'}`} />
      <div className={`ambient-sheen ${reduceMotion ? '' : 'ambient-sheen-animate'}`} />
    </div>
  );
};

export default PublicAmbientMotion;
