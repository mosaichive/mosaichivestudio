import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Contact Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
              Let's Build Something{" "}
              <span className="text-gradient-gold">Amazing</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ready to take your brand to the next level? Fill out the form and our
              team will get back to you within 24 hours.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>📧 hello@mosaichive.studio</p>
              <p>📱 +233 XX XXX XXXX</p>
              <p>📍 Accra, Ghana</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-xl p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Type</label>
              <input
                type="text"
                placeholder="e.g. Fashion, Tech, Food"
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Service Needed</label>
              <select className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                <option value="">Select a service</option>
                <option>Graphic Design</option>
                <option>Motion Graphics</option>
                <option>Video Production</option>
                <option>Website Development</option>
                <option>Social Media Management</option>
                <option>Growth Plan</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-display font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {submitted ? (
                <>
                  <CheckCircle size={18} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
