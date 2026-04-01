import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, ArrowRight, Shield, BarChart3, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Shield, title: "No Fake Followers", description: "100% organic, real audience growth through strategic content and targeted advertising." },
  { icon: BarChart3, title: "Data-Driven Strategy", description: "Every decision backed by analytics, competitor research, and performance tracking." },
  { icon: Calendar, title: "Content Calendar", description: "Organized posting schedule tailored to your audience's peak engagement times." },
  { icon: Users, title: "Community Building", description: "Genuine engagement strategies that turn followers into loyal brand advocates." },
];

const plans = [
  {
    icon: Zap,
    name: "Starter Growth",
    subtitle: "Content + Strategy",
    price: "GHS 1,200",
    period: "/month",
    popular: false,
    features: ["Custom content strategy", "8 social media posts/month", "Content calendar planning", "Hashtag research", "Monthly engagement report", "Audience growth tracking", "Community interaction tips"],
  },
  {
    icon: Star,
    name: "Pro Growth",
    subtitle: "Content + Ads",
    price: "GHS 2,500",
    period: "/month",
    popular: true,
    features: ["Everything in Starter Growth", "16 social media posts/month", "Paid ad campaign management", "A/B testing for ad creatives", "Engagement strategy & boosting", "Bi-weekly analytics reports", "Competitor analysis", "Story & reel content creation"],
  },
  {
    icon: Crown,
    name: "Elite Growth",
    subtitle: "Full Management + Ads + Analytics",
    price: "GHS 5,000",
    period: "/month",
    popular: false,
    features: ["Everything in Pro Growth", "30 social media posts/month", "Full account management", "Advanced ad campaigns", "Influencer collaboration", "Weekly detailed analytics", "Brand reputation monitoring", "Priority support & strategy calls", "Video content for reels"],
  },
];

const GrowthPlansPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Real Growth."
        titleAccent="Real Results."
        description="No fake followers. No bots. Just strategic, organic growth backed by real content and data-driven advertising."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Growth Plans" }]}
      />

      {/* Benefits */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-lg p-6 text-center border border-border/60 elegant-shadow"
              >
                <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <b.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Choose Your <span className="text-gradient-gold">Growth Plan</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-lg p-8 flex flex-col transition-all ${
                  plan.popular
                    ? "bg-dark text-white border-2 border-primary/40 scale-[1.02]"
                    : "bg-card border border-border/60 elegant-shadow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <plan.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-white/50" : "text-muted-foreground"}`}>{plan.subtitle}</p>
                <div className="mb-6">
                  <span className="font-display text-3xl font-bold text-primary">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-white/40" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-md font-semibold text-sm text-center block transition-all ${
                    plan.popular
                      ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GrowthPlansPage;
