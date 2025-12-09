'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <span className="hidden text-lg font-bold text-brand-dark sm:block">
                Prime UAE Services
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-brand-text transition-colors hover:text-brand-navy"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+971527707492"
              className="hidden items-center space-x-2 text-brand-text transition-colors hover:text-brand-navy lg:flex"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+971 52 770 7492</span>
            </a>
            <Button
              asChild
              className="hidden rounded-full bg-brand-green px-6 text-white transition-all hover:bg-brand-green/90 sm:inline-flex"
            >
              <a
                href="https://wa.me/971527707492"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Now
              </a>
            </Button>
            <Button
              asChild
              className="hidden rounded-full bg-brand-navy px-6 text-white transition-all hover:bg-brand-navy/90 md:inline-flex"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-brand-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-navy"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white py-4 md:hidden">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-2 text-base font-medium text-brand-text transition-colors hover:text-brand-navy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <a
                  href="tel:+971527707492"
                  className="flex items-center space-x-2 px-2 text-base font-medium text-brand-text transition-colors hover:text-brand-navy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  <span>+971 52 770 7492</span>
                </a>
                <Button
                  asChild
                  className="w-full rounded-full bg-brand-green text-white hover:bg-brand-green/90"
                >
                  <a
                    href="https://wa.me/971527707492"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    WhatsApp Now
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-full bg-brand-navy text-white hover:bg-brand-navy/90"
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get a Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
