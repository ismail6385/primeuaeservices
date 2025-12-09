
'use client';

import { useEffect, useState } from 'react';
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, RefreshCw, Eye, Mail, Phone, Calendar, FileText, Search, Filter, AlertTriangle, Flag, User, DollarSign, StickyNote, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Ticket = {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    status: 'open' | 'closed' | 'pending';
    source: string;
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    assigned_to?: string;
    follow_up_date?: string;
    estimated_value?: number;
    notes?: string;
    lead_score?: number;
};

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [allTickets, setAllTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [editingNotes, setEditingNotes] = useState<string>('');
    const [replySubject, setReplySubject] = useState<string>('');
    const [replyMessage, setReplyMessage] = useState<string>('');
    const [sendingReply, setSendingReply] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    const fetchTickets = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching tickets:', error);
        } else {
            setAllTickets(data || []);
            setTickets(data || []);
        }
        setLoading(false);
    };

    // Filter and search tickets
    useEffect(() => {
        let filtered = [...allTickets];

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(ticket => ticket.status === statusFilter);
        }

        // Apply priority filter
        if (priorityFilter !== 'all') {
            filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
        }

        // Apply search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(ticket =>
                ticket.name.toLowerCase().includes(query) ||
                ticket.email.toLowerCase().includes(query) ||
                ticket.phone.toLowerCase().includes(query) ||
                (ticket.service && ticket.service.toLowerCase().includes(query)) ||
                ticket.message.toLowerCase().includes(query)
            );
        }

        setTickets(filtered);
    }, [searchQuery, statusFilter, priorityFilter, allTickets]);

    useEffect(() => {
        fetchTickets();

        // Set up real-time subscription
        const channel = supabase
            .channel('tickets-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tickets',
                },
                () => {
                    // Refresh tickets when any change occurs
                    fetchTickets();
                }
            )
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        const { error } = await supabase
            .from('tickets')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
        } else {
            fetchTickets();
            if (selectedTicket?.id === id) {
                setSelectedTicket({ ...selectedTicket, status: newStatus as any });
            }
        }
    };

    const updatePriority = async (id: number, newPriority: string) => {
        const { error } = await supabase
            .from('tickets')
            .update({ priority: newPriority })
            .eq('id', id);

        if (error) {
            console.error('Error updating priority:', error);
        } else {
            fetchTickets();
            if (selectedTicket?.id === id) {
                setSelectedTicket({ ...selectedTicket, priority: newPriority as any });
            }
        }
    };

    const updateNotes = async (id: number, notes: string) => {
        const { error } = await supabase
            .from('tickets')
            .update({ notes })
            .eq('id', id);

        if (error) {
            console.error('Error updating notes:', error);
        } else {
            fetchTickets();
            if (selectedTicket?.id === id) {
                setSelectedTicket({ ...selectedTicket, notes });
            }
        }
    };

    const handleSendReply = async () => {
        if (!selectedTicket || !replySubject.trim() || !replyMessage.trim()) {
            toast.error('Please fill in both subject and message');
            return;
        }

        setSendingReply(true);
        try {
            const response = await fetch('/api/admin/send-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketId: selectedTicket.id,
                    to: selectedTicket.email,
                    subject: replySubject,
                    message: replyMessage,
                    customerName: selectedTicket.name,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('Reply sent successfully!');
                setReplySubject('');
                setReplyMessage('');
                setShowReplyForm(false);
                // Refresh ticket to get updated notes
                fetchTickets();
            } else {
                throw new Error(data.error || 'Failed to send reply');
            }
        } catch (error: any) {
            console.error('Error sending reply:', error);
            toast.error(error.message || 'Failed to send reply. Please try again.');
        } finally {
            setSendingReply(false);
        }
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500 text-white';
            case 'high': return 'bg-orange-500 text-white';
            case 'normal': return 'bg-blue-500 text-white';
            case 'low': return 'bg-gray-500 text-white';
            default: return 'bg-gray-300 text-gray-700';
        }
    };

    const getPriorityIcon = (priority?: string) => {
        switch (priority) {
            case 'urgent': return <AlertTriangle className="h-3 w-3" />;
            case 'high': return <Flag className="h-3 w-3" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Support Tickets
                </h1>
                <Button onClick={fetchTickets} variant="outline" size="sm">
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by name, email, phone, service, or message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2 sm:w-48">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2 sm:w-48">
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Results Count */}
            {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all') && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {tickets.length} of {allTickets.length} tickets
                </div>
            )}

            <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
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
                        ) : tickets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No tickets found
                                </TableCell>
                            </TableRow>
                        ) : (
                            tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="whitespace-nowrap font-medium">
                                        {format(new Date(ticket.created_at), 'MMM d, yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>{ticket.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{ticket.email}</span>
                                            <span className="text-gray-500">{ticket.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{ticket.service || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge className={getPriorityColor(ticket.priority)}>
                                            <span className="flex items-center gap-1">
                                                {getPriorityIcon(ticket.priority)}
                                                {ticket.priority || 'normal'}
                                            </span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                ticket.status === 'open'
                                                    ? 'destructive'
                                                    : ticket.status === 'closed'
                                                        ? 'secondary'
                                                        : 'default'
                                            }
                                        >
                                            {ticket.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    setEditingNotes(ticket.notes || '');
                                                    setIsDialogOpen(true);
                                                }}
                                                className="h-8"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <select
                                                className="rounded border bg-transparent p-1 text-sm text-gray-700 dark:text-gray-300"
                                                value={ticket.status}
                                                onChange={(e) => updateStatus(ticket.id, e.target.value)}
                                            >
                                                <option value="open">Open</option>
                                                <option value="pending">Pending</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Ticket Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Ticket Details</DialogTitle>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="space-y-6 mt-4">
                            {/* Reset reply form when ticket changes */}
                            {(() => {
                                if (showReplyForm && replySubject) {
                                    // Reset form when dialog closes or ticket changes
                                    if (!isDialogOpen) {
                                        setShowReplyForm(false);
                                        setReplySubject('');
                                        setReplyMessage('');
                                    }
                                }
                                return null;
                            })()}
                            {/* Status and Priority Controls */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant={
                                            selectedTicket.status === 'open'
                                                ? 'destructive'
                                                : selectedTicket.status === 'closed'
                                                    ? 'secondary'
                                                    : 'default'
                                        }
                                        className="text-lg px-4 py-2"
                                    >
                                        {selectedTicket.status.toUpperCase()}
                                    </Badge>
                                    <Badge className={`${getPriorityColor(selectedTicket.priority)} text-lg px-4 py-2`}>
                                        <span className="flex items-center gap-1">
                                            {getPriorityIcon(selectedTicket.priority)}
                                            {(selectedTicket.priority || 'normal').toUpperCase()}
                                        </span>
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        value={selectedTicket.status}
                                        onChange={(e) => {
                                            updateStatus(selectedTicket.id, e.target.value);
                                            setSelectedTicket({ ...selectedTicket, status: e.target.value as any });
                                        }}
                                    >
                                        <option value="open">Open</option>
                                        <option value="pending">Pending</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <select
                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        value={selectedTicket.priority || 'normal'}
                                        onChange={(e) => {
                                            updatePriority(selectedTicket.id, e.target.value);
                                            setSelectedTicket({ ...selectedTicket, priority: e.target.value as any });
                                        }}
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <FileText className="h-5 w-5 text-brand-gold" />
                                    Customer Information
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedTicket.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                                            <a 
                                                href={`mailto:${selectedTicket.email}`}
                                                className="text-base font-semibold text-brand-navy hover:underline dark:text-brand-gold"
                                            >
                                                {selectedTicket.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                                            <div className="flex items-center gap-2">
                                                <a 
                                                    href={`tel:${selectedTicket.phone}`}
                                                    className="text-base font-semibold text-brand-navy hover:underline dark:text-brand-gold"
                                                >
                                                    {selectedTicket.phone}
                                                </a>
                                                <a
                                                    href={`https://wa.me/${selectedTicket.phone.replace(/[^0-9]/g, '')}?text=Hi ${encodeURIComponent(selectedTicket.name)}, regarding your inquiry about ${encodeURIComponent(selectedTicket.service || 'your request')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-green px-3 py-1 text-xs font-medium text-white transition-all hover:bg-brand-green/90"
                                                    title="Open WhatsApp Chat"
                                                >
                                                    <MessageCircle className="h-3 w-3" />
                                                    WhatsApp
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                                                {format(new Date(selectedTicket.created_at), 'MMM d, yyyy HH:mm')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Information */}
                            {selectedTicket.service && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Service</h3>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedTicket.service}</p>
                                </div>
                            )}

                            {/* Message */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Message</h3>
                                <p className="whitespace-pre-wrap text-base text-gray-900 dark:text-white">{selectedTicket.message}</p>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`https://wa.me/${selectedTicket.phone.replace(/[^0-9]/g, '')}?text=Hi ${encodeURIComponent(selectedTicket.name)}, regarding your inquiry about ${encodeURIComponent(selectedTicket.service || 'your request')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brand-green/90"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Reply on WhatsApp
                                </a>
                                <a
                                    href={`mailto:${selectedTicket.email}?subject=Re: ${encodeURIComponent(selectedTicket.service || 'Your Inquiry')}`}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                >
                                    <Mail className="h-4 w-4" />
                                    Reply via Email
                                </a>
                            </div>

                            {/* Reply to Customer Section */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-brand-gold" />
                                        <Label className="text-base font-semibold text-gray-900 dark:text-white">Send Email Reply</Label>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setShowReplyForm(!showReplyForm);
                                            if (!showReplyForm) {
                                                setReplySubject(`Re: Inquiry about ${selectedTicket.service || 'your request'}`);
                                            }
                                        }}
                                    >
                                        {showReplyForm ? 'Cancel' : 'Send Email'}
                                    </Button>
                                </div>
                                
                                {showReplyForm && (
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <Label htmlFor="reply-subject">Subject *</Label>
                                            <Input
                                                id="reply-subject"
                                                value={replySubject}
                                                onChange={(e) => setReplySubject(e.target.value)}
                                                placeholder="Email subject"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="reply-message">Message *</Label>
                                            <Textarea
                                                id="reply-message"
                                                value={replyMessage}
                                                onChange={(e) => setReplyMessage(e.target.value)}
                                                placeholder="Type your reply message here..."
                                                className="mt-1 min-h-[150px] resize-none"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={handleSendReply}
                                                disabled={sendingReply || !replySubject.trim() || !replyMessage.trim()}
                                                className="bg-brand-gold hover:bg-brand-gold/90"
                                            >
                                                {sendingReply ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Send Reply
                                                    </>
                                                )}
                                            </Button>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Email will be sent to: <strong>{selectedTicket.email}</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Notes Section */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-3 flex items-center gap-2">
                                    <StickyNote className="h-5 w-5 text-brand-gold" />
                                    <Label className="text-base font-semibold text-gray-900 dark:text-white">Internal Notes</Label>
                                </div>
                                <Textarea
                                    placeholder="Add notes about this ticket..."
                                    value={editingNotes !== '' ? editingNotes : (selectedTicket.notes || '')}
                                    onChange={(e) => setEditingNotes(e.target.value)}
                                    onBlur={() => {
                                        if (editingNotes !== (selectedTicket.notes || '')) {
                                            updateNotes(selectedTicket.id, editingNotes);
                                        }
                                    }}
                                    className="min-h-[100px] resize-none"
                                />
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Notes are saved automatically when you click outside the field
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {selectedTicket.estimated_value && (
                                    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                        <DollarSign className="mt-1 h-5 w-5 text-brand-gold" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Value</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                AED {selectedTicket.estimated_value.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {selectedTicket.follow_up_date && (
                                    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                        <Calendar className="mt-1 h-5 w-5 text-brand-gold" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Follow-up Date</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {format(new Date(selectedTicket.follow_up_date), 'MMM d, yyyy HH:mm')}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {selectedTicket.lead_score !== undefined && selectedTicket.lead_score > 0 && (
                                    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                        <Flag className="mt-1 h-5 w-5 text-brand-gold" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Lead Score</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {selectedTicket.lead_score}/100
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Source */}
                            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Source: <span className="font-medium text-gray-900 dark:text-white">{selectedTicket.source}</span>
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
