import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Testimonials from '@/components/Testimonials';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  FileText,
  Users,
  Award,
  Building2,
  CreditCard,
  UserCheck,
  Shield,
  Briefcase,
  FileCheck,
  CheckCircle2,
  Clock,
  HeadphonesIcon,
} from 'lucide-react';

export const metadata = {
  title: 'Prime UAE Services | Professional Visa & PRO Services in Dubai',
  description:
    'Leading UAE visa and PRO services provider in Al Qusais, Dubai. Fast employment visa, family visa, golden visa, and business setup services. Licensed & trusted since 2009.',
  keywords: 'UAE visa services, Dubai PRO services, employment visa UAE, family visa Dubai, golden visa, business setup Dubai, Al Qusais visa services',
  openGraph: {
    title: 'Prime UAE Services | Professional Visa & PRO Services in Dubai',
    description: 'Fast, compliant, and fully documented UAE visa processing. Your trusted partner in Al Qusais, Dubai.',
    type: 'website',
    locale: 'en_AE',
  },
};

const services = [
  {
    title: 'Employment Visa UAE',
    description:
      'Complete employment visa processing with medical tests, Emirates ID, and documentation.',
    icon: UserCheck,
    href: '/services/employment-visa-uae',
  },
  {
    title: 'Family Visa UAE',
    description:
      'Bring your loved ones to UAE with comprehensive family visa and sponsorship services.',
    icon: Users,
    href: '/services/family-visa-uae',
  },
  {
    title: 'Golden Visa Services',
    description:
      'Expert assistance with UAE Golden Visa for investors, entrepreneurs, and professionals.',
    icon: Award,
    href: '/services/golden-visa-services',
  },
  {
    title: 'Freelance Visa UAE',
    description:
      'Obtain your freelance permit and visa to work independently in the UAE legally.',
    icon: Briefcase,
    href: '/services/freelance-visa-uae',
  },
  {
    title: 'Emirates ID Services',
    description:
      'Quick Emirates ID application, renewal, and replacement with tracking.',
    icon: CreditCard,
    href: '/services/emirates-id-services',
  },
  {
    title: 'Complete Business Setup',
    description:
      'End-to-end business formation including licensing, registration, and visas.',
    icon: Building2,
    href: '/services/complete-business-setup',
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Licensed & Approved',
    description:
      'Fully licensed PRO service provider with government approvals.',
  },
  {
    icon: Award,
    title: 'Expert Team',
    description:
      'Experienced professionals with deep UAE immigration knowledge.',
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    description:
      'Quick turnaround with efficient processing and real-time tracking.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description:
      'Round-the-clock support via WhatsApp, phone, and email.',
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Pricing',
    description:
      'No hidden fees. Clear, upfront pricing for all services.',
  },
  {
    icon: FileCheck,
    title: 'End-to-End Support',
    description:
      'Complete assistance from application to approval.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Trusted UAE Visa Specialists Since 2009"
        title="Professional Visa & PRO Services in Dubai"
        description="Fast, compliant, and fully documented visa processing. Located in Al Qusais, Dubai - Your trusted partner for UAE immigration and business setup."
        ctaText="Get a Free Quote"
        ctaHref="/contact"
        features={[
          'Government-approved PRO services',
          'Fast visa processing & tracking',
          'Expert guidance at every step',
          'Transparent pricing, no hidden fees',
        ]}
      />

      {/* Services Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-navy/10 to-brand-teal/10 px-5 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-brand-gold"></div>
              <span className="text-sm font-semibold text-brand-navy">
                Our Services
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-brand-dark sm:text-4xl lg:text-5xl">
              Complete UAE Visa Solutions
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-brand-navy via-brand-gold to-brand-teal"></div>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-text">
              Professional visa and PRO services tailored to your needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                featured={index === 0} // First service is featured
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-gradient-to-r from-brand-navy to-brand-teal px-10 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Link href="/services">
                View All 15+ Services
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#0A4D94] to-brand-teal py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Why Prime UAE Services?
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gold/90 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-gold">
                  <item.icon className="h-7 w-7 text-brand-dark" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* SEO Content Section - Simplified */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-dark">
              Your Trusted Visa Partner in Dubai
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>

          <div className="mt-8 space-y-4 text-center">
            <p className="text-lg leading-relaxed text-brand-text">
              <strong className="text-brand-navy">Prime UAE Services</strong> is your trusted partner for all UAE visa and PRO services in Dubai. Located in <strong className="text-brand-navy">Al Qusais</strong>, we provide fast, compliant visa processing with over 15 years of experience.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-brand-navy/5 to-brand-teal/5 p-6">
                <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-brand-teal" />
                <h3 className="mb-2 font-bold text-brand-dark">Employment Visa</h3>
                <p className="text-sm text-brand-text">Complete visa processing with medical & Emirates ID</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-brand-navy/5 to-brand-teal/5 p-6">
                <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-brand-teal" />
                <h3 className="mb-2 font-bold text-brand-dark">Family Visa</h3>
                <p className="text-sm text-brand-text">Sponsor your family with expert guidance</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-brand-navy/5 to-brand-teal/5 p-6">
                <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-brand-teal" />
                <h3 className="mb-2 font-bold text-brand-dark">Business Setup</h3>
                <p className="text-sm text-brand-text">Complete company formation & licensing</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-brand-navy/10 via-brand-teal/10 to-brand-navy/10 p-6">
              <p className="text-lg font-semibold text-brand-dark">
                📞 Call us at <a href="tel:+971527707492" className="text-brand-navy hover:text-brand-teal">+971 52 770 7492</a> or visit our office in Al Qusais, Dubai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-navy to-brand-teal py-16 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-gray-100">
            Contact us for a free consultation. We&apos;re here to help!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-brand-gold px-8 text-lg font-semibold text-brand-dark shadow-lg transition-all hover:scale-105 hover:bg-brand-gold/90 sm:w-auto"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full rounded-full border-2 border-white bg-white/10 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-brand-navy sm:w-auto"
            >
              <a href="https://wa.me/971527707492" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Prime UAE Services',
            url: 'https://primeuaeservices.com',
            logo: 'https://primeuaeservices.com/logo.png',
            description: 'Professional UAE visa services, PRO services, and business setup solutions in Al Qusais, Dubai.',
            email: 'info@primeuaeservices.com',
            telephone: '+971527707492',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Al Qusais',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
          }),
        }}
      />

      {/* Structured Data - Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Prime UAE Services',
            image: 'https://primeuaeservices.com/logo.png',
            '@id': 'https://primeuaeservices.com',
            url: 'https://primeuaeservices.com',
            telephone: '+971527707492',
            email: 'info@primeuaeservices.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Al Qusais',
              addressLocality: 'Dubai',
              addressRegion: 'Dubai',
              addressCountry: 'AE',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 25.2854,
              longitude: 55.3844,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '14:00',
              },
            ],
            priceRange: '$$',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1500',
            },
          }),
        }}
      />
    </>
  );
}
