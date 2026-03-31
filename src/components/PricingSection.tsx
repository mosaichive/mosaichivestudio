import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "GHS 500",
    description: "Perfect for startups and small projects",
    features: [
      "1 design concept",
      "2 revisions",
      "Source files included",
      "3-day delivery",
      "Email support",
    ],
  },
  {
    name: "Standard",
    price: "GHS 1,500",
    description: "Great for growing businesses",
    featured: true,
    features: [
      "3 design concepts",
      "5 revisions",
      "Source files + print-ready",
      "5-day delivery",
      "Brand guidelines doc",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    price: "GHS 4,000",
    description: "Full branding for established businesses",
    features: [
      "Unlimited concepts",
      "Unlimited revisions",
      "Complete brand kit",
      "7-day delivery",
      "Social media templates",
      "Brand strategy session",
      "Dedicated manager",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
            Transparent <span className="text-gradient-gold">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the package that fits your needs. All packages include our signature quality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-8 transition-all ${
                pkg.featured
                  ? "glass-card border-primary/40 glow-gold"
                  : "glass-card hover:border-primary/20"
              }`}
            >
              {pkg.featured && (
                <span className="inline-block bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                  Recommended
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
              <div className="mb-6">
                <span className="font-display text-3xl font-bold text-primary">{pkg.price}</span>
                <span className="text-muted-foreground text-sm"> /project</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-display font-semibold text-sm transition-all ${
                  pkg.featured
                    ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary/50"
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
