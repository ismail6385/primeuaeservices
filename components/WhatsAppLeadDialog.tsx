
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppLeadDialogProps {
    children: React.ReactNode;
    phoneNumber?: string;
    className?: string;
}

export default function WhatsAppLeadDialog({
    children,
    phoneNumber = '971527707492',
    className,
}: WhatsAppLeadDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: 'Hello, I would like to enquire about your services.',
    });
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create ticket
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    email: 'whatsapp@lead.com', // Placeholder for WA leads
                    service: 'WhatsApp Inquiry',
                    source: 'whatsapp_click',
                }),
            });

            // Redirect to WhatsApp
            const text = encodeURIComponent(
                `Hi, my name is ${formData.name}. ${formData.message}`
            );
            window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');

            setOpen(false);
            setFormData({
                name: '',
                phone: '',
                message: 'Hello, I would like to enquire about your services.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chat on WhatsApp</DialogTitle>
                    <DialogDescription>
                        Please provide your details to start a WhatsApp chat with our team.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="wa-name">Name</Label>
                        <Input
                            id="wa-name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="wa-phone">Phone Number</Label>
                        <Input
                            id="wa-phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="Your Phone Number"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E]"
                        disabled={loading}
                    >
                        <MessageCircle className="h-5 w-5" />
                        {loading ? 'Starting Chat...' : 'Start WhatsApp Chat'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
