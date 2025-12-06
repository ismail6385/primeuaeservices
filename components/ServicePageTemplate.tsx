import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FAQ, { FAQItem } from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';

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
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  benefits,
  howItWorks,
  faqs,
}: ServicePageProps) {
  return (
    <>
      <Hero
        subtitle={subtitle}
        title={title}
        description={description}
        ctaText="Get a Free Quote"
        ctaHref="/contact"
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
                href="https://wa.me/971000000000"
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
    </>
  );
}
