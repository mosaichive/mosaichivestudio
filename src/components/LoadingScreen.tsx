
import React, { useEffect, useState } from 'react';
import logoImage from '@/assets/logo-loader.png';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Start fade out animation before hiding
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Remove loading screen after fade animation
    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500 ${
        fadeOut ? 'animate-fade-out-up opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <img 
          src={logoImage} 
          alt="Mosaic06 Studio Logo" 
          className="w-64 h-auto object-contain"
        />
      </div>
      <p className="text-muted-foreground mt-6 text-sm">loading creative solutions...</p>
      
      {/* Progress Bar with Percentage */}
      <div className="flex items-center gap-3 mt-4">
        <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: '#D4AF37'
            }}
          />
        </div>
        <span className="text-sm font-medium text-muted-foreground w-10">{progress}%</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
