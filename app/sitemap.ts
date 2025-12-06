import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://primeuaeservices.com';

  const services = [
    'employment-visa-uae',
    'family-visa-uae',
    'golden-visa-services',
    'freelance-visa-uae',
    'emirates-id-services',
    'labour-contract-services',
    'tasheel-services',
    'amer-center-services',
    'company-documents-typing',
    'vat-registration-uae',
    'corporate-tax-registration',
    'accounting-bookkeeping-dubai',
    'bank-account-opening-assistance',
    'complete-business-setup',
    'company-documents-clearing',
  ];

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...serviceUrls,
  ];
}
