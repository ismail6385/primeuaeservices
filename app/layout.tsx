import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Prime UAE Services | Professional Visa & PRO Services in Dubai',
  description:
    'Leading provider of UAE visa services, PRO services, and business setup solutions in Dubai. Fast, compliant, and fully documented services.',
  keywords:
    'UAE visa services, Dubai PRO services, Golden Visa UAE, business setup Dubai, Emirates ID, employment visa UAE',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://primeuaeservices.com',
    siteName: 'Prime UAE Services',
    title: 'Prime UAE Services | Professional Visa & PRO Services in Dubai',
    description:
      'Leading provider of UAE visa services, PRO services, and business setup solutions in Dubai.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
