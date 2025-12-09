import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');

export async function GET() {
    try {
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: 'RESEND_API_KEY is not configured' },
                { status: 500 }
            );
        }

        const { data, error } = await resend.broadcasts.list();

        if (error) {
            console.error('Resend API error:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to fetch broadcasts' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Broadcasts GET error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: 'RESEND_API_KEY is not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { subject, html, segmentId, from = 'Prime UAE <onboarding@resend.dev>' } = body;

        if (!subject || !html) {
            return NextResponse.json(
                { error: 'Subject and HTML content are required' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.broadcasts.create({
            from,
            subject,
            html,
            segmentId,
        });

        if (error) {
            console.error('Resend API error:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to create broadcast' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Broadcasts POST error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
