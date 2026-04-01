import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Kwame Asante",
    role: "Founder & Creative Director",
    bio: "With over 8 years in creative design, Kwame leads the agency's vision and ensures every project reflects excellence and innovation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Ama Mensah",
    role: "Head of Digital Marketing",
    bio: "Ama specializes in social media strategy and paid advertising, helping brands achieve real, organic audience growth.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Daniel Osei",
    role: "Lead Developer",
    bio: "Daniel builds fast, responsive websites and web applications that convert visitors into loyal customers.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Efua Adjei",
    role: "Motion Graphics Designer",
    bio: "Efua creates eye-catching animations and video content that bring brand stories to life on every platform.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Kofi Boateng",
    role: "Brand Strategist",
    bio: "Kofi develops comprehensive brand strategies that align visual identity with business objectives for lasting impact.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Nana Akua",
    role: "Content Creator",
    bio: "Nana produces compelling written and visual content that engages audiences and builds brand loyalty across channels.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
  },
];

const TeamPage = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Meet"
        titleAccent="The Team"
        description="The talented people behind Mosaic Hive who bring creativity, strategy, and passion to every project."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-lg border border-border/60 overflow-hidden hover:border-primary/30 transition-all elegant-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Want to join the team?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              We're always looking for talented creatives who share our passion for excellence.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TeamPage;
