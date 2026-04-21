
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-mosaic-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-mosaic-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
          <p className="text-mosaic-secondary font-medium mb-3">Contact Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-foreground/70">
            Ready to elevate your brand with stunning designs, compelling videos, or strategic marketing? Get in touch with our creative team to start your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" data-animate="fade-up">
          {/* Contact Form */}
          <div className="bg-white dark:bg-mosaic-dark/30 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium">
                  Service Interested In
                </label>
                <select id="service" className="w-full px-3 py-2 border border-input bg-background rounded-md">
                  <option value="">Select a service</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="photography">Photography</option>
                  <option value="motion-graphics">Motion Graphics</option>
                  <option value="brand-identity">Brand Identity</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Project Details
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project needs and timeline..." 
                  rows={5}
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-mosaic-primary to-mosaic-secondary hover:from-mosaic-primary/90 hover:to-mosaic-secondary/90">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-mosaic-dark/30 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-mosaic-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-mosaic-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href="mailto:info@mosaic06studio.com" className="text-mosaic-secondary hover:underline">
                      info@mosaic06studio.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-mosaic-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-mosaic-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a href="tel:+233202985474" className="text-mosaic-secondary hover:underline">
                      +233 20 298 5474
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-mosaic-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-mosaic-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-foreground/80">
                      123 Marketing Street, East Legon,<br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-mosaic-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-mosaic-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Studio Hours</p>
                    <p className="text-foreground/80">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 2pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
