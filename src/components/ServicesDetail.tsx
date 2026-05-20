import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Users, ChartBar, ArrowRight, PenTool, Video, Camera, Monitor, LayoutTemplate } from 'lucide-react';

const servicesData = {
  "graphic-design": {
    title: 'Graphic Design',
    description: "Create stunning visual assets that capture your brand essence with our expert design team.",
    icon: <PenTool className="w-16 h-16 text-mosaic-accent" />,
    features: [
      'Brand Logo Design',
      'Print Materials',
      'Digital Assets',
      'Packaging Design',
      'Illustration',
      'Infographics',
      'Social Media Graphics',
      'Marketing Collateral'
    ],
    benefits: [
      'Enhanced Brand Recognition',
      'Consistent Visual Identity',
      'Improved User Engagement',
      'Professional Brand Image',
      'Effective Visual Communication',
      'Stand Out From Competitors'
    ],
    process: [
      { name: 'Consultation', description: 'We discuss your brand, goals, and vision to understand your design needs.' },
      { name: 'Concept', description: 'Our designers develop initial concepts based on our discovery findings.' },
      { name: 'Refinement', description: 'We revise and refine designs based on your feedback until perfect.' },
      { name: 'Finalization', description: 'Final designs are prepared in all required formats for various uses.' },
      { name: 'Support', description: 'Ongoing support and guidance for implementing your new design assets.' }
    ]
  },
  "video-editing": {
    title: 'Video Editing',
    description: "Transform raw footage into compelling stories with professional editing and post-production.",
    icon: <Video className="w-16 h-16 text-mosaic-accent" />,
    features: [
      'Professional Video Editing',
      'Color Grading',
      'Sound Design',
      'Motion Graphics',
      'Special Effects',
      'Promotional Videos',
      'Social Media Shorts',
      'Corporate Videos'
    ],
    benefits: [
      'Engaging Storytelling',
      'Professional Production Quality',
      'Enhanced Brand Messaging',
      'Increased Viewer Retention',
      'Cross-Platform Optimization',
      'Emotional Connection with Audience'
    ],
    process: [
      { name: 'Planning', description: 'We outline the vision, storyboard, and timeline for your video project.' },
      { name: 'Raw Review', description: 'Our editors review your footage and plan the editing approach.' },
      { name: 'Assembly', description: 'We create the first draft with basic cuts and sequence structure.' },
      { name: 'Enhancement', description: 'Adding effects, color grading, sound design, and graphics.' },
      { name: 'Final Delivery', description: 'Delivering the polished video in your required formats and resolutions.' }
    ]
  },
  "digital-marketing": {
    title: 'Digital Marketing',
    description: "Drive growth with data-driven marketing strategies tailored to your business objectives.",
    icon: <ChartBar className="w-16 h-16 text-mosaic-accent" />,
    features: [
      'Social Media Marketing',
      'Search Engine Optimization',
      'Pay-Per-Click Advertising',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
      'Conversion Optimization',
      'Marketing Automation'
    ],
    benefits: [
      'Increased Brand Visibility',
      'Higher Quality Leads',
      'Improved Conversion Rates',
      'Data-Driven Decision Making',
      'Better ROI on Marketing Spend',
      'Scalable Marketing Campaigns'
    ],
    process: [
      { name: 'Strategy', description: 'We develop a custom marketing plan aligned with your business goals.' },
      { name: 'Implementation', description: 'Our team executes the strategy across relevant channels.' },
      { name: 'Optimization', description: 'Continuous testing and refinement to improve performance.' },
      { name: 'Analysis', description: 'Regular reporting and insights on campaign performance.' },
      { name: 'Scaling', description: 'Expanding successful campaigns to maximize results.' }
    ]
  },
  "photography": {
    title: 'Photography',
    description: "Capture the perfect images for your brand with our professional photography services.",
    icon: <Camera className="w-16 h-16 text-mosaic-accent" />,
    features: [
      'Product Photography',
      'Corporate Portraits',
      'Event Coverage',
      'Lifestyle Shots',
      'Architecture & Interiors',
      'Food Photography',
      'Fashion & Apparel',
      'Stock Photography'
    ],
    benefits: [
      'High-Quality Visual Assets',
      'Consistent Brand Imagery',
      'Versatile Usage Rights',
      'Custom Shot Planning',
      'Professional Retouching',
      'Unique Visual Storytelling'
    ],
    process: [
      { name: 'Brief', description: 'We gather details about your photography needs and desired outcomes.' },
      { name: 'Planning', description: 'Our team plans the shoot including location, props, and shot list.' },
      { name: 'Production', description: 'Professional photographers capture images according to the plan.' },
      { name: 'Selection', description: 'You review and select the best images from the shoot.' },
      { name: 'Retouching', description: 'Final images are professionally retouched and delivered in various formats.' }
    ]
  },
  "motion-graphics": {
    title: 'Motion Graphics',
    description: "Add movement and energy to your brand with eye-catching motion graphics and animations.",
    icon: <Monitor className="w-16 h-16 text-mosaic-accent" />,
    features: [
      '2D Animation',
      '3D Animation',
      'Animated Logos',
      'Explainer Videos',
      'UI/UX Animations',
      'Title Sequences',
      'Animated Infographics',
      'Social Media Animations'
    ],
    benefits: [
      'Increased User Engagement',
      'Complex Information Simplified',
      'Memorable Brand Experiences',
      'Increased Time on Site',
      'Higher Conversion Rates',
      'Stand Out in Social Feeds'
    ],
    process: [
      { name: 'Concept', description: 'We develop creative concepts aligned with your brand and goals.' },
      { name: 'Storyboard', description: 'Creating visual storyboards to map out the animation sequence.' },
      { name: 'Design', description: 'Our artists design the static elements needed for animation.' },
      { name: 'Animation', description: 'Bringing the designs to life with professional animation techniques.' },
      { name: 'Delivery', description: 'Final animations are delivered in web-optimized formats for various platforms.' }
    ]
  },
  "brand-identity": {
    title: 'Brand Identity',
    description: "Build a cohesive and memorable brand with our comprehensive identity design services.",
    icon: <LayoutTemplate className="w-16 h-16 text-mosaic-accent" />,
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Color Palette Development',
      'Typography Selection',
      'Brand Messaging',
      'Visual Identity System',
      'Brand Strategy',
      'Brand Collateral'
    ],
    benefits: [
      'Consistent Brand Recognition',
      'Professional Market Positioning',
      'Stronger Customer Loyalty',
      'Coherent Brand Experience',
      'Differentiation from Competitors',
      'Long-term Brand Equity'
    ],
    process: [
      { name: 'Discovery', description: 'We research your industry, audience, and competition to inform strategy.' },
      { name: 'Strategy', description: 'Developing a brand strategy that defines your positioning and values.' },
      { name: 'Design', description: 'Creating visual elements that express your brand identity.' },
      { name: 'Implementation', description: 'Applying your new identity across all brand touchpoints.' },
      { name: 'Guidelines', description: 'Delivering comprehensive brand guidelines for consistent application.' }
    ]
  },
  // Default fallback
  "seo": {
    title: 'SEO Optimization',
    description: "Boost your website's visibility in search results with our comprehensive SEO strategies.",
    icon: <Target className="w-16 h-16 text-mosaic-accent" />,
    features: [
      'Comprehensive Website Audit',
      'Keyword Research & Strategy',
      'On-Page SEO Optimization',
      'Content Creation & Optimization',
      'Technical SEO Implementation',
      'Link Building Campaigns',
      'Local SEO Optimization',
      'Analytics & Reporting'
    ],
    benefits: [
      'Increased Organic Traffic',
      'Higher Search Engine Rankings',
      'Enhanced Website Visibility',
      'Improved User Experience',
      'Better Conversion Rates',
      'Long-term Sustainable Results'
    ],
    process: [
      { name: 'Discovery', description: 'We analyze your business goals, target audience, and current SEO performance.' },
      { name: 'Strategy', description: 'We develop a tailored SEO roadmap based on data-driven insights and industry best practices.' },
      { name: 'Implementation', description: 'Our team executes the strategy across all relevant SEO channels and touchpoints.' },
      { name: 'Optimization', description: 'We continuously monitor performance and refine our approach for optimal results.' },
      { name: 'Reporting', description: 'Regular detailed reports keep you informed about progress and ROI.' }
    ]
  }
};

const ServicesDetail = ({ serviceId = 'graphic-design' }) => {
  // Use the requested service or default to graphic-design if not found
  const service = servicesData[serviceId] || servicesData['graphic-design'];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-mosaic-primary/5 to-mosaic-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2" data-animate="fade-up">
              <p className="text-mosaic-secondary font-medium mb-3">Our Services</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {service.title}
              </h1>
              <p className="text-foreground/80 text-lg mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-mosaic-primary to-mosaic-secondary text-white">
                  Get Started
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center" data-animate="scale-in">
              <div className="relative">
                <div className="bg-white dark:bg-mosaic-dark/50 rounded-2xl p-8 shadow-xl">
                  {service.icon}
                  <h3 className="text-2xl font-bold mt-4 mb-2">{service.title}</h3>
                  <p className="text-foreground/70 mb-4">{service.description}</p>
                  <div className="space-y-2 mt-6">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="text-mosaic-accent flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-full -z-10 bg-mosaic-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
            <p className="text-mosaic-secondary font-medium mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comprehensive {service.title} Services
            </h2>
            <p className="text-foreground/70">
              Our expert team delivers end-to-end solutions tailored to your specific business needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-animate="fade-up">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-mosaic-dark/30 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-mosaic-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-mosaic-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature}</h3>
                <p className="text-foreground/70">
                  Our approach to {feature.toLowerCase()} is tailored to your unique business needs and objectives.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-mosaic-primary/5 to-mosaic-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
            <p className="text-mosaic-secondary font-medium mb-3">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How We Deliver Results
            </h2>
            <p className="text-foreground/70">
              Our proven methodology ensures consistent, high-quality outcomes for every project.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto" data-animate="fade-up">
            {/* Process timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-mosaic-primary/20 transform md:translate-x-px"></div>
            
            {/* Process steps */}
            {service.process.map((step, index) => (
              <div 
                key={index}
                className={`relative mb-12 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 bg-white dark:bg-mosaic-dark border-4 border-mosaic-primary rounded-full transform -translate-x-1/2 md:translate-x-1/2"></div>
                
                {/* Content */}
                <div className="ml-12 md:ml-0 bg-white dark:bg-mosaic-dark/50 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-mosaic-primary">
                    {index + 1}. {step.name}
                  </h3>
                  <p className="text-foreground/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2" data-animate="fade-up">
              <p className="text-mosaic-secondary font-medium mb-3">Benefits</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our {service.title} Services
              </h2>
              <p className="text-foreground/80 mb-8">
                Our data-driven approach and industry expertise deliver measurable results that help your business grow and succeed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-mosaic-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold">{benefit}</h4>
                      <p className="text-sm text-foreground/70">
                        Experience the advantage of {benefit.toLowerCase()} through our expert services.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2" data-animate="scale-in">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden bg-mosaic-primary/10 p-6">
                      <Target className="w-10 h-10 text-mosaic-primary mb-4" />
                      <h4 className="text-lg font-bold mb-2">Targeted Results</h4>
                      <p className="text-foreground/70">We focus on the metrics that matter most to your business.</p>
                    </div>
                    <div className="rounded-lg overflow-hidden bg-mosaic-secondary/10 p-6">
                      <Users className="w-10 h-10 text-mosaic-secondary mb-4" />
                      <h4 className="text-lg font-bold mb-2">Expert Team</h4>
                      <p className="text-foreground/70">Our specialists have years of industry experience.</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="rounded-lg overflow-hidden bg-mosaic-accent/10 p-6">
                      <ChartBar className="w-10 h-10 text-mosaic-accent mb-4" />
                      <h4 className="text-lg font-bold mb-2">Data-Driven</h4>
                      <p className="text-foreground/70">All strategies are backed by comprehensive analytics.</p>
                    </div>
                    <div className="rounded-lg overflow-hidden bg-mosaic-primary/10 p-6">
                      <CheckCircle className="w-10 h-10 text-mosaic-primary mb-4" />
                      <h4 className="text-lg font-bold mb-2">Proven Success</h4>
                      <p className="text-foreground/70">Our track record speaks for itself with measurable results.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-4/5 h-4/5 -z-10 bg-mosaic-secondary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-mosaic-primary to-mosaic-secondary text-white">
        <div className="container mx-auto px-4 text-center" data-animate="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your {service.title} Strategy?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Let's collaborate to create a tailored solution that aligns with your business goals and drives measurable results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-mosaic-primary hover:bg-white/90 px-6 py-3 text-base font-medium">
              Schedule a Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 text-base font-medium">
              View Pricing <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesDetail;
