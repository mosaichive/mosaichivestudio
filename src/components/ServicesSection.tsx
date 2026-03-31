import { motion } from "framer-motion";
import { Palette, Video, Globe, Share2, Clapperboard } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Logos, flyers, brand identity kits, and visual assets that make your brand unforgettable.",
    price: "GHS 500",
  },
  {
    icon: Clapperboard,
    title: "Motion Graphics",
    description: "Eye-catching ad animations, explainer videos, and dynamic visual content for social media.",
    price: "GHS 1,500",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Professional video shoots, editing, and post-production for commercials, events, and brand stories.",
    price: "GHS 2,000",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Fast, modern, and responsive websites built to convert visitors into loyal customers.",
    price: "GHS 3,000",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic content creation, scheduling, community management, and growth campaigns.",
    price: "GHS 800",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
            Services Built for <span className="text-gradient-gold">Growth</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every service is crafted to help your brand scale with intention and impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card rounded-xl p-8 hover:border-primary/30 transition-all duration-300 hover:glow-gold"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-display font-semibold">
                  From {service.price}
                </span>
                <button className="text-sm text-foreground border border-border px-4 py-2 rounded-lg hover:border-primary/50 hover:text-primary transition-colors font-medium">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
