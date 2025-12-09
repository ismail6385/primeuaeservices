import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const type = requestUrl.searchParams.get('type');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }

    // If password recovery, redirect to forgot-password page with token
    if (type === 'recovery') {
        return NextResponse.redirect(requestUrl.origin + '/admin/forgot-password?type=recovery&token=' + code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin + '/admin');
}
