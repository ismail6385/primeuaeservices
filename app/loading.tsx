import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-brand-bg">
            <div className="text-center">
                <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-brand-gold" />
                <h2 className="text-xl font-semibold text-brand-navy animate-pulse">
                    Loading...
                </h2>
            </div>
        </div>
    );
}
