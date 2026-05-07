import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { BadgeCheck, BriefcaseBusiness, Clock3, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { submitLeadNotification } from '@/lib/leadNotifications';
import { MarketplaceCreative, formatRate, getInitials } from '@/lib/marketplace';

const hireSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(120),
  email: z.string().trim().email('Please enter a valid email').max(255),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  projectTitle: z.string().trim().min(3, 'Add a project title').max(160),
  budget: z.string().trim().min(2, 'Share a budget range').max(120),
  timeline: z.string().trim().min(2, 'Share a timeline').max(120),
  brief: z.string().trim().min(30, 'Tell us more about the brief').max(2400),
});

type HireCreativeDialogProps = {
  creative: MarketplaceCreative | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaults?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
};

const HireCreativeDialog = ({
  creative,
  open,
  onOpenChange,
  defaults,
}: HireCreativeDialogProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectTitle: '',
    budget: '',
    timeline: '',
    brief: '',
  });

  useEffect(() => {
    if (!open) return;

    setErrors({});
    setForm({
      name: defaults?.name ?? '',
      email: defaults?.email ?? '',
      company: defaults?.company ?? '',
      phone: defaults?.phone ?? '',
      projectTitle: '',
      budget: '',
      timeline: '',
      brief: creative
        ? `We would like to explore a project with ${creative.name}.`
        : '',
    });
  }, [creative, defaults, open]);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!creative) return;

    const parsed = hireSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.errors.forEach((issue) => {
        if (issue.path[0]) nextErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(nextErrors);
      toast({
        title: 'Please check the brief',
        description: 'A few fields still need attention before we can send it.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await submitLeadNotification({
        formName: 'Marketplace hire request',
        source: 'marketplace',
        contact: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          company: parsed.data.company,
        },
        fields: {
          Creative: creative.name,
          Discipline: creative.category,
          Location: creative.location,
          'Project title': parsed.data.projectTitle,
          Budget: parsed.data.budget,
          Timeline: parsed.data.timeline,
          Brief: parsed.data.brief,
        },
        legacyServiceRequest: {
          fullName: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || 'Not provided',
          company: parsed.data.company || undefined,
          service: 'Creative marketplace',
          serviceType: `${creative.category} - ${creative.name}`,
          budget: parsed.data.budget,
          projectDetails: [
            `Requested creative: ${creative.name}`,
            `Project title: ${parsed.data.projectTitle}`,
            `Timeline: ${parsed.data.timeline}`,
            '',
            parsed.data.brief,
          ].join('\n'),
        },
      });

      toast({
        title: 'Brief sent',
        description: `Your request for ${creative.name} has been sent to the studio.`,
      });
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'We could not send the request right now.';
      toast({
        title: 'Submission failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-0">
        {creative ? (
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <section className={`bg-gradient-to-br ${creative.tone} p-8 text-white`}>
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.26em] text-white/70">
                        {creative.category}
                      </p>
                      <h2 className="mt-3 font-display text-4xl leading-none">
                        {creative.name}
                      </h2>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg font-semibold backdrop-blur">
                      {getInitials(creative.name)}
                    </div>
                  </div>

                  <p className="max-w-sm text-lg leading-8 text-white/85">
                    {creative.headline}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {creative.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/90">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/90">
                      {creative.availability}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl border border-white/15 bg-black/15 p-5 backdrop-blur">
                  <div className="grid gap-3 text-sm text-white/85">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{creative.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      <span>{creative.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" />
                      <span>{formatRate(creative.rateFrom)} starting range</span>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-white/78">{creative.engagement}</p>
                </div>
              </div>
            </section>

            <section className="bg-background p-6 md:p-8">
              <DialogHeader className="space-y-3">
                <DialogTitle className="font-display text-3xl font-medium">
                  Brief this creative
                </DialogTitle>
                <DialogDescription className="max-w-xl text-sm leading-7">
                  Share the shape of the project and we will route the request with
                  the right context so the conversation can move quickly.
                </DialogDescription>
              </DialogHeader>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="marketplace-name">Full name</Label>
                    <Input
                      id="marketplace-name"
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                      maxLength={120}
                    />
                    {errors.name ? (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketplace-email">Email</Label>
                    <Input
                      id="marketplace-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      maxLength={255}
                    />
                    {errors.email ? (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="marketplace-company">Company / organisation</Label>
                    <Input
                      id="marketplace-company"
                      value={form.company}
                      onChange={(event) => setField('company', event.target.value)}
                      maxLength={160}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketplace-phone">Phone</Label>
                    <Input
                      id="marketplace-phone"
                      value={form.phone}
                      onChange={(event) => setField('phone', event.target.value)}
                      maxLength={50}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="marketplace-project-title">Project title</Label>
                    <Input
                      id="marketplace-project-title"
                      value={form.projectTitle}
                      onChange={(event) => setField('projectTitle', event.target.value)}
                      maxLength={160}
                    />
                    {errors.projectTitle ? (
                      <p className="text-xs text-destructive">{errors.projectTitle}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketplace-budget">Budget range</Label>
                    <Input
                      id="marketplace-budget"
                      value={form.budget}
                      onChange={(event) => setField('budget', event.target.value)}
                      placeholder="e.g. GHS 8,000 - 15,000"
                      maxLength={120}
                    />
                    {errors.budget ? (
                      <p className="text-xs text-destructive">{errors.budget}</p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplace-timeline">Timeline</Label>
                  <Input
                    id="marketplace-timeline"
                    value={form.timeline}
                    onChange={(event) => setField('timeline', event.target.value)}
                    placeholder="e.g. Need first concepts in two weeks"
                    maxLength={120}
                  />
                  {errors.timeline ? (
                    <p className="text-xs text-destructive">{errors.timeline}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplace-brief">Project brief</Label>
                  <Textarea
                    id="marketplace-brief"
                    rows={7}
                    value={form.brief}
                    onChange={(event) => setField('brief', event.target.value)}
                    maxLength={2400}
                    placeholder="Share the context, what needs to be made, how the work will be used, and what success looks like."
                  />
                  {errors.brief ? (
                    <p className="text-xs text-destructive">{errors.brief}</p>
                  ) : null}
                </div>

                <DialogFooter className="sticky bottom-0 -mx-6 -mb-6 border-t border-border bg-background p-6 md:-mx-8 md:-mb-8 md:px-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full" disabled={submitting}>
                    {submitting ? 'Sending brief...' : 'Send project brief'}
                  </Button>
                </DialogFooter>
              </form>
            </section>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default HireCreativeDialog;
