'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Loader2, AlertCircle, CheckCircle, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);

    // Check if user is authenticated (after clicking reset link)
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsResetMode(true);
            }
        };
        checkSession();

        // Also check URL parameters
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        
        if (token && type === 'recovery') {
            setIsResetMode(true);
        }
    }, [searchParams]);

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
            });

            if (error) throw error;

            setSuccess(true);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error: any) {
            setError(error.message || 'Failed to send reset email');
            toast.error(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;

            toast.success('Password reset successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/admin/login');
            }, 2000);
        } catch (error: any) {
            setError(error.message || 'Failed to reset password');
            toast.error(error.message || 'Failed to reset password');
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
                        {isResetMode ? 'Reset Password' : 'Forgot Password'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {isResetMode
                            ? 'Enter your new password below'
                            : 'Enter your email address and we\'ll send you a reset link'}
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    {!isResetMode ? (
                        // Request Reset Form
                        <form className="space-y-6" onSubmit={handleRequestReset}>
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-500 dark:bg-red-500/10">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-500/10">
                                    <CheckCircle className="h-4 w-4" />
                                    Password reset email sent! Please check your inbox and click the link to reset your password.
                                </div>
                            )}

                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <div className="relative mt-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 pl-10 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="admin@example.com"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-brand-navy hover:bg-brand-dark text-white py-6 text-lg font-semibold shadow-lg shadow-brand-navy/20 transition-all hover:scale-[1.02]"
                                disabled={loading || success}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>
                        </form>
                    ) : (
                        // Reset Password Form
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-500 dark:bg-red-500/10">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    New Password
                                </Label>
                                <div className="relative mt-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 pl-10 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter new password"
                                        minLength={6}
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </Label>
                                <div className="relative mt-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 pl-10 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Confirm new password"
                                        minLength={6}
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
                                        Resetting...
                                    </>
                                ) : (
                                    'Reset Password'
                                )}
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link
                            href="/admin/login"
                            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-dark dark:text-brand-gold"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Prime UAE Services. All rights reserved.
                </p>
            </div>
        </div>
    );
}

