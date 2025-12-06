import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase (Database Backup)
    const { error: dbError } = await supabase
      .from('tickets')
      .insert([
        {
          name,
          email,
          phone,
          service,
          message,
          status: 'open',
          source: 'website_contact_form',
          created_at: new Date().toISOString(),
        },
      ]);

    if (dbError) {
      console.error('Supabase error:', dbError);
      // We continue to send email even if DB fails, or throw? 
      // Better to throw so we know something went wrong, but maybe email is more important.
      // Let's log it but try to send email.
    }

    // 2. Send Email Notification via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Prime UAE Website <onboarding@resend.dev>',
      to: ['primeuaeservices@gmail.com'], // Admin Email
      reply_to: email, // Allow replying directly to the user
      subject: `New Lead: ${name} - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">New Contact Query</h2>
          <p><strong>Service Interested:</strong> ${service}</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
          </div>

          <h3 style="color: #0F172A; margin-top: 20px;">Message:</h3>
          <p style="background-color: #fff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
            ${message}
          </p>
          
          <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
            This email was sent from the contact form on primeuaeservices.com
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend email error:', emailError);
      // We don't fail the request if email fails, but we log it.
      // Or we could return a warning.
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will contact you soon.',
        emailId: emailData?.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
