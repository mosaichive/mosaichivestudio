import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import brandingImage from '@/assets/branding-strategy.jpg';
import customerExperienceImage from '@/assets/customer-experience.jpg';
import businessPersonImage from '@/assets/business-person.jpg';
import logoAnimation from '@/assets/logo-animation.mp4';

const slides = [
  {
    id: 1,
    title: "Digital Marketing Excellence",
    subtitle: "Reach your target audience with data-driven strategies",
    cta: "Learn More",
    ctaLink: "/services",
    bgGradient: "from-primary/60 to-secondary/60",
    bgImage: customerExperienceImage,
    bgType: 'image'
  },
  {
    id: 2,
    title: "Transform Your Brand Identity",
    subtitle: "Creative solutions that make your business stand out",
    cta: "Get Started",
    ctaLink: "/get-started",
    bgGradient: "from-secondary/60 to-primary/60",
    bgImage: brandingImage,
    bgType: 'image'
  },
  {
    id: 3,
    title: "Build Your Online Presence",
    subtitle: "Modern websites and applications that drive results",
    cta: "View Portfolio",
    ctaLink: "/portfolio",
    bgGradient: "from-primary/60 to-accent/60",
    bgImage: businessPersonImage,
    bgType: 'image'
  },
  {
    id: 4,
    title: "Creativity in Motion",
    subtitle: "Where imagination meets innovation",
    cta: "Discover More",
    ctaLink: "/about",
    bgGradient: "from-primary/70 to-secondary/70",
    bgVideo: logoAnimation,
    bgType: 'video'
  }
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-background">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Background Media */}
              {slide.bgType === 'video' ? (
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={slide.bgVideo} type="video/mp4" />
                </video>
              ) : (
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.bgImage})` }}
                />
              )}
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slide.bgGradient}`} />
              
              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <AnimatePresence mode="wait">
                  {index === currentSlide && (
                    <>
                      <motion.h2 
                        key={`title-${slide.id}`}
                        className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        {slide.title.split(' ').map((word, wordIndex) => (
                          <motion.span
                            key={wordIndex}
                            className="inline-block mr-3"
                            initial={{ opacity: 0, y: 30, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: wordIndex * 0.1,
                              ease: "easeOut"
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.h2>
                      <motion.p 
                        key={`subtitle-${slide.id}`}
                        className="text-xl md:text-2xl mb-8 drop-shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.div
                        key={`cta-${slide.id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                      >
                        <Button
                          size="lg"
                          variant="secondary"
                          className="hover-scale"
                          onClick={() => window.location.href = slide.ctaLink}
                        >
                          {slide.cta}
                        </Button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
