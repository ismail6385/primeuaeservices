// Next.js API Route: WhatsApp Notification (Alternative to Edge Function)
// This works without Supabase CLI setup

import { NextRequest, NextResponse } from 'next/server';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, message' },
        { status: 400 }
      );
    }

    // Format phone number
    const phoneNumber = to.startsWith('+') ? to : `+971${to.replace(/^0/, '')}`;
    const whatsappTo = `whatsapp:${phoneNumber}`;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      return NextResponse.json(
        { 
          error: 'Twilio credentials not configured',
          message: 'Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in environment variables'
        },
        { status: 500 }
      );
    }

    // Send via Twilio WhatsApp API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: TWILIO_WHATSAPP_FROM,
          To: whatsappTo,
          Body: message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send WhatsApp message');
    }

    return NextResponse.json({
      success: true,
      messageId: data.sid,
    });
  } catch (error: any) {
    console.error('Error sending WhatsApp:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}

