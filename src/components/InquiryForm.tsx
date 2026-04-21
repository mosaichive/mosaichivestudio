import React, { useState } from 'react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  service: z.string().trim().min(1, 'Please choose a service'),
  budget: z.string().trim().min(1, 'Please choose a budget range'),
  details: z.string().trim().min(20, 'Tell us a little more (min. 20 chars)').max(2000),
});

const services = [
  'Brand Identity / Graphic Design',
  'Motion Graphics',
  'Video Production',
  'Website Development',
  'Digital Marketing',
  'Full creative partnership',
  'Other / Not sure yet',
];

const budgets = [
  'Under $5k',
  '$5k – $15k',
  '$15k – $40k',
  '$40k – $100k',
  '$100k+',
  'Not sure yet',
];

const InquiryForm = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;

    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) map[String(err.path[0])] = err.message;
      });
      setErrors(map);
      toast({
        title: 'Please check the form',
        description: 'A few fields need your attention.',
        variant: 'destructive',
      });
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-service-request', {
        body: {
          fullName: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || 'Not provided',
          company: parsed.data.company || undefined,
          service: parsed.data.service,
          serviceType: parsed.data.service,
          budget: parsed.data.budget,
          projectDetails: parsed.data.details,
        },
      });

      if (error) throw error;

      (e.target as HTMLFormElement).reset();
      toast({
        title: 'Inquiry received',
        description: "Thanks — we'll be in touch within one working day.",
      });
    } catch (err: any) {
      console.error('Inquiry submit error:', err);
      toast({
        title: 'Something went wrong',
        description: err?.message ?? 'Please try again or email hello@mosaic06studio.com directly.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" placeholder="Your name" required maxLength={100} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="you@brand.com" required maxLength={255} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="Optional" maxLength={40} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company / brand</Label>
          <Input id="company" name="company" placeholder="Optional" maxLength={120} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="service">Service needed *</Label>
          <select
            id="service"
            name="service"
            required
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm h-10"
            defaultValue=""
          >
            <option value="" disabled>Select a service</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Estimated budget *</Label>
          <select
            id="budget"
            name="budget"
            required
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm h-10"
            defaultValue=""
          >
            <option value="" disabled>Select a range</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Project details *</Label>
        <Textarea
          id="details"
          name="details"
          rows={6}
          placeholder="Tell us about the project, audience, timeline and anything we should know."
          maxLength={2000}
          required
        />
        {errors.details && <p className="text-xs text-destructive">{errors.details}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all disabled:opacity-60"
      >
        {submitting ? 'Sending…' : 'Send Inquiry'}
        <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
};

export default InquiryForm;
