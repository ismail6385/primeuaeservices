import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Amer Center Services Dubai | Entry Permit & Visa Status Change',
  description:
    'Professional Amer services for entry permits, visa changes, fines payment, and immigration transactions in Dubai.',
};

export default function AmerCenterServicesPage() {
  return (
    <ServicePageTemplate
      subtitle="Immigration Services"
      title="Amer Center Services"
      description="Complete Amer center services for immigration and visa transactions in Dubai. We handle entry permits, visa status changes, overstay fine payments, visa extensions, and general directorate submissions. Expert representation at all Amer centers across Dubai."
      benefits={[
        'Entry permit applications for new employees and visitors',
        'Visa status changes from tourist to employment or residency',
        'Overstay and traffic fine payments and clearances',
        'Visa extension requests for eligible categories',
        'Inside country visa transfers and modifications',
        'Fast-track processing at designated Amer centers'
      ]}
      howItWorks={[
        {
          title: 'Requirement Analysis',
          description:
            'Determine your specific Amer service need - entry permit, status change, fine payment, or extension. Verify eligibility and required documentation.',
        },
        {
          title: 'Amer Submission',
          description:
            'Our PRO representatives visit designated Amer centers, submit applications, pay fees, and coordinate with immigration officials for approvals.',
        },
        {
          title: 'Document Delivery',
          description:
            'Collect approved entry permits, status change confirmations, or payment receipts. Deliver documents and provide guidance on next steps.',
        },
      ]}
      faqs={[
        {
          question: 'What is an Amer center and what services do they provide?',
          answer:
            'Amer centers are official typing and service centers authorized by Dubai General Directorate of Residency and Foreigners Affairs (GDRFA). They handle visa applications, entry permits, status changes, and immigration-related transactions.',
        },
        {
          question: 'Can I change my visa status inside UAE through Amer?',
          answer:
            'Yes, certain visa status changes are possible inside UAE through Amer centers, such as tourist to employment visa, or employment visa transfer between sponsors. Eligibility depends on current visa type and sponsor approval.',
        },
        {
          question: 'How much are overstay fines in Dubai?',
          answer:
            'Overstay fines are AED 25 per day for the first 6 months, then AED 50 per day thereafter, plus additional administrative fees. Grace periods may apply for certain visa types. We assist with fine calculation and payment.',
        },
      ]}
    />
  );
}
