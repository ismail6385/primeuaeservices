'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, Plus, Edit, Trash2, Eye, Search, Filter, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

type BlogPost = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    status: 'draft' | 'published' | 'archived';
    category: string;
    author_name: string;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    views: number;
    tags: string[];
};

export default function BlogPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching posts:', error);
                toast.error('Failed to load blog posts');
                setAllPosts([]);
                setPosts([]);
            } else {
                setAllPosts(data || []);
                setPosts(data || []);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Filter and search posts
    useEffect(() => {
        let filtered = [...allPosts];

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(post => post.status === statusFilter);
        }

        // Apply search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post =>
                post.title?.toLowerCase().includes(query) ||
                post.excerpt?.toLowerCase().includes(query) ||
                post.slug?.toLowerCase().includes(query) ||
                post.author_name?.toLowerCase().includes(query) ||
                post.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        setPosts(filtered);
    }, [searchQuery, statusFilter, allPosts]);

    const handleDelete = async () => {
        if (!postToDelete) return;

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', postToDelete);

            if (error) {
                toast.error('Failed to delete post');
            } else {
                toast.success('Post deleted successfully');
                fetchPosts();
                setDeleteDialogOpen(false);
                setPostToDelete(null);
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('An error occurred while deleting');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-500 text-white';
            case 'draft':
                return 'bg-gray-500 text-white';
            case 'archived':
                return 'bg-amber-500 text-white';
            default:
                return 'bg-gray-300 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your blog content</p>
                </div>
                <Button onClick={() => router.push('/admin/blog/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                </Button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by title, excerpt, tags, or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2 sm:w-48">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Results Count */}
            {(searchQuery || statusFilter !== 'all') && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {posts.length} of {allPosts.length} posts
                </div>
            )}

            {/* Posts Table */}
            <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <div className="flex justify-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    {allPosts.length === 0 ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText className="h-12 w-12 text-gray-300" />
                                            <p>No blog posts yet</p>
                                            <Button
                                                size="sm"
                                                onClick={() => router.push('/admin/blog/new')}
                                                className="mt-2"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Create First Post
                                            </Button>
                                        </div>
                                    ) : (
                                        'No posts found matching your filters'
                                    )}
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {post.title}
                                            </div>
                                            {post.excerpt && (
                                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                    {post.excerpt}
                                                </div>
                                            )}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {post.category && post.category !== 'general' && (
                                                    <Badge variant="outline" className="text-xs bg-brand-navy/10 text-brand-navy">
                                                        {post.category}
                                                    </Badge>
                                                )}
                                                {post.tags && post.tags.length > 0 && (
                                                    <>
                                                        {post.tags.slice(0, 2).map((tag, idx) => (
                                                            <Badge key={idx} variant="outline" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                        {post.tags.length > 2 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{post.tags.length - 2}
                                                            </Badge>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{post.author_name || 'Admin'}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(post.status)}>
                                            {post.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {post.published_at
                                            ? format(new Date(post.published_at), 'MMM d, yyyy')
                                            : '-'}
                                    </TableCell>
                                    <TableCell>{post.views || 0}</TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {post.status === 'published' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                                                    className="h-8"
                                                    title="View published post"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => router.push(`/admin/blog/${post.id}`)}
                                                className="h-8"
                                                title="Edit post"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setPostToDelete(post.id);
                                                    setDeleteDialogOpen(true);
                                                }}
                                                className="h-8 text-red-600 hover:text-red-700"
                                                title="Delete post"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(false);
                                setPostToDelete(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
