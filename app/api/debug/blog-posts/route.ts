// Debug API to check blog posts
// Access: /api/debug/blog-posts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({
                success: false,
                error: 'Supabase credentials are not configured',
            }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Get all posts
        const { data: allPosts, error: allError } = await supabase
            .from('blog_posts')
            .select('id, title, slug, status, published_at, category')
            .order('created_at', { ascending: false });

        // Get published posts
        const { data: publishedPosts, error: publishedError } = await supabase
            .from('blog_posts')
            .select('id, title, slug, status, published_at, category')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        return NextResponse.json({
            success: true,
            allPosts: {
                count: allPosts?.length || 0,
                posts: allPosts || [],
                error: allError,
            },
            publishedPosts: {
                count: publishedPosts?.length || 0,
                posts: publishedPosts || [],
                error: publishedError,
            },
            message: 'Check the data to see if posts are being fetched correctly',
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

