
import { useState, useEffect } from 'react';

interface UseNumberAnimationProps {
  end: number;
  duration?: number;
  delay?: number;
}

export const useNumberAnimation = ({ 
  end, 
  duration = 1500, 
  delay = 0 
}: UseNumberAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (!isAnimating) {
      timeout = setTimeout(() => {
        setIsAnimating(true);
        
        const start = 0;
        const startTime = performance.now();
        const updateCount = () => {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Use easeOutExpo for smoother animation at the end
          const easeOutExpo = 1 - Math.pow(2, -10 * progress);
          const nextCount = Math.floor(start + easeOutExpo * (end - start));
          
          setCount(nextCount);
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        };
        
        requestAnimationFrame(updateCount);
      }, delay);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [end, duration, delay, isAnimating]);

  return count;
};

export default useNumberAnimation;
