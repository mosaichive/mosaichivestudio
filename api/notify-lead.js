import nodemailer from 'nodemailer';

const DEFAULT_EMAIL_TO = 'mosaichive@gmail.com';
const DEFAULT_SMS_TO = '0544909011';

const jsonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const normalizePhone = (value) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (raw.startsWith('+')) return raw.replace(/[^\d+]/g, '');
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) return `+233${digits.slice(1)}`;
  if (digits.startsWith('233')) return `+${digits}`;
  return digits ? `+${digits}` : '';
};

const getBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body;
};

const asPlainObject = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : {};

const normalizeLead = (body) => {
  const contact = asPlainObject(body.contact);
  const fields = asPlainObject(body.fields);
  const name = String(contact.name || body.fullName || body.name || '').trim();
  const email = String(contact.email || body.email || '').trim();

  return {
    formName: String(body.formName || body.source || 'Website form').trim(),
    source: String(body.source || 'website').trim(),
    pageUrl: String(body.pageUrl || '').trim(),
    submittedAt: new Date().toISOString(),
    contact: {
      name,
      email,
      phone: String(contact.phone || body.phone || '').trim(),
      company: String(contact.company || body.company || '').trim(),
    },
    fields,
  };
};

const renderFieldRows = (fields) =>
  Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      const rendered = Array.isArray(value) ? value.join(', ') : String(value);
      return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(rendered).replace(/\n/g, '<br>')}</td></tr>`;
    })
    .join('');

const buildEmail = (lead) => {
  const fieldRows = renderFieldRows(lead.fields);
  const contactRows = renderFieldRows({
    Name: lead.contact.name,
    Email: lead.contact.email,
    Phone: lead.contact.phone || 'Not provided',
    Company: lead.contact.company || 'Not provided',
    Source: lead.formName,
    Page: lead.pageUrl,
    Submitted: lead.submittedAt,
  });

  const text = [
    `New ${lead.formName} submission`,
    '',
    `Name: ${lead.contact.name}`,
    `Email: ${lead.contact.email}`,
    `Phone: ${lead.contact.phone || 'Not provided'}`,
    `Company: ${lead.contact.company || 'Not provided'}`,
    `Page: ${lead.pageUrl || 'Not provided'}`,
    '',
    'Details:',
    ...Object.entries(lead.fields).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`),
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
      <h1>New ${escapeHtml(lead.formName)} submission</h1>
      <h2>Contact</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;">${contactRows}</table>
      ${fieldRows ? `<h2>Details</h2><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;">${fieldRows}</table>` : ''}
    </div>
  `;

  return { html, text };
};

const sendGmailEmail = async (lead) => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return { status: 'skipped', reason: 'Gmail SMTP credentials are not configured' };
  }

  const to = process.env.LEAD_EMAIL_TO || DEFAULT_EMAIL_TO;
  const from = process.env.GMAIL_FROM_EMAIL || `Mosaic Hive Website <${user}>`;
  const { html, text } = buildEmail(lead);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const result = await transporter.sendMail({
    from,
    to,
    subject: `New ${lead.formName}: ${lead.contact.name}`,
    html,
    text,
    replyTo: lead.contact.email,
  });

  return { status: 'sent', id: result.messageId || null, to, provider: 'gmail' };
};

const sendResendEmail = async (lead) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 'skipped', reason: 'RESEND_API_KEY is not configured' };
  }

  const to = process.env.LEAD_EMAIL_TO || DEFAULT_EMAIL_TO;
  const from = process.env.RESEND_FROM_EMAIL || 'Mosaic Hive Website <onboarding@resend.dev>';
  const { html, text } = buildEmail(lead);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New ${lead.formName}: ${lead.contact.name}`,
      html,
      text,
      reply_to: lead.contact.email,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      status: 'failed',
      reason: result?.message || result?.error || `Resend returned ${response.status}`,
    };
  }

  return { status: 'sent', id: result.id || null, to, provider: 'resend' };
};

const sendEmail = async (lead) => {
  const gmail = await sendGmailEmail(lead).catch((error) => ({
    status: 'failed',
    reason: error instanceof Error ? error.message : 'Gmail SMTP send failed',
  }));
  if (gmail.status === 'sent') return gmail;

  const resend = await sendResendEmail(lead).catch((error) => ({
    status: 'failed',
    reason: error instanceof Error ? error.message : 'Resend email send failed',
  }));
  if (resend.status === 'sent') return resend;

  return {
    status: resend.status === 'failed' ? 'failed' : gmail.status,
    reason:
      resend.status === 'failed'
        ? resend.reason
        : `${gmail.reason}; ${resend.reason}`,
    attempted: { gmail, resend },
  };
};

const sendSms = async (lead) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!accountSid || !authToken || (!from && !messagingServiceSid)) {
    return { status: 'skipped', reason: 'Twilio SMS credentials are not configured' };
  }

  const to = normalizePhone(process.env.LEAD_SMS_TO || DEFAULT_SMS_TO);
  const detail =
    lead.fields.Service ||
    lead.fields['Service category'] ||
    lead.fields.Specialization ||
    lead.fields.Message ||
    lead.formName;
  const message = [
    `New ${lead.formName}`,
    `${lead.contact.name} - ${lead.contact.phone || lead.contact.email}`,
    String(detail).slice(0, 120),
  ].join('\n');

  const params = new URLSearchParams({
    To: to,
    Body: message,
  });
  if (messagingServiceSid) {
    params.set('MessagingServiceSid', messagingServiceSid);
  } else {
    params.set('From', from);
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      status: 'failed',
      reason: result?.message || `Twilio returned ${response.status}`,
    };
  }

  return { status: 'sent', id: result.sid || null, to };
};

export default async function handler(req, res) {
  Object.entries(jsonHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const lead = normalizeLead(getBody(req));

    if (!lead.contact.name || !lead.contact.email) {
      res.status(400).json({ ok: false, error: 'Name and email are required' });
      return;
    }

    const [email, sms] = await Promise.all([sendEmail(lead), sendSms(lead)]);
    const sentCount = [email, sms].filter((channel) => channel.status === 'sent').length;
    const failedCount = [email, sms].filter((channel) => channel.status === 'failed').length;

    if (sentCount === 0) {
      res.status(failedCount ? 502 : 503).json({
        ok: false,
        code: failedCount ? 'notification_send_failed' : 'notifications_not_configured',
        error: failedCount
          ? 'Lead notifications failed to send.'
          : 'Lead notification providers are not configured yet.',
        channels: { email, sms },
      });
      return;
    }

    res.status(200).json({ ok: true, channels: { email, sms } });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unexpected notification error',
    });
  }
}
