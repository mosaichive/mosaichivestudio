import { motion } from "framer-motion";
import { ArrowRight, Palette, Video, Globe, Share2, Clapperboard, Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const serviceHighlights = [
  { icon: Palette, title: "Graphic Design", desc: "Logos, flyers & brand identity" },
  { icon: Clapperboard, title: "Motion Graphics", desc: "Ads, animations & explainers" },
  { icon: Video, title: "Video Production", desc: "Commercials & brand stories" },
  { icon: Globe, title: "Web Development", desc: "Modern, responsive websites" },
  { icon: Share2, title: "Digital Marketing", desc: "Strategy, content & growth" },
];

const portfolioPreview = [
  { title: "Luxe Beauty Rebrand", category: "Brand Identity", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
  { title: "TechStart Motion Ads", category: "Motion Graphics", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop" },
  { title: "GoldCoast Restaurant", category: "Website", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop" },
];

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "80+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-dark overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold) / 0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-medium text-sm tracking-widest uppercase mb-6"
            >
              Premium Creative Agency — Accra, Ghana
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 text-white"
            >
              We Don't Just Design.{" "}
              <span className="text-gradient-gold">We Build Brands</span> That Grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/50 max-w-xl mb-10 leading-relaxed"
            >
              From visuals to visibility — Mosaic Hive helps your brand stand out
              and scale online through design, content, and strategic digital marketing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                to="/contact"
                className="bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight size={16} />
              </Link>
              <Link
                to="/portfolio"
                className="border border-white/20 text-white px-8 py-3.5 rounded-md font-medium text-sm hover:border-primary/50 transition-colors"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 md:py-10 text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Who We Are</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
                We're motivated by the desire to{" "}
                <span className="text-gradient-gold">achieve.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mosaic Hive is an integrated creative and digital marketing agency
                with mastery in visual storytelling — connecting businesses to their
                customers through design, content, and strategy.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                More About Us <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden elegant-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop"
                alt="Mosaic Hive team collaborating"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Services Built for <span className="text-gradient-gold">Growth</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {serviceHighlights.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-lg p-6 text-center border border-border/60 hover:border-primary/30 transition-all elegant-shadow"
              >
                <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              Explore All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Portfolio</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Featured <span className="text-gradient-gold">Projects</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioPreview.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-lg overflow-hidden bg-card border border-border/60 hover:border-primary/30 transition-all elegant-shadow"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display text-lg font-semibold mt-1">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Plans Preview */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Growth Plans</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Real Growth. <span className="text-gradient-gold">Real Results.</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10">
              No fake followers. Just strategic, organic growth backed by real content
              and data-driven advertising.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-light rounded-lg p-8 md:p-12 max-w-2xl mx-auto border border-white/10"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-2">Pro Growth Plan</h3>
            <p className="text-white/50 mb-4 text-sm">Our most popular plan — Content + Ads</p>
            <div className="font-display text-4xl font-bold text-primary mb-6">
              GHS 2,500<span className="text-lg text-white/40">/month</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5 text-left max-w-md mx-auto mb-8">
              {["16 posts/month", "Paid ad campaigns", "A/B testing", "Bi-weekly analytics", "Competitor analysis", "Story & reel content"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Link
              to="/growth-plans"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              See All Plans <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to elevate your brand?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's discuss how Mosaic Hive can help you stand out and grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Get a Free Consultation <ArrowRight size={16} />
              </Link>
              <Link
                to="/pricing"
                className="border border-border text-foreground px-8 py-3.5 rounded-md font-medium text-sm hover:border-primary/50 transition-colors"
              >
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
