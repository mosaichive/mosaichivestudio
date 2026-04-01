import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHeader = ({ title, titleAccent, description, breadcrumbs }: PageHeaderProps) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-dark overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--gold) / 0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/40 mb-6"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-white/20" />}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            {title}{" "}
            {titleAccent && <span className="text-gradient-gold">{titleAccent}</span>}
          </h1>
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
