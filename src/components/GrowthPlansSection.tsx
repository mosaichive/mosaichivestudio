import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    icon: Zap,
    name: "Starter Growth",
    subtitle: "Content + Strategy",
    price: "GHS 1,200",
    period: "/month",
    popular: false,
    features: [
      "Custom content strategy tailored to your niche",
      "8 social media posts per month",
      "Content calendar planning",
      "Hashtag research & optimization",
      "Monthly engagement report",
      "Audience growth tracking",
      "Community interaction tips",
    ],
  },
  {
    icon: Star,
    name: "Pro Growth",
    subtitle: "Content + Ads",
    price: "GHS 2,500",
    period: "/month",
    popular: true,
    features: [
      "Everything in Starter Growth",
      "16 social media posts per month",
      "Paid ad campaign management",
      "A/B testing for ad creatives",
      "Engagement strategy & boosting",
      "Bi-weekly analytics reports",
      "Competitor analysis",
      "Story & reel content creation",
    ],
  },
  {
    icon: Crown,
    name: "Elite Growth",
    subtitle: "Full Management + Ads + Analytics",
    price: "GHS 5,000",
    period: "/month",
    popular: false,
    features: [
      "Everything in Pro Growth",
      "30 social media posts per month",
      "Full social media account management",
      "Advanced ad campaigns with retargeting",
      "Influencer collaboration coordination",
      "Weekly detailed analytics & insights",
      "Brand reputation monitoring",
      "Priority support & strategy calls",
      "Video content for reels & stories",
    ],
  },
];

const GrowthPlansSection = () => {
  return (
    <section id="growth" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Growth Plans
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
            Real Growth. <span className="text-gradient-gold">Real Results.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No fake followers. No bots. Just strategic, organic growth backed by
            real content and data-driven advertising.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "glass-card border-primary/40 glow-gold scale-[1.02]"
                  : "glass-card hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <plan.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.subtitle}</p>
              <div className="mb-6">
                <span className="font-display text-3xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-display font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthPlansSection;
