
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-mosaic-primary to-mosaic-secondary opacity-95 z-0"></div>
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-animate="fade-up">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-white/90 mb-8 text-lg" data-animate="fade-up">
            Let's collaborate to create a tailored digital strategy that aligns with your business goals and drives measurable results.
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-animate="fade-up">
            <Button className="bg-white text-mosaic-primary hover:bg-white/90 px-6 py-3 text-base font-medium">
              Schedule a Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 text-base font-medium">
              Explore Services <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
