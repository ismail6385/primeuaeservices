import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FAQ, { FAQItem } from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';
import { useMemo } from 'react';

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  howItWorks: {
    title: string;
    description: string;
  }[];
  faqs: FAQItem[];
  heroFeatures?: string[];
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  benefits,
  howItWorks,
  faqs,
  heroFeatures = [],
}: ServicePageProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeuaeservices.com';
  const slugFromTitle = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    [title]
  );

  const serviceSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Prime UAE Services',
      url: siteUrl,
      telephone: '+971527707492',
      areaServed: 'AE',
    },
    areaServed: 'AE',
    serviceType: title,
  }), [description, siteUrl, title]);

  const breadcrumbSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteUrl}/services/${slugFromTitle}`,
      },
    ],
  }), [siteUrl, slugFromTitle, title]);

  return (
    <>
      <Hero
        subtitle={subtitle}
        title={title}
        description={description}
        ctaText="Get a Free Quote"
        ctaHref="/contact"
        features={heroFeatures}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
              Benefits & Features
            </h2>
            <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 rounded-xl border border-brand-muted/30 bg-brand-bg p-6 shadow-sm transition-all hover:shadow-md"
              >
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-brand-teal" />
                <p className="text-brand-text">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks steps={howItWorks} />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">Explore Related Services</h2>
            <p className="mt-2 text-brand-text">
              Continue your journey with our most-requested UAE visa and business services.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/services/employment-visa-uae"
              className="rounded-lg border border-brand-muted/30 bg-brand-bg px-5 py-4 text-brand-navy transition hover:border-brand-gold hover:bg-white hover:shadow"
            >
              Employment Visa Services in Dubai
            </Link>
            <Link
              href="/services/family-visa-uae"
              className="rounded-lg border border-brand-muted/30 bg-brand-bg px-5 py-4 text-brand-navy transition hover:border-brand-gold hover:bg-white hover:shadow"
            >
              Family Visa Sponsorship in UAE
            </Link>
            <Link
              href="/services/golden-visa-services"
              className="rounded-lg border border-brand-muted/30 bg-brand-bg px-5 py-4 text-brand-navy transition hover:border-brand-gold hover:bg-white hover:shadow"
            >
              Golden Visa Application Assistance
            </Link>
            <Link
              href="/services/complete-business-setup"
              className="rounded-lg border border-brand-muted/30 bg-brand-bg px-5 py-4 text-brand-navy transition hover:border-brand-gold hover:bg-white hover:shadow"
            >
              Business Setup & Company Formation in Dubai
            </Link>
            <Link
              href="/services/tasheel-services"
              className="rounded-lg border border-brand-muted/30 bg-brand-bg px-5 py-4 text-brand-navy transition hover:border-brand-gold hover:bg-white hover:shadow"
            >
              PRO & Tasheel Typing Services
            </Link>
            <Link
              href="/services/accounting-bookkeeping-dubai"
              className="rounded-lg border border-brand-muted/30 bg-brand-bg px-5 py-4 text-brand-navy transition hover:border-brand-gold hover:bg-white hover:shadow"
            >
              Accounting & Bookkeeping Compliance in UAE
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-brand-dark">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-brand-text">
            Contact us today for a free consultation and let our experts guide you through the process.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand-navy px-8 text-lg font-semibold text-white transition-all hover:bg-brand-navy/90"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand-green px-8 text-lg font-semibold text-white transition-all hover:bg-brand-green/90"
            >
              <a
                href="https://wa.me/971527707492"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <FAQ items={faqs} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
