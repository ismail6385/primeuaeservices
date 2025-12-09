// Supabase Edge Function: Ticket Notification
// Sends email notification when new ticket is created
// Triggered via database webhook

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  try {
    const { record, old_record } = await req.json();

    // Only process new tickets (not updates)
    if (old_record) {
      return new Response(JSON.stringify({ message: 'Update ignored' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ticket = record;

    // Send email notification
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prime UAE Services <noreply@primeuaeservices.com>',
        to: ['primeuaeservices@gmail.com'],
        subject: `New Inquiry: ${ticket.name} - ${ticket.service || 'General'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${ticket.name}</p>
          <p><strong>Email:</strong> ${ticket.email}</p>
          <p><strong>Phone:</strong> ${ticket.phone}</p>
          <p><strong>Service:</strong> ${ticket.service || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${ticket.message}</p>
          <hr>
          <p><small>Ticket ID: ${ticket.id}</small></p>
        `,
        replyTo: ticket.email,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

