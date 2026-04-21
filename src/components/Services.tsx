
import React from 'react';
import { ArrowRight, PenTool, Video, ChartBar, Camera, Monitor, LayoutTemplate } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="w-12 h-12 mb-6" />,
    title: 'Graphic Design',
    description: "Create stunning visual assets that capture your brand essence with our expert design team.",
    link: '/services/graphic-design',
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    accentColor: 'text-purple-400',
    bgPattern: 'bg-gradient-to-br'
  },
  {
    icon: <Video className="w-12 h-12 mb-6" />,
    title: 'Video Editing',
    description: 'Transform raw footage into compelling stories with professional editing and post-production.',
    link: '/services/video-editing',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    accentColor: 'text-cyan-400',
    bgPattern: 'bg-gradient-to-br'
  },
  {
    icon: <ChartBar className="w-12 h-12 mb-6" />,
    title: 'Digital Marketing',
    description: 'Drive growth with data-driven marketing strategies tailored to your business objectives.',
    link: '/services/digital-marketing',
    gradient: 'from-emerald-500/20 via-green-500/20 to-lime-500/20',
    accentColor: 'text-emerald-400',
    bgPattern: 'bg-gradient-to-br'
  },
  {
    icon: <Camera className="w-12 h-12 mb-6" />,
    title: 'Photography',
    description: 'Capture the perfect images for your brand with our professional photography services.',
    link: '/services/photography',
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    accentColor: 'text-orange-400',
    bgPattern: 'bg-gradient-to-br'
  },
  {
    icon: <Monitor className="w-12 h-12 mb-6" />,
    title: 'Motion Graphics',
    description: 'Add movement and energy to your brand with eye-catching motion graphics and animations.',
    link: '/services/motion-graphics',
    gradient: 'from-indigo-500/20 via-violet-500/20 to-purple-500/20',
    accentColor: 'text-indigo-400',
    bgPattern: 'bg-gradient-to-br'
  },
  {
    icon: <LayoutTemplate className="w-12 h-12 mb-6" />,
    title: 'Brand Identity',
    description: 'Build a cohesive and memorable brand with our comprehensive identity design services.',
    link: '/services/brand-identity',
    gradient: 'from-fuchsia-500/20 via-pink-500/20 to-rose-500/20',
    accentColor: 'text-fuchsia-400',
    bgPattern: 'bg-gradient-to-br'
  }
];

const Services = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#111111]" id="services">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-mosaic-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-mosaic-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
          <p className="text-mosaic-secondary uppercase tracking-widest text-sm font-semibold mb-3">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Creative Solutions for Your Business
          </h2>
          <p className="text-gray-400">
            We offer a full spectrum of creative services to help your business stand out in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate="fade-up">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card group relative rounded-xl overflow-hidden border border-[#222222] hover:border-opacity-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${service.bgPattern} ${service.gradient}`}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 group-hover:from-black/20 group-hover:via-black/40 group-hover:to-black/60 transition-all duration-500"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500"></div>
              
              <div className="relative p-8 z-10">
                {React.cloneElement(service.icon, { className: `w-12 h-12 mb-6 ${service.accentColor} group-hover:scale-110 transition-transform duration-300` })}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">{service.description}</p>
                <a 
                  href={service.link} 
                  className={`inline-flex items-center ${service.accentColor} font-medium group-hover:gap-3 transition-all duration-300`}
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
