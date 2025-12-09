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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Loader2, RefreshCw, Mail, Search, Filter, CheckCircle, XCircle, Eye, MousePointerClick, AlertTriangle, Clock, Ban, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Link from 'next/link';

type EmailEvent = {
    id: string;
    email_id: string;
    event_type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'delivery_delayed' | 'unsubscribed';
    recipient_email: string | null;
    subject: string | null;
    ticket_id: number | null;
    event_data: any;
    created_at: string;
};

type EmailStats = {
    total: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    complained: number;
    delivery_rate: number;
    open_rate: number;
    click_rate: number;
};

export default function EmailEventsPage() {
    const [events, setEvents] = useState<EmailEvent[]>([]);
    const [allEvents, setAllEvents] = useState<EmailEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<EmailStats>({
        total: 0,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        complained: 0,
        delivery_rate: 0,
        open_rate: 0,
        click_rate: 0,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('email_events')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1000); // Limit to recent 1000 events

            if (error) {
                console.error('Error fetching email events:', error);
                toast.error('Failed to load email events');
                setAllEvents([]);
                setEvents([]);
            } else {
                setAllEvents(data || []);
                setEvents(data || []);
                calculateStats(data || []);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (eventsData: EmailEvent[]) => {
        const stats: EmailStats = {
            total: eventsData.length,
            sent: eventsData.filter(e => e.event_type === 'sent').length,
            delivered: eventsData.filter(e => e.event_type === 'delivered').length,
            opened: eventsData.filter(e => e.event_type === 'opened').length,
            clicked: eventsData.filter(e => e.event_type === 'clicked').length,
            bounced: eventsData.filter(e => e.event_type === 'bounced').length,
            complained: eventsData.filter(e => e.event_type === 'complained').length,
            delivery_rate: 0,
            open_rate: 0,
            click_rate: 0,
        };

        // Calculate rates
        if (stats.sent > 0) {
            stats.delivery_rate = (stats.delivered / stats.sent) * 100;
            stats.open_rate = (stats.opened / stats.sent) * 100;
            stats.click_rate = (stats.clicked / stats.sent) * 100;
        }

        setStats(stats);
    };

    useEffect(() => {
        fetchEvents();

        // Set up real-time subscription
        const channel = supabase
            .channel('email-events-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'email_events',
                },
                () => {
                    fetchEvents();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Filter events
    useEffect(() => {
        let filtered = [...allEvents];

        // Apply event type filter
        if (eventTypeFilter !== 'all') {
            filtered = filtered.filter(event => event.event_type === eventTypeFilter);
        }

        // Apply date filter
        if (dateFilter !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            switch (dateFilter) {
                case 'today':
                    filterDate.setHours(0, 0, 0, 0);
                    filtered = filtered.filter(event => new Date(event.created_at) >= filterDate);
                    break;
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    filtered = filtered.filter(event => new Date(event.created_at) >= filterDate);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    filtered = filtered.filter(event => new Date(event.created_at) >= filterDate);
                    break;
            }
        }

        // Apply search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(event =>
                event.recipient_email?.toLowerCase().includes(query) ||
                event.subject?.toLowerCase().includes(query) ||
                event.email_id.toLowerCase().includes(query)
            );
        }

        setEvents(filtered);
    }, [searchQuery, eventTypeFilter, dateFilter, allEvents]);

    const getEventIcon = (eventType: string) => {
        switch (eventType) {
            case 'sent': return <Mail className="h-4 w-4" />;
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            case 'opened': return <Eye className="h-4 w-4" />;
            case 'clicked': return <MousePointerClick className="h-4 w-4" />;
            case 'bounced': return <XCircle className="h-4 w-4" />;
            case 'complained': return <AlertTriangle className="h-4 w-4" />;
            case 'delivery_delayed': return <Clock className="h-4 w-4" />;
            case 'unsubscribed': return <Ban className="h-4 w-4" />;
            default: return <Mail className="h-4 w-4" />;
        }
    };

    const getEventColor = (eventType: string) => {
        switch (eventType) {
            case 'sent': return 'bg-blue-500 text-white';
            case 'delivered': return 'bg-green-500 text-white';
            case 'opened': return 'bg-purple-500 text-white';
            case 'clicked': return 'bg-indigo-500 text-white';
            case 'bounced': return 'bg-red-500 text-white';
            case 'complained': return 'bg-orange-500 text-white';
            case 'delivery_delayed': return 'bg-yellow-500 text-white';
            case 'unsubscribed': return 'bg-gray-500 text-white';
            default: return 'bg-gray-300 text-gray-700';
        }
    };

    const getEventLabel = (eventType: string) => {
        switch (eventType) {
            case 'sent': return 'Sent';
            case 'delivered': return 'Delivered';
            case 'opened': return 'Opened';
            case 'clicked': return 'Clicked';
            case 'bounced': return 'Bounced';
            case 'complained': return 'Complained';
            case 'delivery_delayed': return 'Delayed';
            case 'unsubscribed': return 'Unsubscribed';
            default: return eventType;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Events</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track email delivery and engagement</p>
                </div>
                <Button onClick={fetchEvents} variant="outline" size="sm">
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                        <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered</p>
                            <p className="mt-1 text-3xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</p>
                            <p className="mt-1 text-xs text-gray-500">{stats.delivery_rate.toFixed(1)}% rate</p>
                        </div>
                        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Opened</p>
                            <p className="mt-1 text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.opened}</p>
                            <p className="mt-1 text-xs text-gray-500">{stats.open_rate.toFixed(1)}% rate</p>
                        </div>
                        <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
                            <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clicked</p>
                            <p className="mt-1 text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.clicked}</p>
                            <p className="mt-1 text-xs text-gray-500">{stats.click_rate.toFixed(1)}% rate</p>
                        </div>
                        <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/20">
                            <MousePointerClick className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bounce/Complaint Alerts */}
            {(stats.bounced > 0 || stats.complained > 0) && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <div>
                            <p className="font-semibold text-red-900 dark:text-red-100">
                                {stats.bounced} bounced emails, {stats.complained} spam complaints
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300">
                                Review bounced emails to update invalid addresses
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search by email, subject, or email ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2 sm:w-48">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Event Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="opened">Opened</SelectItem>
                            <SelectItem value="clicked">Clicked</SelectItem>
                            <SelectItem value="bounced">Bounced</SelectItem>
                            <SelectItem value="complained">Complained</SelectItem>
                            <SelectItem value="delivery_delayed">Delayed</SelectItem>
                            <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2 sm:w-48">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">Last 7 Days</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Events Table */}
            <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Recipient</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Ticket</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Email ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : events.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    {allEvents.length === 0
                                        ? 'No email events found. Events will appear here when emails are sent via Resend.'
                                        : 'No events match your filters.'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>
                                        <Badge className={getEventColor(event.event_type)}>
                                            <span className="flex items-center gap-1">
                                                {getEventIcon(event.event_type)}
                                                {getEventLabel(event.event_type)}
                                            </span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {event.recipient_email || 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs truncate" title={event.subject || ''}>
                                            {event.subject || 'No subject'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {event.ticket_id ? (
                                            <Link
                                                href={`/admin/tickets`}
                                                className="text-brand-navy hover:underline dark:text-brand-gold inline-flex items-center gap-1"
                                            >
                                                Ticket #{event.ticket_id}
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {format(new Date(event.created_at), 'MMM d, yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs truncate font-mono text-xs" title={event.email_id}>
                                            {event.email_id}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Info Message */}
            {allEvents.length === 0 && !loading && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
                    <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100">No Email Events Yet</h3>
                            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                                Email events will appear here once you:
                            </p>
                            <ul className="mt-2 list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                <li>Set up Resend webhook (see RESEND_WEBHOOK_SETUP.md)</li>
                                <li>Send emails from admin panel (replies, broadcasts)</li>
                                <li>Receive webhook events from Resend</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

