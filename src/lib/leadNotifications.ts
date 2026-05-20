import { supabase } from '@/integrations/supabase/client';

type LeadContact = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
};

type LeadPayload = {
  formName: string;
  source: string;
  contact: LeadContact;
  fields: Record<string, unknown>;
  legacyServiceRequest?: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    service: string;
    serviceType: string;
    budget?: string;
    projectDetails: string;
    startDate?: string;
  };
};

type NotifyResponse = {
  ok?: boolean;
  error?: string;
  channels?: {
    email?: { status?: string; reason?: string };
    sms?: { status?: string; reason?: string };
  };
};

const parseResponse = async (response: Response) => {
  try {
    return (await response.json()) as NotifyResponse;
  } catch {
    return {} as NotifyResponse;
  }
};

const sendLegacyEmail = async (payload: LeadPayload) => {
  if (!payload.legacyServiceRequest) return false;

  const { error } = await supabase.functions.invoke('send-service-request', {
    body: payload.legacyServiceRequest,
  });

  if (error) throw error;
  return true;
};

export const submitLeadNotification = async (payload: LeadPayload) => {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const response = await fetch('/api/notify-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, pageUrl }),
  });
  const result = await parseResponse(response);

  const emailSent = result.channels?.email?.status === 'sent';

  if (!emailSent) {
    try {
      const legacyEmailSent = await sendLegacyEmail(payload);
      if (legacyEmailSent && result.ok) return { ...result, legacyEmailSent };
      if (legacyEmailSent && !response.ok) return { ok: true, legacyEmailSent, channels: result.channels };
    } catch (error) {
      if (!response.ok) throw error;
    }
  }

  if (!response.ok) {
    throw new Error(result.error ?? 'Unable to send the submission right now.');
  }

  return result;
};
