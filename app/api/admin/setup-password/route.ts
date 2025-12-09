import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This is a helper API to set password for existing users
// Only use this in development or with proper authentication

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
    try {
        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Supabase credentials not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Use service role key for admin operations
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // First, find the user by email
        const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (listError) {
            throw listError;
        }

        const user = users.users.find(u => u.email === email);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found with this email' },
                { status: 404 }
            );
        }

        // Update user password
        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
            user.id,
            {
                password: password,
                email_confirm: true, // Also confirm email
            }
        );

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: 'Password set successfully',
            user: {
                id: data.user.id,
                email: data.user.email,
            }
        });
    } catch (error: any) {
        console.error('Setup password error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to set password' },
            { status: 500 }
        );
    }
}

