import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Palette, Video, Globe, Share2, Clapperboard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Logos, flyers, brand identity kits, and visual assets that make your brand unforgettable.",
    details: "Our graphic design team creates stunning visuals that communicate your brand's essence. From initial concept to final delivery, we ensure every pixel serves a purpose. Services include logo design, business cards, flyers, brochures, social media graphics, packaging design, and complete brand identity systems.",
    price: "GHS 500",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
  },
  {
    icon: Clapperboard,
    title: "Motion Graphics",
    description: "Eye-catching ad animations, explainer videos, and dynamic visual content for social media.",
    details: "Bring your ideas to life with captivating motion graphics. Our animators create scroll-stopping content for ads, social media, product demos, and brand storytelling. We work with 2D and 3D animation, kinetic typography, and visual effects.",
    price: "GHS 1,500",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Professional video shoots, editing, and post-production for commercials, events, and brand stories.",
    details: "From pre-production planning to final color grading, our video production team handles every aspect. We produce commercials, corporate videos, event coverage, testimonials, documentaries, and social media video content with cinematic quality.",
    price: "GHS 2,000",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Fast, modern, and responsive websites built to convert visitors into loyal customers.",
    details: "We build websites that don't just look good — they perform. Our development team creates responsive, SEO-optimized websites with clean code, fast load times, and intuitive user experiences. From landing pages to full e-commerce platforms, we've got you covered.",
    price: "GHS 3,000",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic content creation, scheduling, community management, and growth campaigns.",
    details: "Let us handle your social media presence end-to-end. Our team creates engaging content, manages your community, runs targeted campaigns, and provides detailed analytics. We focus on real engagement and organic growth across Instagram, Facebook, Twitter, LinkedIn, and TikTok.",
    price: "GHS 800",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  },
];

const ServicesPage = () => {
  return (
    <PageLayout>
      <PageHeader
        badge="What We Do"
        title="Services Built for"
        titleAccent="Growth"
        description="Every service is crafted to help your brand scale with intention and impact. Explore our full range of creative and digital services."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="rounded-xl overflow-hidden glass-card">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-[3/2] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.details}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-primary font-display font-semibold text-lg">
                      From {service.price}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      Order Now <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/pricing"
                      className="border border-border text-foreground px-6 py-3 rounded-lg font-display font-medium text-sm hover:border-primary/50 transition-colors"
                    >
                      View Pricing
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's chat about your goals and we'll recommend the perfect solution for your brand.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold hover:opacity-90 transition-opacity"
            >
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
