'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Check for error hash in URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash && hash.includes('error=')) {
                // Parse error from hash
                const params = new URLSearchParams(hash.substring(1)); // remove #
                const errorDescription = params.get('error_description');
                const errorMessage = errorDescription
                    ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
                    : 'Authentication error occurred';

                setError(errorMessage);
                // Clean URL
                router.replace('/admin/login');
            }
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Check if Supabase is configured
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                throw new Error('Supabase is not configured. Please check your environment variables.');
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (error) {
                // Provide user-friendly error messages
                if (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
                    throw new Error('Invalid email or password. Please check your credentials or create an admin account in Supabase.');
                }
                throw error;
            }

            if (data?.session) {
                router.push('/admin');
                router.refresh();
            } else {
                throw new Error('No session created. Please check your credentials.');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            let errorMessage = error.message || 'Failed to sign in. Please check your email and password.';
            
            // Network errors
            if (error.message?.includes('fetch') || error.message?.includes('network')) {
                errorMessage = 'Network error. Please check your internet connection and try again.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy p-4">
                        <Shield className="h-8 w-8 text-brand-gold" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to access your dashboard
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="flex flex-col gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="font-semibold">Login Failed</span>
                                </div>
                                <p className="pl-6">{error}</p>
                                {error.includes('Invalid login credentials') && (
                                    <p className="pl-6 text-xs text-red-500 dark:text-red-400">
                                        Note: Make sure you have created an admin user in Supabase first.
                                    </p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 pl-10 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <Link
                                    href="/admin/forgot-password"
                                    className="text-sm font-medium text-brand-navy hover:text-brand-dark dark:text-brand-gold"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 pl-10 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-brand-navy hover:bg-brand-dark text-white py-6 text-lg font-semibold shadow-lg shadow-brand-navy/20 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        <p className="font-semibold mb-1">🔧 Quick Fix: Set Password</p>
                        <p className="mb-2">Agar user Supabase mein hai lekin password set nahi hai:</p>
                        <div className="space-y-1 text-xs">
                            <p><strong>Method 1:</strong> Supabase Dashboard → Users → User select karo → Password field mein naya password dalo → "Update user"</p>
                            <p><strong>Method 2:</strong> "Send password reset email" button use karo</p>
                            <p className="mt-2"><strong>Important:</strong> "Email confirmed" ✅ check karna zaroori hai!</p>
                        </div>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                        <p className="font-semibold">📝 First time setup?</p>
                        <p>Supabase Dashboard → Authentication → Users → "Add user" → Email + Password dalo → "Auto Confirm User" ✅ check karo</p>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Prime UAE Services. All rights reserved.
                </p>
            </div>
        </div>
    );
}
