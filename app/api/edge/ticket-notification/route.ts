// Next.js API Route: Ticket Notification (Alternative to Edge Function)
// This can be called from database webhook or directly

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle webhook format (Supabase sends { type, table, record, old_record })
    const ticket = body.record || body;

    if (!ticket.name || !ticket.email) {
      return NextResponse.json(
        { error: 'Invalid ticket data' },
        { status: 400 }
      );
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Prime UAE Services <noreply@primeuaeservices.com>',
      to: ['primeuaeservices@gmail.com'],
      subject: `New Inquiry: ${ticket.name} - ${ticket.service || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #0A4D94;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${ticket.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${ticket.email}">${ticket.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${ticket.phone}">${ticket.phone}</a></p>
            <p><strong>Service:</strong> ${ticket.service || 'Not specified'}</p>
            <p><strong>Status:</strong> <span style="color: ${ticket.status === 'open' ? 'red' : ticket.status === 'pending' ? 'orange' : 'green'}">${ticket.status}</span></p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-left: 4px solid #0A4D94; border-radius: 4px;">${ticket.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Ticket ID: ${ticket.id}</p>
          <p style="color: #666; font-size: 12px;">Created: ${new Date(ticket.created_at).toLocaleString()}</p>
        </div>
      `,
      replyTo: ticket.email,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
      emailId: data?.id,
    });
  } catch (error: any) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send notification' },
      { status: 500 }
    );
  }
}

