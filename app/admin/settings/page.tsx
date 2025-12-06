'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User, Lock, Moon, Sun, Monitor, Save } from 'lucide-react';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        tickets: true,
        updates: true
    });

    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate save
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-brand-dark dark:text-white">Settings</h1>
                    <p className="text-brand-text dark:text-gray-400">Manage your preferences and configurations</p>
                </div>
                <Button
                    onClick={handleSave}
                    className="bg-brand-navy hover:bg-brand-dark text-white"
                    disabled={loading}
                >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Profile Settings */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                        <User className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Admin User"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                defaultValue="admin@primeuae.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                        <Bell className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                <p className="text-sm text-gray-500">Receive emails for important updates</p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    checked={notifications.email}
                                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                                    className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-gold peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 dark:bg-gray-700 dark:border-gray-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">New Ticket Alerts</h3>
                                <p className="text-sm text-gray-500">Get notified when a new ticket is created</p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    checked={notifications.tickets}
                                    onChange={(e) => setNotifications({ ...notifications, tickets: e.target.checked })}
                                    className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-gold peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 dark:bg-gray-700 dark:border-gray-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                        <Monitor className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="cursor-pointer rounded-xl border-2 border-brand-gold bg-brand-bg/10 p-4 text-center">
                            <Sun className="mx-auto mb-2 h-6 w-6 text-brand-gold" />
                            <span className="text-sm font-medium text-brand-dark">Light</span>
                        </div>
                        <div className="cursor-pointer rounded-xl border border-gray-200 p-4 text-center hover:border-gray-300 dark:border-gray-700">
                            <Moon className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                            <span className="text-sm font-medium text-gray-500">Dark</span>
                        </div>
                        <div className="cursor-pointer rounded-xl border border-gray-200 p-4 text-center hover:border-gray-300 dark:border-gray-700">
                            <Monitor className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                            <span className="text-sm font-medium text-gray-500">System</span>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                        <Lock className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
                    </div>

                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300">
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300">
                            Enable Two-Factor Authentication
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
