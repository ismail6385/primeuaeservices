import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import dynamicImport from 'next/dynamic';

// Dynamically import ShareButton to avoid SSR issues
const ShareButton = dynamicImport(() => import('@/components/ShareButton'), {
    ssr: false,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Force dynamic rendering - new posts work immediately without rebuild
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0; // Disable caching for immediate updates

// Optional: Generate static params for existing posts (for better performance)
// But dynamicParams=true ensures new posts work even if not in this list
export async function generateStaticParams() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('slug')
            .eq('status', 'published');

        if (error) {
            console.error('Error fetching blog posts for static generation:', error);
            return [];
        }

        if (!data || data.length === 0) {
            return [];
        }

        return data.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        return [];
    }
}

async function getBlogPost(slug: string) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error) {
            // Log error for debugging
            console.error('Error fetching blog post:', error);
            // If it's a "not found" error, return null
            if (error.code === 'PGRST116') {
                return null;
            }
            return null;
        }

        if (!data) {
            return null;
        }

        // Increment views (don't wait for this to complete)
        // Increment views (don't wait for this to complete)
        const incrementViews = async () => {
            const { error } = await supabase
                .from('blog_posts')
                .update({ views: (data.views || 0) + 1 })
                .eq('id', data.id);

            if (error) {
                console.error('Error incrementing views:', error);
            }
        };
        incrementViews();

        return data;
    } catch (error) {
        console.error('Unexpected error in getBlogPost:', error);
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeuaeservices.com';
    // Ensure params are resolved
    const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';

    if (!slug) {
        return {
            title: 'Post Not Found',
        };
    }

    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        alternates: {
            canonical: `${siteUrl}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
            images: post.featured_image ? [post.featured_image] : [],
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    // Ensure params are resolved (Next.js 15+ requirement)
    const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';

    if (!slug) {
        notFound();
    }

    const post = await getBlogPost(slug);

    if (!post) {
        console.error(`Blog post not found for slug: ${slug}`);
        notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeuaeservices.com';

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        description: post.excerpt || post.content?.slice(0, 160),
                        author: post.author_name || 'Prime UAE Services',
                        datePublished: post.published_at,
                        dateModified: post.updated_at || post.published_at,
                        image: post.featured_image ? [post.featured_image] : undefined,
                        mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: `${siteUrl}/`,
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Blog',
                                item: `${siteUrl}/blog`,
                            },
                            {
                                '@type': 'ListItem',
                                position: 3,
                                name: post.title,
                                item: `${siteUrl}/blog/${post.slug}`,
                            },
                        ],
                    }),
                }}
            />
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-brand-navy via-brand-dark to-brand-navy py-16 text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/blog"
                        className="mb-6 inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        {post.published_at && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(post.published_at), 'MMMM d, yyyy')}
                            </div>
                        )}
                        {post.author_name && (
                            <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {post.author_name}
                            </div>
                        )}
                        {post.views && (
                            <div className="text-gray-400">
                                {post.views} views
                            </div>
                        )}
                    </div>
                    <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-gray-200">
                            {post.excerpt}
                        </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {post.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-brand-gold/20 px-4 py-1 text-sm font-medium text-brand-gold"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Image */}
            {post.featured_image && (
                <section className="relative -mt-8">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="bg-white py-16 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <article className="prose prose-lg max-w-none dark:prose-invert">
                        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                            {post.content}
                        </div>
                    </article>

                    {/* Share Section */}
                    <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 font-semibold text-brand-navy hover:text-brand-gold dark:text-brand-gold transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Blog
                            </Link>
                            <ShareButton
                                title={post.title}
                                text={post.excerpt || ''}
                                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://primeuaeservices.com'}/blog/${post.slug}`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

