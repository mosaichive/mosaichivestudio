import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Social Media Template Pack",
    description: "50+ customizable Instagram, Facebook, and Twitter templates for any brand. Fully editable in Canva and Photoshop.",
    price: "GHS 150",
    category: "Templates",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop",
  },
  {
    title: "Brand Identity Kit",
    description: "Complete branding starter kit with logo templates, color palettes, typography guides, and brand board layouts.",
    price: "GHS 300",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
  },
  {
    title: "Content Creator Pack",
    description: "Story templates, highlight covers, post layouts, and engagement prompts for content creators and influencers.",
    price: "GHS 100",
    category: "Templates",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop",
  },
  {
    title: "Business Presentation Kit",
    description: "Professional slide deck templates for pitches, reports, and proposals. Works with PowerPoint and Google Slides.",
    price: "GHS 200",
    category: "Templates",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
  },
  {
    title: "E-Commerce Branding Bundle",
    description: "Product mockups, label designs, packaging templates, and social media ads for online stores.",
    price: "GHS 350",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  },
  {
    title: "Video Intro Pack",
    description: "10 customizable video intro and outro templates for YouTube, TikTok, and brand videos.",
    price: "GHS 250",
    category: "Content Packs",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop",
  },
];

const ShopPage = () => {
  return (
    <PageLayout>
      <PageHeader
        badge="Digital Shop"
        title="Premium"
        titleAccent="Digital Products"
        description="Ready-to-use templates, branding kits, and content packs designed by our creative team. Instant download after purchase."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-secondary/80 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full text-foreground">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-display font-bold text-xl">{product.price}</span>
                    <button className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                      <ShoppingBag size={14} />
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold mb-4">Need something custom?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              We can create bespoke templates and branding assets tailored specifically to your brand.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold hover:opacity-90 transition-opacity">
              Request Custom Design <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ShopPage;
