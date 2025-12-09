// Next.js API Route: Send Email (Alternative to Edge Function)
// This works without Supabase CLI setup

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, from, replyTo } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: from || 'Prime UAE Services <noreply@primeuaeservices.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo || undefined,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

