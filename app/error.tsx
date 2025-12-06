'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
                <h2 className="mb-4 text-3xl font-bold text-brand-dark">
                    Something went wrong!
                </h2>
                <p className="mb-8 max-w-md text-gray-600">
                    We apologize for the inconvenience. An unexpected error occurred while loading this page.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <Button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="bg-brand-navy hover:bg-brand-dark gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white gap-2"
                    >
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 max-w-lg overflow-auto rounded bg-gray-100 p-4 text-left text-xs text-red-600">
                        <p className="font-bold">Error Details (Dev Only):</p>
                        <pre>{error.message}</pre>
                        {error.digest && <p>Digest: {error.digest}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
