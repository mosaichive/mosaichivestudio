import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    name: "Basic",
    price: "GHS 500",
    period: "/project",
    description: "Perfect for startups and small projects that need professional quality on a budget.",
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
    period: "/project",
    description: "Great for growing businesses that need multiple options and faster turnaround.",
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
    period: "/project",
    description: "Full branding for established businesses seeking a complete brand overhaul.",
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

const PricingPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Transparent"
        titleAccent="Pricing"
        description="Choose the package that fits your needs. All packages include our signature quality and dedication."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-lg p-8 flex flex-col transition-all ${
                  pkg.featured
                    ? "bg-dark text-white border-2 border-primary/40 scale-[1.02]"
                    : "bg-card border border-border/60 elegant-shadow"
                }`}
              >
                {pkg.featured && (
                  <span className="inline-block self-start bg-gradient-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Recommended
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
                <p className={`text-sm mt-2 mb-5 ${pkg.featured ? "text-white/50" : "text-muted-foreground"}`}>
                  {pkg.description}
                </p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-primary">{pkg.price}</span>
                  <span className={`text-sm ${pkg.featured ? "text-white/40" : "text-muted-foreground"}`}>
                    {" "}{pkg.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${pkg.featured ? "text-white/70" : "text-muted-foreground"}`}>
                      <Check size={15} className="text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-md font-semibold text-sm text-center block transition-all ${
                    pkg.featured
                      ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 max-w-4xl mx-auto"
          >
            <h3 className="font-display text-2xl font-bold text-center mb-8">
              Compare <span className="text-gradient-gold">Packages</span>
            </h3>
            <div className="bg-card rounded-lg border border-border/60 overflow-hidden elegant-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-display font-semibold text-muted-foreground">Feature</th>
                      {packages.map((p) => (
                        <th key={p.name} className="p-4 font-display font-semibold text-center">{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {["Design Concepts", "Revisions", "Source Files", "Brand Guidelines", "Social Templates", "Dedicated Manager"].map((feature, fi) => (
                      <tr key={feature} className="border-b border-border/50">
                        <td className="p-4 text-muted-foreground">{feature}</td>
                        {[
                          ["1", "2", "✓", "—", "—", "—"],
                          ["3", "5", "✓", "✓", "—", "—"],
                          ["∞", "∞", "✓", "✓", "✓", "✓"],
                        ].map((row, ri) => (
                          <td key={ri} className="p-4 text-center">
                            {row[fi] === "✓" ? (
                              <Check size={15} className="text-primary mx-auto" />
                            ) : row[fi] === "—" ? (
                              <span className="text-muted-foreground/30">—</span>
                            ) : (
                              <span className="font-medium">{row[fi]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold mb-4">Need a custom quote?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Every project is unique. Contact us for a tailored proposal.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity">
              Get Custom Quote <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PricingPage;
