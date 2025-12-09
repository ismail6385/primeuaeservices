import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight, Filter } from 'lucide-react';
import BlogCategoryFilter from '@/components/BlogCategoryFilter';

export const metadata: Metadata = {
    title: 'Blog - Prime UAE Services | Visa & PRO Services Insights',
    description: 'Read our latest articles, guides, and insights about UAE visa services, PRO services, and business setup in Dubai.',
    keywords: 'UAE visa blog, Dubai business blog, visa services guide, PRO services articles',
    alternates: {
        canonical: '/blog',
    },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeuaeservices.com';

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'visa-services', label: 'Visa Services' },
    { value: 'business-setup', label: 'Business Setup' },
    { value: 'pro-services', label: 'PRO Services' },
    { value: 'immigration', label: 'Immigration' },
    { value: 'legal', label: 'Legal' },
    { value: 'news', label: 'News & Updates' },
    { value: 'guides', label: 'Guides & Tips' },
];

async function getBlogPosts(category?: string) {
    try {
        // First, try to get all published posts without category filter
        let query = supabase
            .from('blog_posts')
            .select('id, title, slug, excerpt, content, featured_image, author_name, published_at, views, tags, category, seo_title, seo_description')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (category && category !== 'all') {
            query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
            console.error('❌ Error fetching blog posts:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
            });
            
            // If it's a permission error, log it clearly
            if (error.code === '42501' || error.message?.includes('permission')) {
                console.error('🚨 PERMISSION ERROR: RLS policy might be missing!');
                console.error('💡 Fix: Run supabase/migrations/07_fix_blog_rls_policy.sql in Supabase SQL Editor');
            }
            
            return [];
        }

        // Debug: Log fetched posts
        if (data && data.length > 0) {
            console.log(`✅ Fetched ${data.length} published blog posts`);
            console.log('Posts:', data.map(p => ({ title: p.title, status: 'published', slug: p.slug })));
        } else {
            console.log('⚠️ No published posts found');
        }
        
        return data || [];
    } catch (error) {
        console.error('❌ Unexpected error in getBlogPosts:', error);
        return [];
    }
}

async function getCategoryCounts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('status', 'published');

    if (error || !data) return {};

    const counts: Record<string, number> = {};
    data.forEach((post: any) => {
        const cat = post.category || 'general';
        counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
}

// Force dynamic rendering to see new posts immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const category = searchParams.category || 'all';
    const posts = await getBlogPosts(category);
    const categoryCounts = await getCategoryCounts();
    const breadcrumbSchema = {
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
        ],
    };
    
    // Debug log
    console.log('Blog page - Posts count:', posts.length);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-brand-navy via-brand-dark to-brand-navy py-20 text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-5xl font-bold leading-tight sm:text-6xl">
                            Our <span className="bg-gradient-to-r from-brand-gold to-brand-teal bg-clip-text text-transparent">Blog</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-gray-200">
                            Insights, guides, and updates about UAE visa services, business setup, and more
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="bg-gray-50 py-16 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="mb-8">
                        <BlogCategoryFilter 
                            categories={categories} 
                            currentCategory={category}
                            categoryCounts={categoryCounts}
                        />
                    </div>

                    {/* Active Category Display */}
                    {category !== 'all' && (
                        <div className="mb-6 flex items-center gap-2">
                            <Filter className="h-5 w-5 text-brand-navy" />
                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                Category: {categories.find(c => c.value === category)?.label}
                            </span>
                            <Link
                                href="/blog"
                                className="ml-2 text-sm text-brand-navy hover:underline"
                            >
                                (Clear filter)
                            </Link>
                        </div>
                    )}

                    {/* Blog Posts Grid */}
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                {category !== 'all' 
                                    ? `No posts found in this category.`
                                    : 'No blog posts available yet. Check back soon!'
                                }
                            </p>
                            {category !== 'all' && (
                                <Link
                                    href="/blog"
                                    className="mt-4 inline-block text-brand-navy hover:underline"
                                >
                                    View all posts
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                                {category !== 'all' && ` in ${categories.find(c => c.value === category)?.label}`}
                            </div>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post: any) => (
                                    <article
                                        key={post.id}
                                        className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800"
                                    >
                                        {post.featured_image && (
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <img
                                                    src={post.featured_image}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            {/* Category Badge */}
                                            {post.category && post.category !== 'general' && (
                                                <Link
                                                    href={`/blog?category=${post.category}`}
                                                    className="mb-3 inline-block"
                                                >
                                                    <span className="rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-medium text-brand-navy hover:bg-brand-navy/20 transition-colors">
                                                        {categories.find(c => c.value === post.category)?.label || post.category}
                                                    </span>
                                                </Link>
                                            )}
                                            <div className="mb-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                {post.published_at && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {format(new Date(post.published_at), 'MMM d, yyyy')}
                                                    </div>
                                                )}
                                                {post.author_name && (
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        {post.author_name}
                                                    </div>
                                                )}
                                            </div>
                                            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-gold transition-colors">
                                                {post.title}
                                            </h2>
                                            {post.excerpt && (
                                                <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="mb-4 flex flex-wrap gap-2">
                                                    {post.tags.slice(0, 3).map((tag: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-2 font-semibold text-brand-navy hover:text-brand-gold dark:text-brand-gold transition-colors"
                                            >
                                                Read More
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
