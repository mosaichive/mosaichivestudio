import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageLayout>
      <PageHeader
        badge="Contact Us"
        title="Let's Build Something"
        titleAccent="Amazing"
        description="Ready to take your brand to the next level? Fill out the form and our team will get back to you within 24 hours."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-display text-xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "hello@mosaichive.studio" },
                    { icon: Phone, label: "Phone", value: "+233 XX XXX XXXX" },
                    { icon: MapPin, label: "Location", value: "Accra, Ghana" },
                    { icon: Clock, label: "Hours", value: "Mon – Fri, 9AM – 6PM GMT" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass-card rounded-xl overflow-hidden aspect-video">
                <iframe
                  title="Mosaic Hive Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254090.60968150067!2d-0.36171!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1"
                  className="w-full h-full border-0 opacity-70"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="md:col-span-3 glass-card rounded-xl p-8 space-y-5 h-fit"
            >
              <h3 className="font-display text-xl font-semibold mb-2">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-5">
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
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
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
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-gold text-primary-foreground py-3.5 rounded-lg font-display font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
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
    </PageLayout>
  );
};

export default ContactPage;
