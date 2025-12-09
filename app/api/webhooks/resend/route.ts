// API Route: Resend Webhook Handler
// POST /api/webhooks/resend
// Handles email events from Resend (sent, delivered, opened, clicked, bounced, etc.)

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

// Verify webhook signature (optional but recommended for security)
function verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
): boolean {
    if (!secret) {
        console.warn('⚠️ RESEND_WEBHOOK_SECRET not set - skipping signature verification');
        return true; // Allow if secret not configured
    }

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}

// Resend webhook event types
type ResendWebhookEvent = 
    | 'email.sent'
    | 'email.delivered'
    | 'email.delivery_delayed'
    | 'email.complained'
    | 'email.bounced'
    | 'email.opened'
    | 'email.clicked'
    | 'email.unsubscribed';

interface ResendWebhookPayload {
    type: ResendWebhookEvent;
    created_at: string;
    data: {
        email_id: string;
        from: string;
        to: string[];
        subject?: string;
        created_at: string;
        // For bounce/complaint events
        bounce_type?: string;
        bounce_subtype?: string;
        reason?: string;
        // For click events
        link?: string;
        // For open events
        location?: {
            country?: string;
            region?: string;
            city?: string;
        };
    };
}

export async function POST(request: NextRequest) {
    try {
        // Get raw body for signature verification
        const rawBody = await request.text();
        const signature = request.headers.get('resend-signature') || '';

        // Verify webhook signature
        const webhookSecret = process.env.RESEND_WEBHOOK_SECRET || '';
        if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
            console.error('❌ Invalid webhook signature');
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        // Parse webhook payload
        const payload: ResendWebhookPayload = JSON.parse(rawBody);
        const { type, data } = payload;

        console.log(`📧 Resend webhook received: ${type}`, {
            email_id: data.email_id,
            to: data.to,
            subject: data.subject,
        });

        // Handle different event types
        switch (type) {
            case 'email.sent':
                await handleEmailSent(data);
                break;

            case 'email.delivered':
                await handleEmailDelivered(data);
                break;

            case 'email.opened':
                await handleEmailOpened(data);
                break;

            case 'email.clicked':
                await handleEmailClicked(data);
                break;

            case 'email.bounced':
                await handleEmailBounced(data);
                break;

            case 'email.complained':
                await handleEmailComplained(data);
                break;

            case 'email.delivery_delayed':
                await handleEmailDelayed(data);
                break;

            case 'email.unsubscribed':
                await handleEmailUnsubscribed(data);
                break;

            default:
                console.log(`⚠️ Unhandled webhook event type: ${type}`);
        }

        // Always return 200 to acknowledge receipt
        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error: any) {
        console.error('❌ Webhook processing error:', error);
        // Still return 200 to prevent Resend from retrying
        return NextResponse.json(
            { error: 'Processing failed', message: error.message },
            { status: 200 }
        );
    }
}

// Handle email sent event
async function handleEmailSent(data: ResendWebhookPayload['data']) {
    const logMessage = `✅ Email sent: ${data.email_id}`;
    console.log(logMessage);
    
    // You can store email tracking in a separate table or update tickets
    // For now, just log it
    await logEmailEvent(data.email_id, 'sent', data);
}

// Handle email delivered event
async function handleEmailDelivered(data: ResendWebhookPayload['data']) {
    const logMessage = `✅ Email delivered: ${data.email_id} to ${data.to.join(', ')}`;
    console.log(logMessage);
    
    await logEmailEvent(data.email_id, 'delivered', data);
    
    // Update ticket if this is a reply email
    await updateTicketEmailStatus(data, 'delivered');
}

// Handle email opened event
async function handleEmailOpened(data: ResendWebhookPayload['data']) {
    const logMessage = `👁️ Email opened: ${data.email_id}`;
    console.log(logMessage);
    
    await logEmailEvent(data.email_id, 'opened', data);
    
    // Update ticket engagement
    await updateTicketEmailStatus(data, 'opened');
}

// Handle email clicked event
async function handleEmailClicked(data: ResendWebhookPayload['data']) {
    const logMessage = `🖱️ Email clicked: ${data.email_id} - Link: ${data.link}`;
    console.log(logMessage);
    
    await logEmailEvent(data.email_id, 'clicked', data);
    
    // Update ticket engagement
    await updateTicketEmailStatus(data, 'clicked');
}

// Handle email bounced event
async function handleEmailBounced(data: ResendWebhookPayload['data']) {
    const logMessage = `❌ Email bounced: ${data.email_id} - Reason: ${data.reason || 'Unknown'}`;
    console.error(logMessage);
    
    await logEmailEvent(data.email_id, 'bounced', data);
    
    // Mark email as invalid in ticket
    await updateTicketEmailStatus(data, 'bounced');
    
    // Find ticket by recipient email and add note
    if (data.to && data.to.length > 0) {
        const recipientEmail = data.to[0];
        const { data: tickets } = await supabase
            .from('tickets')
            .select('id, notes, email')
            .eq('email', recipientEmail)
            .order('created_at', { ascending: false })
            .limit(1);

        if (tickets && tickets.length > 0) {
            const ticket = tickets[0];
            const bounceNote = `\n\n[Email Bounced - ${new Date().toLocaleString()}] ${data.reason || 'Email delivery failed'}`;
            const updatedNotes = (ticket.notes || '') + bounceNote;
            
            await supabase
                .from('tickets')
                .update({ 
                    notes: updatedNotes,
                    // Optionally mark as pending if email is invalid
                    // status: 'pending'
                })
                .eq('id', ticket.id);
        }
    }
}

// Handle email complained (spam) event
async function handleEmailComplained(data: ResendWebhookPayload['data']) {
    const logMessage = `⚠️ Email marked as spam: ${data.email_id}`;
    console.warn(logMessage);
    
    await logEmailEvent(data.email_id, 'complained', data);
    
    // Update ticket with spam complaint
    await updateTicketEmailStatus(data, 'complained');
}

// Handle email delivery delayed event
async function handleEmailDelayed(data: ResendWebhookPayload['data']) {
    const logMessage = `⏳ Email delivery delayed: ${data.email_id}`;
    console.log(logMessage);
    
    await logEmailEvent(data.email_id, 'delivery_delayed', data);
}

// Handle email unsubscribed event
async function handleEmailUnsubscribed(data: ResendWebhookPayload['data']) {
    const logMessage = `🚫 Email unsubscribed: ${data.email_id}`;
    console.log(logMessage);
    
    await logEmailEvent(data.email_id, 'unsubscribed', data);
}

// Log email event to database
async function logEmailEvent(
    emailId: string,
    eventType: string,
    data: any
) {
    try {
        // Find associated ticket by recipient email
        let ticketId = null;
        if (data.to && data.to.length > 0) {
            const recipientEmail = data.to[0];
            const { data: tickets } = await supabase
                .from('tickets')
                .select('id')
                .eq('email', recipientEmail)
                .order('created_at', { ascending: false })
                .limit(1);

            if (tickets && tickets.length > 0) {
                ticketId = tickets[0].id;
            }
        }

        // Store event in database
        const { error } = await supabase
            .from('email_events')
            .insert({
                email_id: emailId,
                event_type: eventType,
                recipient_email: data.to?.[0] || null,
                subject: data.subject || null,
                ticket_id: ticketId,
                event_data: data,
            });

        if (error) {
            console.error('❌ Error storing email event:', error);
        } else {
            console.log(`📊 Email event stored: ${eventType} for email ${emailId}`);
        }
    } catch (error) {
        console.error('❌ Error in logEmailEvent:', error);
    }
}

// Update ticket based on email status
async function updateTicketEmailStatus(
    data: ResendWebhookPayload['data'],
    status: string
) {
    // Try to find ticket by recipient email
    if (!data.to || data.to.length === 0) return;

    const recipientEmail = data.to[0];
    
    // Find the most recent ticket for this email
    const { data: tickets } = await supabase
        .from('tickets')
        .select('id, notes, email')
        .eq('email', recipientEmail)
        .order('created_at', { ascending: false })
        .limit(1);

    if (!tickets || tickets.length === 0) {
        // Email might be from admin reply, try to find by subject
        if (data.subject) {
            // This is a simplified check - you might want to store email_id in ticket notes
            console.log(`📧 Email event for non-ticket email: ${recipientEmail}`);
        }
        return;
    }

    const ticket = tickets[0];
    const statusNote = `\n\n[Email ${status} - ${new Date().toLocaleString()}]`;
    const updatedNotes = (ticket.notes || '') + statusNote;

    await supabase
        .from('tickets')
        .update({ notes: updatedNotes })
        .eq('id', ticket.id);

    console.log(`✅ Updated ticket ${ticket.id} with email status: ${status}`);
}

// Allow GET for webhook verification (if Resend requires it)
export async function GET() {
    return NextResponse.json({
        message: 'Resend webhook endpoint is active',
        endpoint: '/api/webhooks/resend',
    });
}

