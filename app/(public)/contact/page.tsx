import ContactForm from '@/components/ContactForm';
import WhatsAppLeadDialog from '@/components/WhatsAppLeadDialog';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Prime UAE Services | Get a Free Consultation',
  description:
    'Contact Prime UAE Services for professional visa and PRO services. Get a free consultation and expert guidance for your UAE visa needs.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeuaeservices.com';

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Prime UAE Services',
      url: siteUrl + '/contact',
      telephone: '+971527707492',
      email: 'info@primeuaeservices.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Al Qusais',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+971527707492',
          contactType: 'customer service',
          areaServed: 'AE',
          availableLanguage: ['en', 'ar'],
        },
      ],
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Prime UAE Services',
    url: siteUrl,
    telephone: '+971527707492',
    email: 'info@primeuaeservices.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Al Qusais',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: 'AE',
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 09:00-14:00',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="bg-gradient-to-br from-brand-navy to-brand-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Have questions about our services? We&apos;re here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-brand-muted/30 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-brand-dark">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-brand-muted/30 bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark">
                  Email Us
                </h3>
                <p className="mb-2 text-brand-text">
                  Send us an email anytime
                </p>
                <a
                  href="mailto:info@primeuaeservices.com"
                  className="font-semibold text-brand-navy transition-colors hover:text-brand-teal"
                >
                  info@primeuaeservices.com
                </a>
              </div>

              <div className="rounded-xl border border-brand-muted/30 bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark">
                  Call or WhatsApp
                </h3>
                <p className="mb-2 text-brand-text">
                  Available during business hours
                </p>
                <a
                  href="tel:+971527707492"
                  className="font-semibold text-brand-navy transition-colors hover:text-brand-teal"
                >
                  +971 52 770 7492
                </a>
                <div className="mt-3">
                  <WhatsAppLeadDialog>
                    <button
                      className="inline-flex items-center rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-green/90"
                    >
                      WhatsApp Us
                    </button>
                  </WhatsAppLeadDialog>
                </div>
              </div>

              <div className="rounded-xl border border-brand-muted/30 bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-teal">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark">
                  Visit Us
                </h3>
                <p className="text-brand-text">
                  Al Qusais, Dubai, UAE
                </p>
              </div>

              <div className="rounded-xl border border-brand-muted/30 bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark">
                  Business Hours
                </h3>
                <div className="space-y-1 text-sm text-brand-text">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark">
              Find Us on the Map
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-brand-gold"></div>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div className="aspect-video w-full bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462565.7657409939!2d54.94717324999999!3d25.076022800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prime UAE Services Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-navy to-brand-teal py-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Need Immediate Assistance?
          </h2>
          <p className="mb-6 text-gray-200">
            For urgent visa matters, contact us directly via WhatsApp or phone for immediate support.
          </p>
          <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <WhatsAppLeadDialog>
              <button
                className="inline-flex items-center rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition-all hover:bg-brand-green/90"
              >
                WhatsApp Now
              </button>
            </WhatsAppLeadDialog>
            <a
              href="tel:+971527707492"
              className="inline-flex items-center rounded-full border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-brand-navy"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
