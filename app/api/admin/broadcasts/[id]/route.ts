import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { data, error } = await resend.broadcasts.get(params.id);

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { data, error } = await resend.broadcasts.remove(params.id);

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { subject, html } = body;

        // Note: Resend only allows updating scheduled broadcasts or drafts usually? 
        // The snippet provided: resend.broadcasts.update(id, options)

        // Construct options object dynamically
        const options: any = {};
        if (subject) options.subject = subject;
        if (html) options.html = html;

        const { data, error } = await resend.broadcasts.update(params.id, options);

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
