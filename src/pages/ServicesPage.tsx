import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Palette, Video, Globe, Share2, Clapperboard, TrendingUp, ArrowRight } from "lucide-react";
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
    details: "We build websites that don't just look good — they perform. Our development team creates responsive, SEO-optimized websites with clean code, fast load times, and intuitive user experiences. From landing pages to full e-commerce platforms.",
    price: "GHS 3,000",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
  },
  {
    icon: Share2,
    title: "Digital Marketing",
    description: "Strategic campaigns across Google, social media, and email to drive traffic and conversions.",
    details: "Our digital marketing team crafts targeted campaigns that deliver measurable results. From SEO and Google Ads to social media advertising and email marketing, we use data-driven approaches to maximize your ROI.",
    price: "GHS 1,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    icon: TrendingUp,
    title: "Social Media Growth",
    description: "Strategic content creation, community management, and organic growth campaigns.",
    details: "Let us handle your social media presence end-to-end. Our team creates engaging content, manages your community, runs targeted campaigns, and provides detailed analytics. We focus on real engagement and organic growth.",
    price: "GHS 800",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  },
];

const ServicesPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Our"
        titleAccent="Services"
        description="Every service is crafted to help your brand scale with intention and impact. Explore our full range of creative and digital solutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="rounded-lg overflow-hidden elegant-shadow">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-[3/2] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon size={20} className="text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                    {service.details}
                  </p>
                  <p className="text-primary font-semibold mb-5">
                    Starting from {service.price}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="bg-gradient-gold text-primary-foreground px-6 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      Order Now <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/pricing"
                      className="border border-border text-foreground px-6 py-2.5 rounded-md font-medium text-sm hover:border-primary/50 transition-colors"
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
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's chat about your goals and we'll recommend the perfect solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get a Free Consultation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
