'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus, Send, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Broadcast {
    id: string;
    name?: string;
    subject: string;
    status: 'draft' | 'scheduled' | 'sent';
    created_at: string;
}

export default function BroadcastsPage() {
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [sendingId, setSendingId] = useState<string | null>(null);

    // Form State
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [segmentId, setSegmentId] = useState('78261eea-8f8b-4381-83c6-79fa7120f1cf'); // Default from snippet

    useEffect(() => {
        fetchBroadcasts();
    }, []);

    const fetchBroadcasts = async () => {
        try {
            const res = await fetch('/api/admin/broadcasts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!res.ok) {
                let errorMessage = `HTTP error! status: ${res.status}`;
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    // If JSON parsing fails, use default message
                }
                throw new Error(errorMessage);
            }
            
            const json = await res.json();
            if (json.data) {
                setBroadcasts(json.data.data || []); // Resend list returns { data: [] }
            } else if (json.error) {
                throw new Error(json.error);
            } else {
                setBroadcasts([]);
            }
        } catch (error: any) {
            console.error('Error fetching broadcasts:', error);
            const errorMsg = error.message || 'Failed to load broadcasts';
            
            // Check if it's a network error
            if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
                toast.error('Network error: Make sure the development server is running (npm run dev)');
            } else {
                toast.error(errorMsg);
            }
            setBroadcasts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/broadcasts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject,
                    html: content,
                    segmentId,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Failed to create broadcast' }));
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            const result = await res.json();
            toast.success('Broadcast created successfully');
            setIsOpen(false);
            setSubject('');
            setContent('');
            fetchBroadcasts();
        } catch (error: any) {
            console.error('Error creating broadcast:', error);
            toast.error(error.message || 'Failed to create broadcast');
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (id: string) => {
        try {
            setSendingId(id);
            const res = await fetch(`/api/admin/broadcasts/${id}/send`, {
                method: 'POST',
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Failed to send broadcast' }));
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            toast.success('Broadcast sent successfully');
            fetchBroadcasts();
        } catch (error: any) {
            console.error('Error sending broadcast:', error);
            toast.error(error.message || 'Failed to send broadcast');
        } finally {
            setSendingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this broadcast?')) return;

        try {
            const res = await fetch(`/api/admin/broadcasts/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Failed to delete broadcast' }));
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            toast.success('Broadcast deleted');
            fetchBroadcasts();
        } catch (error: any) {
            console.error('Error deleting broadcast:', error);
            toast.error(error.message || 'Failed to delete broadcast');
        }
    };

    const handleEdit = async (broadcast: Broadcast) => {
        try {
            setLoading(true);
            // Fetch full broadcast details
            const res = await fetch(`/api/admin/broadcasts/${broadcast.id}`);
            
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Failed to load broadcast' }));
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }
            
            const json = await res.json();
            
            if (json.data) {
                setSubject(json.data.subject || '');
                setContent(json.data.html || '');
                setSegmentId(json.data.segmentId || '78261eea-8f8b-4381-83c6-79fa7120f1cf');
                setEditingId(broadcast.id);
                setIsEditOpen(true);
            } else {
                throw new Error('No broadcast data found');
            }
        } catch (error: any) {
            console.error('Error loading broadcast:', error);
            toast.error(error.message || 'Failed to load broadcast details');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!editingId) return;

        try {
            setLoading(true);
            const res = await fetch(`/api/admin/broadcasts/${editingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject,
                    html: content,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Failed to update broadcast' }));
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            toast.success('Broadcast updated successfully');
            setIsEditOpen(false);
            setEditingId(null);
            setSubject('');
            setContent('');
            fetchBroadcasts();
        } catch (error: any) {
            console.error('Error updating broadcast:', error);
            toast.error(error.message || 'Failed to update broadcast');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-brand-navy">Broadcasts</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-brand-navy text-brand-gold hover:bg-brand-dark">
                            <Plus className="mr-2 h-4 w-4" /> New Broadcast
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create New Broadcast</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Enter email subject"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="segment">Segment ID</Label>
                                <Input
                                    id="segment"
                                    value={segmentId}
                                    onChange={(e) => setSegmentId(e.target.value)}
                                    placeholder="Audience Segment ID"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">HTML Content</Label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="<h1>Hello World</h1>"
                                    className="min-h-[200px] font-mono"
                                />
                            </div>
                            <Button onClick={handleCreate} disabled={loading} className="bg-brand-navy text-white">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Draft'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Edit Broadcast Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Edit Broadcast</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-subject">Subject</Label>
                                <Input
                                    id="edit-subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Enter email subject"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-segment">Segment ID</Label>
                                <Input
                                    id="edit-segment"
                                    value={segmentId}
                                    onChange={(e) => setSegmentId(e.target.value)}
                                    placeholder="Audience Segment ID"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-content">HTML Content</Label>
                                <Textarea
                                    id="edit-content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="<h1>Hello World</h1>"
                                    className="min-h-[200px] font-mono"
                                />
                            </div>
                            <Button onClick={handleUpdate} disabled={loading} className="bg-brand-navy text-white">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Update Broadcast'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Broadcasts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-navy" />
                                        <p className="mt-2 text-sm text-gray-500">Loading broadcasts...</p>
                                    </TableCell>
                                </TableRow>
                            ) : broadcasts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                        <p>No broadcasts found. Create one to get started.</p>
                                        <p className="mt-2 text-xs text-gray-400">
                                            If you expected to see broadcasts, check your RESEND_API_KEY configuration.
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                broadcasts.map((broadcast) => (
                                    <TableRow key={broadcast.id}>
                                        <TableCell className="font-medium">{broadcast.subject}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${broadcast.status === 'sent'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {broadcast.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{new Date(broadcast.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {broadcast.status !== 'sent' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(broadcast)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleSend(broadcast.id)}
                                                        disabled={sendingId === broadcast.id}
                                                    >
                                                        {sendingId === broadcast.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Send className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(broadcast.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
