'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import TicketsPage from './tickets/page';
import {
    MessageSquare,
    AlertCircle,
    Clock,
    CheckCircle2,
    TrendingUp,
    BarChart3
} from 'lucide-react';

type ServiceStats = {
    service: string;
    total: number;
    open: number;
    pending: number;
    closed: number;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        pending: 0,
        closed: 0
    });
    const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const { data, error } = await supabase
                .from('tickets')
                .select('status, service');

            if (error) throw error;

            // Overall stats
            const counts = {
                total: data?.length || 0,
                open: data?.filter(t => t.status === 'open').length || 0,
                pending: data?.filter(t => t.status === 'pending').length || 0,
                closed: data?.filter(t => t.status === 'closed').length || 0
            };

            setStats(counts);

            // Service-wise stats
            const serviceMap = new Map<string, ServiceStats>();

            data?.forEach((ticket: any) => {
                const service = ticket.service || 'No Service';
                if (!serviceMap.has(service)) {
                    serviceMap.set(service, {
                        service,
                        total: 0,
                        open: 0,
                        pending: 0,
                        closed: 0
                    });
                }

                const serviceStat = serviceMap.get(service)!;
                serviceStat.total++;
                if (ticket.status === 'open') serviceStat.open++;
                else if (ticket.status === 'pending') serviceStat.pending++;
                else if (ticket.status === 'closed') serviceStat.closed++;
            });

            // Convert to array and sort by total (descending)
            const serviceStatsArray = Array.from(serviceMap.values())
                .sort((a, b) => b.total - a.total);

            setServiceStats(serviceStatsArray);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const statCards = useMemo(() => [
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
    ], [stats]);

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

            {/* Service-wise Statistics */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white">
                                <BarChart3 className="h-5 w-5 text-brand-gold" />
                                Service-wise Statistics
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Breakdown of tickets by service type
                            </p>
                        </div>
                        <TrendingUp className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Clock className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                    ) : serviceStats.length === 0 ? (
                        <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No service data available
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {serviceStats.map((service, index) => {
                                const openPercent = service.total > 0 ? (service.open / service.total) * 100 : 0;
                                const pendingPercent = service.total > 0 ? (service.pending / service.total) * 100 : 0;
                                const closedPercent = service.total > 0 ? (service.closed / service.total) * 100 : 0;

                                return (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {service.service}
                                            </h3>
                                            <span className="rounded-full bg-brand-navy px-3 py-1 text-sm font-medium text-white">
                                                {service.total} Total
                                            </span>
                                        </div>

                                        {/* Progress Bars */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 dark:text-gray-400">Open</span>
                                                <span className="font-medium text-red-600 dark:text-red-400">
                                                    {service.open} ({openPercent.toFixed(0)}%)
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className="h-full bg-red-500 transition-all"
                                                    style={{ width: `${openPercent}%` }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                                                <span className="font-medium text-amber-600 dark:text-amber-400">
                                                    {service.pending} ({pendingPercent.toFixed(0)}%)
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className="h-full bg-amber-500 transition-all"
                                                    style={{ width: `${pendingPercent}%` }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 dark:text-gray-400">Closed</span>
                                                <span className="font-medium text-green-600 dark:text-green-400">
                                                    {service.closed} ({closedPercent.toFixed(0)}%)
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className="h-full bg-green-500 transition-all"
                                                    style={{ width: `${closedPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Tickets Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <TicketsPage />
            </div>
        </div>
    );
}
