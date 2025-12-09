'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, MessageSquare, Settings, LogOut, Shield, Loader2, Megaphone, FileText } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    // Always render login and forgot-password pages immediately, don't wait for auth check
    if (pathname === '/admin/login' || pathname === '/admin/forgot-password') {
        return <main className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</main>;
    }

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            try {
                // Safety timeout
                const timer = setTimeout(() => {
                    if (mounted) setLoading(false);
                }, 3000);

                const { data: { session }, error } = await supabase.auth.getSession();

                clearTimeout(timer);

                if (error) {
                    console.error('Auth session error:', error);
                    // If error, assume not authenticated
                    setAuthenticated(false);
                } else if (session) {
                    setAuthenticated(true);
                    // If logged in and on login page, go to dashboard
                    if (pathname === '/admin/login') {
                        router.replace('/admin');
                    }
                } else {
                    setAuthenticated(false);
                    // If not logged in and NOT on login/forgot-password page, go to login
                    if (pathname !== '/admin/login' && pathname !== '/admin/forgot-password') {
                        router.replace('/admin/login');
                    }
                }
            } catch (error) {
                console.error('Auth check unexpected error:', error);
                setAuthenticated(false);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;

            if (session) {
                setAuthenticated(true);
                if (pathname === '/admin/login') {
                    router.replace('/admin');
                }
            } else {
                setAuthenticated(false);
                if (pathname !== '/admin/login' && pathname !== '/admin/forgot-password') {
                    router.replace('/admin/login');
                }
            }
            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
            </div>
        );
    }

    // If on forgot-password page, show simple layout even if authenticated (for password reset flow)
    if (pathname === '/admin/forgot-password') {
        return <main className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</main>;
    }

    if (!authenticated) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                <Loader2 className="mb-4 h-8 w-8 animate-spin text-brand-gold" />
                <p className="text-gray-500">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy text-white shadow-xl transition-transform duration-300 lg:static lg:translate-x-0">
                <div className="flex h-20 items-center justify-center border-b border-white/10 px-6">
                    <div className="flex items-center gap-2">
                        <Shield className="h-8 w-8 text-brand-gold" />
                        <span className="text-xl font-bold tracking-wide text-white">
                            PRIME <span className="text-brand-gold">ADMIN</span>
                        </span>
                    </div>
                </div>

                <nav className="mt-8 space-y-2 px-4">
                    <Link
                        href="/admin"
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-brand-gold hover:text-brand-navy hover:shadow-lg hover:shadow-brand-gold/20 ${pathname === '/admin' ? 'bg-brand-gold text-brand-navy' : ''}`}
                    >
                        <LayoutDashboard className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/tickets"
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-brand-gold hover:text-brand-navy hover:shadow-lg hover:shadow-brand-gold/20 ${pathname === '/admin/tickets' ? 'bg-brand-gold text-brand-navy' : ''}`}
                    >
                        <MessageSquare className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Tickets</span>
                    </Link>
                    <Link
                        href="/admin/broadcasts"
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-brand-gold hover:text-brand-navy hover:shadow-lg hover:shadow-brand-gold/20 ${pathname === '/admin/broadcasts' ? 'bg-brand-gold text-brand-navy' : ''}`}
                    >
                        <Megaphone className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Broadcasts</span>
                    </Link>
                    <Link
                        href="/admin/blog"
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-brand-gold hover:text-brand-navy hover:shadow-lg hover:shadow-brand-gold/20 ${pathname?.startsWith('/admin/blog') ? 'bg-brand-gold text-brand-navy' : ''}`}
                    >
                        <FileText className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Blog</span>
                    </Link>
                    <Link
                        href="/admin/settings"
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-brand-gold hover:text-brand-navy hover:shadow-lg hover:shadow-brand-gold/20 ${pathname === '/admin/settings' ? 'bg-brand-gold text-brand-navy' : ''}`}
                    >
                        <Settings className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>

                <div className="absolute bottom-6 left-0 w-full px-4">
                    <div className="mb-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-brand-gold p-0.5">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-brand-gold">
                                    AD
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Admin User</p>
                                <p className="text-xs text-gray-400">admin@primeuae.com</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-8 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
