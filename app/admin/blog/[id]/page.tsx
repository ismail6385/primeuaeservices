'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, Eye, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function EditBlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
    const [originalStatus, setOriginalStatus] = useState<'draft' | 'published' | 'archived'>('draft');

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
            toast.error('Failed to load post');
            router.push('/admin/blog');
        } else if (data) {
            setFormData({
                title: data.title || '',
                slug: data.slug || '',
                excerpt: data.excerpt || '',
                content: data.content || '',
                featured_image: data.featured_image || '',
                status: data.status || 'draft',
                category: data.category || 'general',
                tags: data.tags?.join(', ') || '',
                seo_title: data.seo_title || '',
                seo_description: data.seo_description || '',
            });
            setOriginalStatus(data.status || 'draft');
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
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

            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                : [];

            const postData: any = {
                title: formData.title.trim(),
                slug: formData.slug.trim(),
                excerpt: formData.excerpt?.trim() || null,
                content: formData.content.trim(),
                featured_image: formData.featured_image?.trim() || null,
                status: formData.status,
                category: formData.category || 'general',
                tags: tagsArray,
                seo_title: formData.seo_title?.trim() || formData.title.trim(),
                seo_description: formData.seo_description?.trim() || formData.excerpt?.trim() || null,
            };

            // Handle published_at date
            if (formData.status === 'published') {
                // Check if already published
                const { data: existing } = await supabase
                    .from('blog_posts')
                    .select('published_at')
                    .eq('id', postId)
                    .single();

                if (!existing?.published_at) {
                    // First time publishing
                    postData.published_at = new Date().toISOString();
                }
                // If already published, keep the original published_at date
            } else if (formData.status !== 'published' && originalStatus === 'published') {
                // Unpublishing - don't change published_at, just change status
            }

            console.log('Updating post with data:', {
                id: postId,
                title: postData.title,
                slug: postData.slug,
                status: postData.status,
                category: postData.category,
            });

            const { data, error } = await supabase
                .from('blog_posts')
                .update(postData)
                .eq('id', postId)
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
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
                    throw new Error('Permission denied. Check RLS policies in Supabase.');
                } else if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
                    throw new Error('Blog table not found. Please run the blog setup SQL in Supabase.');
                }
                
                throw error;
            }

            if (!data) {
                throw new Error('Post updated but no data returned');
            }

            console.log('Post updated successfully:', data.id);
            toast.success('Post updated successfully!');
            router.push('/admin/blog');
        } catch (error: any) {
            console.error('Error updating post:', error);
            const errorMessage = error.message || 'Failed to update post. Please check console for details.';
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

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
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Blog Post</h1>
                        <p className="text-gray-500 dark:text-gray-400">Update your blog post</p>
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
                                    {formData.slug && (
                                        <p className="mt-1 text-xs text-brand-navy">
                                            URL: /blog/{formData.slug}
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
                                                {formData.status === 'published' && originalStatus !== 'published' ? 'Publish Post' : 'Update Post'}
                                            </>
                                        )}
                                    </Button>
                                    {formData.status === 'published' && formData.slug && (
                                        <div className="space-y-2">
                                            <Link
                                                href={`/blog/${formData.slug}`}
                                                target="_blank"
                                                className="flex items-center justify-center gap-2 w-full text-sm text-brand-navy hover:underline"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Published Post
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                            <p className="text-xs text-gray-500 text-center">
                                                URL: /blog/{formData.slug}
                                            </p>
                                        </div>
                                    )}
                                </div>
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

