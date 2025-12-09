// Test API to check if blog post insert works
// Access: POST /api/test/blog-insert

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, slug, status = 'draft' } = body;

        if (!title || !content || !slug) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: title, content, slug',
            }, { status: 400 });
        }

        // Try to insert a test post
        const postData = {
            title: title.trim(),
            slug: slug.trim(),
            content: content.trim(),
            status: status,
            category: 'general',
            excerpt: null,
            featured_image: null,
            tags: [],
            seo_title: title.trim(),
            seo_description: null,
        };

        console.log('Attempting to insert post:', postData);

        const { data, error } = await supabase
            .from('blog_posts')
            .insert([postData])
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({
                success: false,
                error: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Post inserted successfully',
            data: data,
        });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Unknown error',
        }, { status: 500 });
    }
}

