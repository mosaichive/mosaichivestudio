import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Growth Plans", href: "/growth-plans" },
  { label: "Shop", href: "/shop" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  "Graphic Design",
  "Motion Graphics",
  "Video Production",
  "Website Development",
  "Digital Marketing",
  "Social Media Growth",
];

const Footer = () => {
  return (
    <footer className="bg-dark text-white/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              <span className="text-gradient-gold">Mosaic</span>{" "}
              <span className="text-white">Hive</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A premium creative agency specializing in design, digital marketing,
              and real social media growth services based in Accra, Ghana.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="text-primary shrink-0" />
                <span>hello@mosaichive.studio</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="text-primary shrink-0" />
                <span>+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-5">
              Start a Project
            </h4>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Ready to elevate your brand? Let's discuss your project and create
              something remarkable together.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-gold text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Mosaic Hive. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "Facebook", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-white/40 hover:text-primary transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
