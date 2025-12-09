import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import React from 'react';
import { ContactEmail } from '@/components/email-templates/ContactEmail';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Prime UAE Services <noreply@primeuaeservices.com>';

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
        let emailData = null;
        let emailError = null;
        
        try {
            const emailResult = await resend.emails.send({
                from: FROM_EMAIL,
                to: ['primeuaeservices@gmail.com'],
                replyTo: email,
                subject: `New Inquiry: ${name} - ${service || 'General'}`,
                react: React.createElement(ContactEmail, { 
                    name, 
                    email, 
                    phone, 
                    service: service || 'General', 
                    message 
                }),
            });
            emailData = emailResult.data;
            emailError = emailResult.error;
        } catch (err) {
            console.error('Resend email error:', err);
            emailError = err;
        }

        if (emailError) {
            console.error('Resend email error:', emailError);
            // Don't fail the request if email fails - ticket is already saved
        }

        // 3. Send notification via Edge Function (optional - for better architecture)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/edge/ticket-notification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    service,
                    message,
                    status: 'open',
                    source: 'website_contact_form',
                    created_at: new Date().toISOString(),
                }),
            });
        } catch (notifError) {
            // Silent fail - notification is optional
            console.log('Notification service unavailable:', notifError);
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
