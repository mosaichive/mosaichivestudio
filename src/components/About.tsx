
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import businessVideo from '@/assets/business-web.mp4';

// Custom TikTok icon (not in lucide)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom Behance icon (not in lucide)
const BehanceIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 2.211 1.712 3.065 3.326 3.065 1.619 0 2.395-.893 2.796-1.797l1.634.761zM19.97 12.5c-.083-1.465-.945-2.318-2.201-2.318-1.32 0-2.132.798-2.362 2.318h4.563zm-11.37-3.5H1v11h7.587c3.872 0 5.413-2.304 5.413-4.568 0-2.398-1.541-3.432-3.062-3.846 1.226-.426 2.352-1.412 2.352-3.165 0-2.396-1.686-4.421-5.69-4.421zm-.175 6.5H4v-2.727h4.425c1.179 0 2.064.599 2.064 1.386 0 .804-.689 1.341-2.064 1.341zm.193 4.5H4v-2.728h4.618c1.498 0 2.282.708 2.282 1.559 0 .991-.784 1.169-2.282 1.169z"/>
  </svg>
);

const About = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Video */}
          <div className="lg:w-1/2 relative" data-animate="fade-up">
            <div className="relative z-10 p-[3px] rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[length:200%_100%] animate-[gradient-x_3s_ease-in-out_infinite] shadow-[0_0_30px_rgba(251,191,36,0.4)]">
              <div className="rounded-2xl overflow-hidden bg-gray-900">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  <source src={businessVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center gap-4 mt-6">
              {[
                { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Instagram size={20} />, href: "https://instagram.com", label: "Instagram" },
                { icon: <Facebook size={20} />, href: "https://facebook.com", label: "Facebook" },
                { icon: <TikTokIcon size={20} />, href: "https://tiktok.com", label: "TikTok" },
                { icon: <Youtube size={20} />, href: "https://youtube.com", label: "YouTube" },
                { icon: <BehanceIcon size={20} />, href: "https://behance.net", label: "Behance" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-mosaic-secondary hover:text-white flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="absolute top-1/2 left-1/2 w-4/5 h-4/5 -z-10 bg-gray-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2" data-animate="fade-up">
            <p className="text-gray-600 font-medium mb-3">About Mosaic06 Studio</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Creative Excellence Since 2015
            </h2>
            <p className="text-gray-700 mb-6">
              Mosaic06 Studio is a creative powerhouse that combines artistic vision with technical expertise to deliver exceptional graphic design, video editing, and digital marketing services. Our team of passionate creatives is dedicated to transforming ideas into impactful visual experiences.
            </p>
            <p className="text-gray-700 mb-8">
              We believe that great design and compelling storytelling are the foundations of effective communication. Our collaborative approach ensures that every project reflects your unique brand voice while achieving your business objectives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "Award-Winning Designs",
                "Expert Video Production",
                "Strategic Marketing Approach",
                "End-to-End Creative Solutions",
                "Client-Focused Process",
                "Industry Experience"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-gray-600 flex-shrink-0" size={18} />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-gray-800 text-white hover:bg-gray-700">
                Our Process
              </Button>
              <Link to="/team">
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
