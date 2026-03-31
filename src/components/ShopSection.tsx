import { motion } from "framer-motion";
import { Download, ShoppingBag } from "lucide-react";

const products = [
  {
    title: "Social Media Template Pack",
    description: "50+ customizable Instagram, Facebook, and Twitter templates for any brand.",
    price: "GHS 150",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop",
  },
  {
    title: "Brand Identity Kit",
    description: "Complete branding starter kit with logo templates, color palettes, and typography guides.",
    price: "GHS 300",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
  },
  {
    title: "Content Creator Pack",
    description: "Story templates, highlight covers, post layouts, and engagement prompts for creators.",
    price: "GHS 100",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop",
  },
  {
    title: "Business Presentation Kit",
    description: "Professional slide deck templates for pitches, reports, and proposals.",
    price: "GHS 200",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
  },
];

const ShopSection = () => {
  return (
    <section id="shop" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Digital Shop
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
            Premium <span className="text-gradient-gold">Digital Products</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready-to-use templates and kits designed by our creative team.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-display font-bold text-lg">
                    {product.price}
                  </span>
                  <button className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                    <ShoppingBag size={14} />
                    Buy
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
