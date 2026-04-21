import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ServiceRequestData = await req.json();
    console.log("Received service request:", data);

    const emailHtml = `
      <h1>New Service Request from ${data.fullName}</h1>
      <h2>Contact Information</h2>
      <ul>
        <li><strong>Name:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        ${data.company ? `<li><strong>Company:</strong> ${data.company}</li>` : ''}
      </ul>
      
      <h2>Service Details</h2>
      <ul>
        <li><strong>Service Category:</strong> ${data.service}</li>
        <li><strong>Specific Service:</strong> ${data.serviceType}</li>
        ${data.budget ? `<li><strong>Budget Range:</strong> ${data.budget}</li>` : ''}
        ${data.startDate ? `<li><strong>Preferred Start Date:</strong> ${data.startDate}</li>` : ''}
      </ul>
      
      <h2>Project Details</h2>
      <p>${data.projectDetails}</p>
      
      <hr>
      <p><em>This request was submitted via the website's Get Started form.</em></p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Mosaic Hive <onboarding@resend.dev>",
      to: ["mosaichive@gmail.com"],
      subject: `New Service Request: ${data.service} from ${data.fullName}`,
      html: emailHtml,
      reply_to: data.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-service-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
