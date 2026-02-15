import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

type ContactPayload = {
  email: string;
  subject: string;
  message: string;
};

const toAddress = import.meta.env.CONTACT_TO ?? "eanathos@gmail.com";
const fromAddress = import.meta.env.RESEND_FROM;

const isValidPayload = (
  payload: Partial<ContactPayload>,
): payload is ContactPayload =>
  !!payload.email && !!payload.subject && !!payload.message;

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ message: "Configuration email manquante." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!fromAddress) {
    return new Response(
      JSON.stringify({ message: "Adresse d'envoi non configuree." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const formData = await request.formData();
  const payload = {
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!isValidPayload(payload)) {
    return new Response(
      JSON.stringify({ message: "Tous les champs sont obligatoires." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const html = `
      <html style="background: linear-gradient(135deg, #050a1c 0%, #08122b 45%, #0a1638 100%); color: #e9f0ff; font-family: 'Space Grotesk', 'Segoe UI', sans-serif;">
        <body style="margin:0; padding:0;">
          <div style="max-width:600px;margin:40px auto;padding:32px;background:#08122b;border-radius:16px;box-shadow:0 4px 24px rgba(44,166,255,0.12);">
            <h2 style="color:#2ca6ff;margin-bottom:24px;">Nouveau message de contact</h2>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Sujet:</strong> ${payload.subject}</p>
            <div style="margin:24px 0;padding:16px;background:#0a1638;border-radius:8px;color:#b6c4e6;">
              ${payload.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <footer style="border-top:1px solid rgba(44,166,255,0.12);padding:24px 0;text-align:center;color:#7f92b9;font-size:14px;background:#08122b;">
            © 2026 EAnathos. Tous droits réservés.<br>
            <a href="mailto:eanathos@gmail.com" style="color:#2ca6ff;text-decoration:none;">eanathos@gmail.com</a>
          </footer>
        </body>
      </html>
    `;
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: `[Portfolio] ${payload.subject}`,
      replyTo: payload.email,
      html,
      text: `Email: ${payload.email}\nSujet: ${payload.subject}\n\n${payload.message}`,
    });

    return new Response(JSON.stringify({ message: "Message envoye." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Resend error", error);
    return new Response(
      JSON.stringify({ message: "Erreur lors de l'envoi." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
