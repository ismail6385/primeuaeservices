import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Tasheel Services UAE | Work Permit & Labor Services Dubai',
  description:
    'Complete Tasheel center services for visa processing, work permits, labor cards, and MOHRE submissions in Dubai.',
};

export default function TasheelServicesPage() {
  return (
    <ServicePageTemplate
      subtitle="Tasheel Center Services"
      title="Tasheel Services"
      description="Access comprehensive Tasheel center services for all labor-related transactions including work permits, visa processing, labor card issuance, and MOHRE submissions. Our authorized agents handle applications at official Tasheel centers, saving you time and ensuring compliance with Ministry regulations."
      heroFeatures={[
        'Work permit processing',
        'Labor card services',
        'Same-day processing',
        'Authorized agents'
      ]}
      benefits={[
        'Work permit applications and renewals processed efficiently',
        'New labor card issuance and replacements',
        'Visa stamping and status change requests',
        'Employment contract submission and attestation',
        'Absconding case handling and visa cancellations',
        'Direct liaison with Tasheel centers across UAE'
      ]}
      howItWorks={[
        {
          title: 'Service Selection',
          description:
            'Identify your Tasheel service need - work permit, labor card, visa change, or contract attestation. We confirm requirements and gather necessary documents.',
        },
        {
          title: 'Center Processing',
          description:
            'Our authorized agents visit Tasheel centers on your behalf, submit applications, and handle any queries or additional requirements from officials.',
        },
        {
          title: 'Completion & Delivery',
          description:
            'Receive approved documents, work permits, or labor cards. We provide updates throughout and deliver completed documents to your office.',
        },
      ]}
      faqs={[
        {
          question: 'What services are available at Tasheel centers?',
          answer:
            'Tasheel centers handle work permit applications, labor card issuance, visa processing, employment contract attestation, absconding reports, visa cancellations, and various MOHRE-related services for private sector companies.',
        },
        {
          question: 'Can I visit Tasheel center myself or must I use an agent?',
          answer:
            'Companies can visit Tasheel directly, but using authorized PRO services saves significant time and ensures proper documentation. Our agents have direct access and experience handling complex cases.',
        },
        {
          question: 'How long does Tasheel processing take?',
          answer:
            'Most Tasheel services are processed same-day or within 1-2 working days. Work permits typically take 2-3 days, while labor cards can be issued within hours if all documents are in order.',
        },
      ]}
    />
  );
}
