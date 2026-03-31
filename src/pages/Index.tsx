import { motion } from "framer-motion";
import { ArrowRight, Play, Palette, Video, Globe, Share2, Clapperboard, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const serviceHighlights = [
  { icon: Palette, title: "Graphic Design", desc: "Logos, flyers & brand identity" },
  { icon: Clapperboard, title: "Motion Graphics", desc: "Ads, animations & explainers" },
  { icon: Video, title: "Video Production", desc: "Commercials & brand stories" },
  { icon: Globe, title: "Website Development", desc: "Modern, responsive websites" },
  { icon: Share2, title: "Social Media", desc: "Strategy, content & growth" },
];

const portfolioPreview = [
  { title: "Luxe Beauty Rebrand", category: "Brand Identity", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop" },
  { title: "TechStart Motion Ads", category: "Motion Graphics", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=350&fit=crop" },
  { title: "GoldCoast Restaurant", category: "Website", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=350&fit=crop" },
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-secondary/30 backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide uppercase">
                Premium Creative Agency — Accra, Ghana
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              We Don't Just Design.{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-gold">We Build Brands</span> That Grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              From visuals to visibility — Mosaic Hive helps your brand stand out and scale online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="group bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold text-base flex items-center gap-2 hover:opacity-90 transition-all glow-gold"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="group flex items-center gap-2 px-8 py-4 rounded-lg border border-border hover:border-primary/50 text-foreground font-display font-medium transition-all hover:bg-secondary/30"
              >
                <Play size={16} className="text-primary" />
                View Portfolio
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "80+", label: "Happy Clients" },
                { value: "5+", label: "Years Experience" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Highlights */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">What We Do</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
              Services Built for <span className="text-gradient-gold">Growth</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every service is crafted to help your brand scale with intention and impact.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {serviceHighlights.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-6 text-center hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-display font-semibold hover:gap-3 transition-all"
            >
              Explore All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Portfolio</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
              Featured <span className="text-gradient-gold">Projects</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {portfolioPreview.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display text-lg font-semibold mt-1">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary font-display font-semibold hover:gap-3 transition-all">
              View Full Portfolio <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Growth Plans Preview */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Growth Plans</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
              Real Growth. <span className="text-gradient-gold">Real Results.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No fake followers. Just strategic, organic growth backed by real content and data-driven advertising.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-8 md:p-12 max-w-3xl mx-auto text-center glow-gold border-primary/20"
          >
            <Star size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Pro Growth Plan</h3>
            <p className="text-muted-foreground mb-4">Our most popular plan — Content + Ads</p>
            <div className="font-display text-4xl font-bold text-primary mb-6">GHS 2,500<span className="text-lg text-muted-foreground">/month</span></div>
            <div className="grid sm:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-8">
              {["16 posts/month", "Paid ad campaigns", "A/B testing", "Bi-weekly analytics", "Competitor analysis", "Story & reel content"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Link to="/growth-plans" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-display font-semibold hover:opacity-90 transition-opacity">
              See All Plans <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to elevate your brand?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's discuss how Mosaic Hive can help you stand out and grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Get a Free Consultation <ArrowRight size={18} />
              </Link>
              <Link to="/pricing" className="border border-border text-foreground px-8 py-4 rounded-lg font-display font-medium hover:border-primary/50 transition-colors">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
