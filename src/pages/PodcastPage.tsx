import React, { useState } from 'react';
import { z } from 'zod';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useSEO } from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { submitLeadNotification } from '@/lib/leadNotifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const podcastGuestSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  guestName: z.string().trim().min(2, 'Please enter the guest name').max(120),
  guestRole: z.string().trim().max(160).optional().or(z.literal('')),
  guestLink: z.string().trim().max(300).optional().or(z.literal('')),
  topic: z.string().trim().min(10, 'Share the topic or angle').max(240),
  reason: z.string().trim().min(20, 'Tell us why they would be a good guest').max(1500),
});

const emptyPodcastGuestForm = {
  name: '',
  email: '',
  phone: '',
  guestName: '',
  guestRole: '',
  guestLink: '',
  topic: '',
  reason: '',
};

const PodcastPage = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyPodcastGuestForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useSEO({
    title: 'Podcast · Mosaic06 Studio',
    description:
      'A forthcoming Mosaic06 podcast on creative practice, founders and the work of building brands worth remembering.',
    path: '/podcast',
  });

  const setField = (key: keyof typeof emptyPodcastGuestForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleGuestSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = podcastGuestSchema.safeParse(form);

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.errors.forEach((error) => {
        if (error.path[0]) nextErrors[String(error.path[0])] = error.message;
      });
      setErrors(nextErrors);
      toast({
        title: 'Please check the form',
        description: 'A few podcast guest details need your attention.',
        variant: 'destructive',
      });
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitLeadNotification({
        formName: 'Podcast guest suggestion',
        source: 'podcast',
        contact: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
        },
        fields: {
          'Suggested guest': parsed.data.guestName,
          'Guest role / company': parsed.data.guestRole || 'Not provided',
          'Guest link': parsed.data.guestLink || 'Not provided',
          Topic: parsed.data.topic,
          Reason: parsed.data.reason,
        },
      });

      setForm(emptyPodcastGuestForm);
      setOpen(false);
      toast({
        title: 'Guest suggestion received',
        description: "Thank you — we'll review it for the podcast shortlist.",
      });
    } catch (error) {
      console.error('Podcast guest submit error:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Please try again or email hello@mosaic06studio.com directly.';
      toast({ title: 'Something went wrong', description: message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="pt-40 md:pt-48 pb-32 md:pb-48 border-b border-border/60 min-h-[80vh] flex items-center">
          <div className="container-editorial grid lg:grid-cols-12 gap-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <p className="eyebrow mb-8">Podcast</p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
                Conversations on craft,{' '}
                <span className="italic text-secondary">coming soon</span>.
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4 space-y-8" delay={0.15}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                A small, slow podcast on creative practice, founders and the work of building
                brands worth remembering. First conversations land later this season.
              </p>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-secondary hover:text-secondary transition-colors"
                  >
                    Suggest a guest <ArrowUpRight size={14} />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Suggest a podcast guest</DialogTitle>
                    <DialogDescription>
                      Nominate yourself or someone we should invite for a thoughtful conversation on craft,
                      creative practice, business or brand-building.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleGuestSubmit} className="space-y-5" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="podcast-name">Your name *</Label>
                        <Input
                          id="podcast-name"
                          value={form.name}
                          onChange={(event) => setField('name', event.target.value)}
                          placeholder="Your name"
                          maxLength={100}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="podcast-email">Your email *</Label>
                        <Input
                          id="podcast-email"
                          type="email"
                          value={form.email}
                          onChange={(event) => setField('email', event.target.value)}
                          placeholder="you@example.com"
                          maxLength={255}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="podcast-phone">Phone / WhatsApp</Label>
                        <Input
                          id="podcast-phone"
                          value={form.phone}
                          onChange={(event) => setField('phone', event.target.value)}
                          placeholder="Optional"
                          maxLength={40}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="podcast-guest-name">Guest name *</Label>
                        <Input
                          id="podcast-guest-name"
                          value={form.guestName}
                          onChange={(event) => setField('guestName', event.target.value)}
                          placeholder="Your name or the guest's name"
                          maxLength={120}
                        />
                        {errors.guestName && <p className="text-xs text-destructive">{errors.guestName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="podcast-guest-role">Guest role / company</Label>
                        <Input
                          id="podcast-guest-role"
                          value={form.guestRole}
                          onChange={(event) => setField('guestRole', event.target.value)}
                          placeholder="Founder, designer, artist..."
                          maxLength={160}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="podcast-guest-link">Guest website / social link</Label>
                        <Input
                          id="podcast-guest-link"
                          value={form.guestLink}
                          onChange={(event) => setField('guestLink', event.target.value)}
                          placeholder="https://"
                          maxLength={300}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="podcast-topic">Conversation topic *</Label>
                      <Input
                        id="podcast-topic"
                        value={form.topic}
                        onChange={(event) => setField('topic', event.target.value)}
                        placeholder="What should we talk about?"
                        maxLength={240}
                      />
                      {errors.topic && <p className="text-xs text-destructive">{errors.topic}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="podcast-reason">Why would they be a good guest? *</Label>
                      <Textarea
                        id="podcast-reason"
                        value={form.reason}
                        onChange={(event) => setField('reason', event.target.value)}
                        rows={5}
                        placeholder="Tell us about their work, story, point of view, or why they should join the conversation."
                        maxLength={1500}
                      />
                      {errors.reason && <p className="text-xs text-destructive">{errors.reason}</p>}
                    </div>

                    <DialogFooter>
                      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                        {submitting && <Loader2 className="animate-spin" size={14} />}
                        Send suggestion
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PodcastPage;
