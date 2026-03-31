import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Brand Identity", "Motion Graphics", "Website", "Social Media", "Video"];

const projects = [
  {
    title: "Luxe Beauty Rebrand",
    category: "Brand Identity",
    client: "Luxe Beauty Co.",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    description: "Complete visual identity overhaul for a premium beauty brand, including logo, packaging, and social media presence.",
  },
  {
    title: "TechStart Motion Ads",
    category: "Motion Graphics",
    client: "TechStart Inc.",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    description: "Dynamic animated advertisements for a tech startup's product launch campaign across social platforms.",
  },
  {
    title: "GoldCoast Restaurant",
    category: "Website",
    client: "GoldCoast Dining",
    date: "January 2025",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    description: "Modern, responsive website with online ordering and reservation system for a high-end restaurant.",
  },
  {
    title: "FitLife Campaign",
    category: "Social Media",
    client: "FitLife Ghana",
    date: "December 2024",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    description: "Full social media management and growth campaign resulting in 300% increase in engagement.",
  },
  {
    title: "Afro Beats Festival",
    category: "Video",
    client: "Afro Beats Org",
    date: "November 2024",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    description: "Professional event coverage, highlight reels, and promotional content for a major music festival.",
  },
  {
    title: "EcoWear Brand Kit",
    category: "Brand Identity",
    client: "EcoWear Fashion",
    date: "October 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    description: "Sustainable fashion brand identity including eco-friendly packaging design and brand guidelines.",
  },
  {
    title: "Finova App Interface",
    category: "Website",
    client: "Finova Payments",
    date: "September 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "UI/UX design and development for a fintech mobile application serving West African markets.",
  },
  {
    title: "Pulse Energy Ads",
    category: "Motion Graphics",
    client: "Pulse Energy",
    date: "August 2024",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop",
    description: "High-energy motion graphic advertisements for a beverage brand's regional campaign.",
  },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageLayout>
      <PageHeader
        badge="Portfolio"
        title="Our"
        titleAccent="Best Work"
        description="A curated selection of projects that showcase our creativity, expertise, and commitment to excellence."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-gradient-gold text-primary-foreground"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
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
                    <p className="text-xs text-muted-foreground mt-1">{project.client}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold mb-4">Want results like these?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">Let's create something extraordinary for your brand.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold hover:opacity-90 transition-opacity">
              Start Your Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

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
                <img src={selected.image} alt={selected.title} className="w-full aspect-video object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-8">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{selected.category}</span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-1">{selected.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{selected.client} · {selected.date}</p>
                <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
                <Link to="/contact" className="mt-6 inline-block bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity">
                  Start Similar Project
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default PortfolioPage;
