import { Instagram, Twitter, Facebook, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-3">
              <span className="text-gradient-gold">Mosaic</span> Hive
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              A premium creative agency specializing in graphic design, motion
              graphics, video production, website development, and real social
              media growth services.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Graphic Design", "Motion Graphics", "Video Production", "Website Development", "Social Media"].map(
                (s) => (
                  <li key={s}>
                    <a href="#services" className="hover:text-primary transition-colors">
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Portfolio", "Growth Plans", "Pricing", "Shop", "Contact"].map(
                (s) => (
                  <li key={s}>
                    <a
                      href={`#${s.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-primary transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mosaic Hive. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
