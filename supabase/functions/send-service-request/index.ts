import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ServiceRequestData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  serviceType: string;
  budget?: string;
  projectDetails: string;
  startDate?: string;
}

const escapeHtml = (value: unknown = "") =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const shouldRequireAuth = () =>
  ["1", "true", "yes", "on"].includes(
    String(Deno.env.get("SEND_SERVICE_REQUEST_REQUIRE_AUTH") ?? "").toLowerCase(),
  );

const verifyAuthHeader = async (authHeader: string) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase runtime environment is not configured");
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    throw new Error("Unauthorized");
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  const requireAuth = shouldRequireAuth();

  if (requireAuth || authHeader) {
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    try {
      await verifyAuthHeader(authHeader);
    } catch (error) {
      console.error("Auth validation failed:", error instanceof Error ? error.message : error);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  try {
    const data: ServiceRequestData = await req.json();
    console.log("Received service request from:", escapeHtml(data.email));

    const emailHtml = `
      <h1>New Service Request from ${escapeHtml(data.fullName)}</h1>
      <h2>Contact Information</h2>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(data.fullName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(data.phone)}</li>
        ${data.company ? `<li><strong>Company:</strong> ${escapeHtml(data.company)}</li>` : ''}
      </ul>
      
      <h2>Service Details</h2>
      <ul>
        <li><strong>Service Category:</strong> ${escapeHtml(data.service)}</li>
        <li><strong>Specific Service:</strong> ${escapeHtml(data.serviceType)}</li>
        ${data.budget ? `<li><strong>Budget Range:</strong> ${escapeHtml(data.budget)}</li>` : ''}
        ${data.startDate ? `<li><strong>Preferred Start Date:</strong> ${escapeHtml(data.startDate)}</li>` : ''}
      </ul>
      
      <h2>Project Details</h2>
      <p>${escapeHtml(data.projectDetails).replace(/\n/g, "<br>")}</p>
      
      <hr>
      <p><em>This request was submitted via the website's Get Started form.</em></p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Mosaic Hive <onboarding@resend.dev>",
      to: ["mosaichive@gmail.com"],
      subject: `New Service Request: ${escapeHtml(data.service)} from ${escapeHtml(data.fullName)}`,
      html: emailHtml,
      reply_to: data.email,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-service-request function:", error?.message ?? error);
    return new Response(
      JSON.stringify({ error: "Unable to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
