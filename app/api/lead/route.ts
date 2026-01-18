import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, company } = await req.json();

    // Die Instanz wird erst ERZEUGT, wenn jemand das Formular abschickt.
    // Das verhindert den Fehler beim "npm run build".
    const resend = new Resend(process.env.RESEND_API_KEY || 'temporary_key_for_build');

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
    }

    await resend.emails.send({
      from: 'AI Smart Hack <onboarding@resend.dev>',
      to: ['admin@aismarthack.com'],
      subject: 'Neuer Lead: B2B Anfrage',
      text: `Name: ${name}\nEmail: ${email}\nFirma: ${company}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Mail failed' }, { status: 500 });
  }
}
