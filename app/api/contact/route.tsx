import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/email-templates/ContactEmail';

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
        }

        // 2. Send Email Notification via Resend using React Template
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'Prime UAE Website <onboarding@resend.dev>',
            to: ['primeuaeservices@gmail.com'],
            reply_to: email,
            subject: `New Inquiry: ${name} - ${service}`,
            react: ContactEmail({ name, email, phone, service, message }),
        });

        if (emailError) {
            console.error('Resend email error:', emailError);
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
