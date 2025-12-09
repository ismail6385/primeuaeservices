import ServiceCard from '@/components/ServiceCard';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  FileText,
  Users,
  Award,
  Building2,
  CreditCard,
  BookOpen,
  UserCheck,
  Shield,
  Briefcase,
  FileCheck,
  Globe,
  Calculator,
  Landmark,
  FileSignature,
  ClipboardCheck,
} from 'lucide-react';

export const metadata = {
  title: 'UAE Visa & PRO Services | Complete Service List',
  description:
    'Comprehensive list of visa services, PRO services, and business setup solutions in Dubai. From employment visas to Golden Visa, we handle it all.',
};

const services = [
  {
    title: 'Employment Visa UAE',
    description:
      'Complete employment visa processing with medical tests, Emirates ID, and all documentation for your new UAE job.',
    icon: UserCheck,
    href: '/services/employment-visa-uae',
  },
  {
    title: 'Family Visa UAE',
    description:
      'Bring your loved ones to the UAE with comprehensive family visa services including sponsorship and documentation.',
    icon: Users,
    href: '/services/family-visa-uae',
  },
  {
    title: 'Golden Visa Services',
    description:
      'Expert assistance with UAE Golden Visa applications for investors, entrepreneurs, and talented professionals.',
    icon: Award,
    href: '/services/golden-visa-services',
  },
  {
    title: 'Freelance Visa UAE',
    description:
      'Obtain your freelance permit and visa to work independently in the UAE with full legal compliance.',
    icon: Briefcase,
    href: '/services/freelance-visa-uae',
  },
  {
    title: 'Emirates ID Services',
    description:
      'Quick Emirates ID application, renewal, and replacement services with tracking and delivery.',
    icon: CreditCard,
    href: '/services/emirates-id-services',
  },
  {
    title: 'Labour Contract Services',
    description:
      'Professional drafting and attestation of employment contracts compliant with UAE labor laws.',
    icon: FileSignature,
    href: '/services/labour-contract-services',
  },
  {
    title: 'Tasheel Services',
    description:
      'Complete Tasheel center services for visa processing, work permits, and labor-related documentation.',
    icon: FileCheck,
    href: '/services/tasheel-services',
  },
  {
    title: 'Amer Center Services',
    description:
      'Amer services for entry permits, visa status changes, fines payment, and general directorate services.',
    icon: Shield,
    href: '/services/amer-center-services',
  },
  {
    title: 'Company Documents Typing',
    description:
      'Professional typing services for all corporate documents, applications, and government submissions.',
    icon: FileText,
    href: '/services/company-documents-typing',
  },
  {
    title: 'VAT Registration UAE',
    description:
      'Complete VAT registration services for businesses operating in the UAE with FTA compliance.',
    icon: Calculator,
    href: '/services/vat-registration-uae',
  },
  {
    title: 'Corporate Tax Registration',
    description:
      'Expert assistance with UAE corporate tax registration and compliance for mainland and freezone companies.',
    icon: ClipboardCheck,
    href: '/services/corporate-tax-registration',
  },
  {
    title: 'Accounting & Bookkeeping Dubai',
    description:
      'Professional accounting and bookkeeping services tailored for UAE businesses of all sizes.',
    icon: BookOpen,
    href: '/services/accounting-bookkeeping-dubai',
  },
  {
    title: 'Bank Account Opening Assistance',
    description:
      'Assistance with opening corporate and personal bank accounts with major UAE banks.',
    icon: Landmark,
    href: '/services/bank-account-opening-assistance',
  },
  {
    title: 'Complete Business Setup',
    description:
      'End-to-end business formation services including licensing, registration, and visa processing.',
    icon: Building2,
    href: '/services/complete-business-setup',
  },
  {
    title: 'Company Documents Clearing',
    description:
      'Fast-track document clearing and attestation services for all government departments.',
    icon: Globe,
    href: '/services/company-documents-clearing',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Complete UAE Services"
        title="Our Services"
        description="Comprehensive visa and PRO services tailored to meet your specific needs in the UAE. From employment visas to business setup, we handle it all with expertise and efficiency."
        ctaText="Get Free Consultation"
        ctaHref="/contact"
        features={[
          '14+ specialized visa and PRO services',
          'Government-approved and licensed',
          'Fast processing with real-time tracking',
          'Transparent pricing, no hidden fees',
        ]}
      />

      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark">
              Visa Services
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>

          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
              />
            ))}
          </div>

          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark">
              PRO Services
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>

          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(4, 9).map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
              />
            ))}
          </div>

          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark">
              Business Services
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(9).map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-navy to-brand-teal py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Need Help Choosing a Service?
          </h2>
          <p className="mb-8 text-lg text-gray-200">
            Not sure which service you need? Contact us for a free consultation and we&apos;ll guide you to the right solution.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand-gold px-8 text-lg font-semibold text-brand-dark transition-all hover:bg-brand-gold/90"
            >
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-white bg-transparent px-8 text-lg font-semibold text-white transition-all hover:bg-white hover:text-brand-navy"
            >
              <a
                href="https://wa.me/971527707492"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
