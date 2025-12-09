'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Loader2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        status: 'draft' as 'draft' | 'published' | 'archived',
        category: 'general',
        tags: '',
        seo_title: '',
        seo_description: '',
    });

    useEffect(() => {
        // Get current user
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUser(data.user);
            }
        });
    }, []);

    // Auto-generate slug from title
    useEffect(() => {
        if (formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (!currentUser) {
                throw new Error('Not authenticated');
            }

            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                : [];

            // Validate required fields FIRST
            if (!formData.title || !formData.title.trim()) {
                throw new Error('Title is required');
            }

            if (!formData.content || !formData.content.trim()) {
                throw new Error('Content is required');
            }

            if (!formData.slug || !formData.slug.trim()) {
                throw new Error('Slug is required');
            }

            const postData: any = {
                title: formData.title.trim(),
                slug: formData.slug.trim(),
                excerpt: formData.excerpt?.trim() || null,
                content: formData.content.trim(),
                featured_image: formData.featured_image?.trim() || null,
                author_id: currentUser.id,
                author_name: currentUser.email?.split('@')[0] || 'Admin',
                status: formData.status,
                category: formData.category || 'general',
                tags: tagsArray,
                seo_title: formData.seo_title?.trim() || formData.title.trim(),
                seo_description: formData.seo_description?.trim() || formData.excerpt?.trim() || null,
            };

            if (formData.status === 'published') {
                postData.published_at = new Date().toISOString();
            }

            console.log('📝 Creating post with data:', {
                title: postData.title,
                slug: postData.slug,
                status: postData.status,
                category: postData.category,
                author_id: postData.author_id,
            });

            console.log('🔍 Checking authentication...');
            const { data: { user: authCheck } } = await supabase.auth.getUser();
            if (!authCheck) {
                throw new Error('Not authenticated. Please login again.');
            }
            console.log('✅ Authenticated as:', authCheck.email);

            console.log('💾 Inserting into blog_posts table...');
            const { data, error } = await supabase
                .from('blog_posts')
                .insert([postData])
                .select()
                .single();

            if (error) {
                console.error('❌ Supabase error:', error);
                console.error('Error details:', {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    hint: error.hint,
                });
                
                // Better error messages
                if (error.code === '23505') {
                    throw new Error('A post with this slug already exists. Please use a different slug.');
                } else if (error.code === '42501') {
                    throw new Error('Permission denied. Check RLS policies in Supabase. Run: supabase/migrations/06_complete_blog_setup.sql');
                } else if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
                    throw new Error('Blog table not found. Please run the blog setup SQL in Supabase: supabase/migrations/06_complete_blog_setup.sql');
                } else if (error.message?.includes('new row violates row-level security')) {
                    throw new Error('RLS policy blocking insert. Check "Admins can manage blog posts" policy exists.');
                }
                
                throw new Error(error.message || 'Failed to create post. Check console for details.');
            }

            if (!data) {
                throw new Error('Post created but no data returned');
            }

            console.log('Post created successfully:', data.id);
            toast.success('Post created successfully!');
            router.push('/admin/blog');
        } catch (error: any) {
            console.error('Error creating post:', error);
            const errorMessage = error.message || 'Failed to create post. Please check console for details.';
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Blog Post</h1>
                        <p className="text-gray-500 dark:text-gray-400">Create a new blog post</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Enter post title"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="slug">Slug *</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="slug"
                                            value={formData.slug}
                                            onChange={(e) => {
                                                const slug = e.target.value
                                                    .toLowerCase()
                                                    .replace(/[^a-z0-9-]/g, '-')
                                                    .replace(/-+/g, '-')
                                                    .replace(/(^-|-$)/g, '');
                                                setFormData(prev => ({ ...prev, slug }));
                                            }}
                                            placeholder="url-friendly-slug"
                                            required
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        URL-friendly version (auto-generated from title)
                                    </p>
                                    {formData.slug && (
                                        <p className="mt-1 text-xs text-brand-navy">
                                            Preview: /blog/{formData.slug}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                        placeholder="Brief description of the post"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="content">Content *</Label>
                                    <Textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        placeholder="Write your post content here..."
                                        rows={15}
                                        required
                                        className="font-mono text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish Settings */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Publish</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={saving || !formData.title || !formData.content}
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                {formData.status === 'published' ? 'Publish Post' : 'Save Post'}
                                            </>
                                        )}
                                    </Button>
                                    {formData.status === 'published' && formData.slug && (
                                        <p className="text-xs text-gray-500 text-center">
                                            Post will be live at:{' '}
                                            <Link
                                                href={`/blog/${formData.slug}`}
                                                target="_blank"
                                                className="text-brand-navy hover:underline inline-flex items-center gap-1"
                                            >
                                                /blog/{formData.slug}
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Category</h2>
                            <div>
                                <Label htmlFor="category">Post Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="visa-services">Visa Services</SelectItem>
                                        <SelectItem value="business-setup">Business Setup</SelectItem>
                                        <SelectItem value="pro-services">PRO Services</SelectItem>
                                        <SelectItem value="immigration">Immigration</SelectItem>
                                        <SelectItem value="legal">Legal</SelectItem>
                                        <SelectItem value="news">News & Updates</SelectItem>
                                        <SelectItem value="guides">Guides & Tips</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Featured Image</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="featured_image">Image URL</Label>
                                    <Input
                                        id="featured_image"
                                        type="url"
                                        value={formData.featured_image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                {formData.featured_image && (
                                    <div className="mt-4">
                                        <Label>Preview</Label>
                                        <div className="mt-2 rounded-lg border border-gray-200 overflow-hidden">
                                            <img
                                                src={formData.featured_image}
                                                alt="Featured image preview"
                                                className="w-full h-48 object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23ddd" width="400" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Tags</h2>
                            <div>
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    value={formData.tags}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">SEO</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="seo_title">SEO Title</Label>
                                    <Input
                                        id="seo_title"
                                        value={formData.seo_title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                                        placeholder="SEO optimized title"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="seo_description">SEO Description</Label>
                                    <Textarea
                                        id="seo_description"
                                        value={formData.seo_description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                                        placeholder="SEO meta description"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

