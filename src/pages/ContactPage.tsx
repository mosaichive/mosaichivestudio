import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@mosaichive.studio" },
  { icon: Phone, label: "Phone", value: "+233 XX XXX XXXX" },
  { icon: MapPin, label: "Office", value: "Accra, Ghana" },
  { icon: Clock, label: "Hours", value: "Mon – Fri, 9AM – 6PM GMT" },
];

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
        title="Start a New"
        titleAccent="Project"
        description="Ready to take your brand to the next level? Fill out the form below and our team will get back to you within 24 hours."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-display text-xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-display text-sm font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {["Instagram", "Twitter", "Facebook", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors border border-border px-3 py-1.5 rounded-md"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden border border-border/60 aspect-video elegant-shadow">
                <iframe
                  title="Mosaic Hive Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254090.60968150067!2d-0.36171!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="md:col-span-3 bg-card rounded-lg p-8 border border-border/60 space-y-5 h-fit elegant-shadow"
            >
              <h3 className="font-display text-xl font-semibold mb-2">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Fashion, Tech, Food"
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service Needed</label>
                  <select className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors">
                    <option value="">Select a service</option>
                    <option>Graphic Design</option>
                    <option>Motion Graphics</option>
                    <option>Video Production</option>
                    <option>Website Development</option>
                    <option>Digital Marketing</option>
                    <option>Social Media Growth</option>
                    <option>Growth Plan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
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
