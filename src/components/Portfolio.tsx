import React from 'react';
import { Download } from 'lucide-react';
import portfolioImage from '@/assets/portfolio-showcase.png';
import portfolioBanner from '@/assets/portfolio-banner.jpg';

const Portfolio = () => {
  return (
    <section className="py-20" id="portfolio">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12" data-animate="fade-up">
          <p className="text-mosaic-secondary font-medium mb-3">Our Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Showcasing Our Digital Excellence
          </h2>
        </div>

        {/* Portfolio Banner */}
        <div className="max-w-6xl mx-auto mb-12" data-animate="fade-up">
          <img 
            src={portfolioBanner} 
            alt="Graphic Design Works - Mosaic Hive Portfolio Banner" 
            className="w-full rounded-lg shadow-xl"
          />
        </div>

        {/* Portfolio Showcase Image */}
        <div className="max-w-5xl mx-auto mb-12" data-animate="fade-up">
          <img 
            src={portfolioImage} 
            alt="Mosaic Communications Portfolio Showcase" 
            className="w-full rounded-lg shadow-xl"
          />
        </div>

        {/* Portfolio Description */}
        <div className="max-w-4xl mx-auto mb-8" data-animate="fade-up">
          <div className="prose prose-lg mx-auto text-foreground/80 space-y-4">
            <p>
              Mosaic06 Studio delivers exceptional creative solutions engineered to transform brands and captivate audiences. Our portfolio covers the full spectrum: graphic design, brand identity, video production, website development, and digital marketing.
            </p>
            <p>
              We drive measurable results for our clients by blending strategic thinking with artistic vision. Whether it's a corporate rebrand or a high-impact video campaign, our approach uses data-driven insights to create memorable, resonant experiences. Let us show you how we can help your brand achieve its business objectives through powerful visual communication.
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center" data-animate="fade-up">
          <a 
            href="https://drive.google.com/file/d/19UfbKql8YLyG9TS5TpBzSs0SMwqt2nov/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mosaic-primary text-white hover:bg-mosaic-primary/90 rounded-lg transition-colors duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            <Download size={24} />
            Download Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
