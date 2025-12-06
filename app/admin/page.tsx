'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import TicketsPage from './tickets/page';
import {
    MessageSquare,
    AlertCircle,
    Clock,
    CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        pending: 0,
        closed: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data, error } = await supabase
                .from('tickets')
                .select('status');

            if (error) throw error;

            const counts = {
                total: data?.length || 0,
                open: data?.filter(t => t.status === 'open').length || 0,
                pending: data?.filter(t => t.status === 'pending').length || 0,
                closed: data?.filter(t => t.status === 'closed').length || 0
            };

            setStats(counts);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Tickets',
            value: stats.total,
            icon: MessageSquare,
            color: 'bg-blue-500',
            textColor: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            title: 'Open Tickets',
            value: stats.open,
            icon: AlertCircle,
            color: 'bg-red-500',
            textColor: 'text-red-500',
            bgColor: 'bg-red-500/10'
        },
        {
            title: 'Pending',
            value: stats.pending,
            icon: Clock,
            color: 'bg-amber-500',
            textColor: 'text-amber-500',
            bgColor: 'bg-amber-500/10'
        },
        {
            title: 'Resolved',
            value: stats.closed,
            icon: CheckCircle2,
            color: 'bg-green-500',
            textColor: 'text-green-500',
            bgColor: 'bg-green-500/10'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back to your control center</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                                <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {loading ? '-' : stat.value}
                                </h3>
                            </div>
                            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                            </div>
                        </div>
                        <div className={`absolute bottom-0 left-0 h-1 w-full ${stat.color}`}></div>
                    </div>
                ))}
            </div>

            {/* Recent Tickets Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <TicketsPage />
            </div>
        </div>
    );
}
