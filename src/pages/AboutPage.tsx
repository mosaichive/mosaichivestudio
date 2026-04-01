import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Target, Eye, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower businesses across Africa and beyond with world-class creative solutions that drive real, measurable growth and lasting brand impact.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the leading creative agency in West Africa, known for transforming brands through innovative design, strategic marketing, and authentic storytelling.",
  },
  {
    icon: Sparkles,
    title: "What Makes Us Different",
    description:
      "We combine creativity with strategy. Every design decision is backed by data, and every campaign is built on genuine audience understanding — no shortcuts, no fake metrics.",
  },
];

const AboutPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="About"
        titleAccent="Mosaic Hive"
        description="We are an integrated creative and digital marketing agency with mastery in visual storytelling, connecting businesses to their customers."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Built by creatives, <span className="text-gradient-gold">for creatives.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mosaic Hive was founded in Accra, Ghana with a simple belief: every
                business deserves branding that tells its story with clarity, beauty,
                and purpose.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What started as a small design studio has grown into a full-service
                creative agency serving clients across Ghana, Nigeria, the UK, and
                the United States. We've helped over 80 brands find their voice
                through strategic design, compelling video content, and data-driven
                digital marketing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team brings together designers, developers, marketers, and
                strategists who share one common goal — to create work that matters
                and delivers results.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden elegant-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=450&fit=crop"
                alt="Mosaic Hive agency workspace"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Difference */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg p-8 border border-border/60 elegant-shadow"
              >
                <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "80+", label: "Happy Clients" },
              { value: "5+", label: "Years in Business" },
              { value: "6", label: "Core Services" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to work with us?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's discuss your project and create something remarkable together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
