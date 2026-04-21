import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import Reveal from '@/components/Reveal';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useSiteSettings } from '@/hooks/useStudioContent';

const getPhoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

const ContactPage = () => {
  const { data: settings } = useSiteSettings();
  const email = settings?.contact_email ?? 'hello@mosaic06studio.com';
  const phone = settings?.contact_phone ?? '+233 20 298 5474';
  const address = settings?.contact_address ?? 'Accra, Ghana';

  useSEO({
    title: 'Contact · Mosaic06 Studio',
    description:
      'Tell us about your next project. Mosaic06 replies to every serious inquiry within one working day.',
    path: '/contact',
  });

  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40 pb-28 bg-background">
        <section className="container-editorial">
          <Reveal className="max-w-3xl mb-16">
            <p className="eyebrow mb-6">Contact</p>
            <h1 className="display-section text-foreground text-balance">
              Tell us about your{' '}
              <span className="gold-text">next project.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
              We reply to every serious inquiry within one working day. Share as
              much or as little as you like — we'll take it from there.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal as="div" delay={0.1} className="lg:col-span-7">
              <InquiryForm />
            </Reveal>
            <Reveal as="div" delay={0.2} className="lg:col-span-4 lg:col-start-9 space-y-10">
              <div className="space-y-5 text-foreground/80">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-1">Email</p>
                    <a href={`mailto:${email}`} className="hover:text-secondary transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-1">Phone</p>
                    <a href={getPhoneHref(phone)} className="hover:text-secondary transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-1">Studio</p>
                    {address}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-1">Hours</p>
                    Mon–Fri · 9am – 6pm GMT
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/60 border border-border">
                <p className="font-display text-xl mb-2">Prefer a call?</p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Send the form first — we'll book a 30-minute discovery call once
                  we have the basics.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
