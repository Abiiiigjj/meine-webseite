import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company } = await req.json();
    await resend.emails.send({
      from: 'AI Smart Hack <onboarding@resend.dev>',
      to: ['admin@aismarthack.com'], // Deine E-Mail
      subject: 'Neuer Lead: B2B Anfrage',
      text: `Name: ${name}\nEmail: ${email}\nFirma: ${company}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Mail failed' }, { status: 500 });
  }
}
