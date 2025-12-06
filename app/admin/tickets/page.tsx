
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
import { Loader2, RefreshCw } from 'lucide-react';

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
};

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching tickets:', error);
        } else {
            setTickets(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTickets();
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

            <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Message</TableHead>
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
                                    <TableCell className="max-w-xs truncate" title={ticket.message}>
                                        {ticket.message}
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
                                        <select
                                            className="rounded border bg-transparent p-1 text-sm text-gray-700 dark:text-gray-300"
                                            value={ticket.status}
                                            onChange={(e) => updateStatus(ticket.id, e.target.value)}
                                        >
                                            <option value="open">Open</option>
                                            <option value="pending">Pending</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
