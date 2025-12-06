import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-brand-bg px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-brand-navy">404</h1>
          <h2 className="mb-2 text-3xl font-bold text-brand-dark">
            Page Not Found
          </h2>
          <p className="text-lg text-brand-text">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-brand-navy px-8 text-white transition-all hover:bg-brand-navy/90"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-brand-navy px-8 text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              View Services
            </Button>
          </Link>
        </div>

        <div className="mt-12">
          <p className="mb-4 text-brand-text">
            Looking for our services? Here are some quick links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="text-brand-navy transition-colors hover:text-brand-teal"
            >
              All Services
            </Link>
            <Link
              href="/contact"
              className="text-brand-navy transition-colors hover:text-brand-teal"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="text-brand-navy transition-colors hover:text-brand-teal"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
