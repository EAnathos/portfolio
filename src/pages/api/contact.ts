import type { APIRoute } from 'astro';
import { Resend } from 'resend';

type ContactPayload = {
	email: string;
	subject: string;
	message: string;
};

const toAddress = import.meta.env.CONTACT_TO ?? 'eanathos@gmail.com';
const fromAddress = import.meta.env.RESEND_FROM;

const isValidPayload = (payload: Partial<ContactPayload>): payload is ContactPayload =>
	!!payload.email && !!payload.subject && !!payload.message;

export const POST: APIRoute = async ({ request }) => {
	if (!import.meta.env.RESEND_API_KEY) {
		return new Response(JSON.stringify({ message: 'Configuration email manquante.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (!fromAddress) {
		return new Response(
			JSON.stringify({ message: "Adresse d'envoi non configuree." }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}

	const formData = await request.formData();
	const payload = {
		email: String(formData.get('email') ?? '').trim(),
		subject: String(formData.get('subject') ?? '').trim(),
		message: String(formData.get('message') ?? '').trim(),
	};

	if (!isValidPayload(payload)) {
		return new Response(JSON.stringify({ message: 'Tous les champs sont obligatoires.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const resend = new Resend(import.meta.env.RESEND_API_KEY);
		await resend.emails.send({
			from: fromAddress,
			to: [toAddress],
			subject: `[Portfolio] ${payload.subject}`,
			replyTo: payload.email,
			text: `Email: ${payload.email}\nSujet: ${payload.subject}\n\n${payload.message}`,
		});

		return new Response(JSON.stringify({ message: 'Message envoye.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Resend error', error);
		return new Response(
			JSON.stringify({ message: "Erreur lors de l'envoi." }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};
