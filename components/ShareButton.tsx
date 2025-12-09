'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export default function ShareButton({ title, text, url }: { title: string; text?: string; url: string }) {
    const handleShare = () => {
        if (typeof window !== 'undefined' && navigator.share) {
            navigator.share({
                title,
                text: text || '',
                url,
            }).catch(() => {
                // Fallback to clipboard
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
            });
        } else if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
        </Button>
    );
}

