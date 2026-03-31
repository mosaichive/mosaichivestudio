import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Luxe Beauty Rebrand",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    description: "Complete visual identity overhaul for a premium beauty brand, including logo, packaging, and social media presence.",
  },
  {
    title: "TechStart Motion Ads",
    category: "Motion Graphics",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    description: "Dynamic animated advertisements for a tech startup's product launch campaign across social platforms.",
  },
  {
    title: "GoldCoast Restaurant",
    category: "Website Development",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    description: "Modern, responsive website with online ordering and reservation system for a high-end restaurant.",
  },
  {
    title: "FitLife Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    description: "Full social media management and growth campaign resulting in 300% increase in engagement.",
  },
  {
    title: "Afro Beats Festival",
    category: "Video Production",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    description: "Professional event coverage, highlight reels, and promotional content for a major music festival.",
  },
  {
    title: "EcoWear Brand Kit",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    description: "Sustainable fashion brand identity including eco-friendly packaging design and brand guidelines.",
  },
];

const PortfolioSection = () => {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-gradient-gold">Best Work</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated selection of projects that showcase our creativity and expertise.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(project)}
              className="group cursor-pointer rounded-xl overflow-hidden glass-card hover:border-primary/30 transition-all"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink size={24} className="text-primary" />
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display text-lg font-semibold mt-1">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-2xl w-full overflow-hidden"
            >
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-8">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {selected.category}
                </span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-3">{selected.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
                <button className="mt-6 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity">
                  Start Similar Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
