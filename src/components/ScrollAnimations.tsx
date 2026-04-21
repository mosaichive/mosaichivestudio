
import { useEffect } from 'react';

const ScrollAnimations = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('[data-animate]');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.85) {
          element.classList.add('animated');
        }
      });
    };
    
    // Initial check
    setTimeout(animateElements, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', animateElements);
    
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return null;
};

export default ScrollAnimations;
