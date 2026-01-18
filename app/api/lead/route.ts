import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, company } = await req.json();

    // WICHTIG: Die Instanz darf NUR hier drin erstellt werden. 
    // Nicht oben in der Datei!
    const resend = new Resend(process.env.RESEND_API_KEY || 'build_placeholder');

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'build_placeholder') {
      return NextResponse.json({ error: 'Mail config missing' }, { status: 500 });
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
