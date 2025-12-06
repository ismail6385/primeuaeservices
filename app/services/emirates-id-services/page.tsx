import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Emirates ID Services UAE | Application, Renewal & Replacement',
  description:
    'Complete Emirates ID services including new applications, renewals, replacements, and updates. Fast processing with biometric coordination in Dubai.',
};

export default function EmiratesIDPage() {
  return (
    <ServicePageTemplate
      subtitle="Emirates ID Processing"
      title="Emirates ID Services"
      description="Get your Emirates ID processed efficiently with our comprehensive services covering new applications, renewals, lost card replacements, and data updates. We coordinate biometric appointments, handle EIDA submission, and provide delivery to your doorstep. Essential identification for all UAE residents."
      benefits={[
        'New Emirates ID application with visa coordination',
        'Renewal services before expiry with biometric updates',
        'Lost or damaged card replacement processing',
        'Data update services for address or personal details',
        'Biometric appointment coordination at typing centers',
        'Home delivery of Emirates ID card upon issuance'
      ]}
      howItWorks={[
        {
          title: 'Document Collection',
          description:
            'Gather passport copy, visa copy, and entry stamp. For renewals, bring expired Emirates ID. We verify all requirements and book biometric appointments.',
        },
        {
          title: 'Biometric & Application',
          description:
            'Complete fingerprinting and eye scan at authorized typing center. Submit application to Emirates Identity Authority with all documentation.',
        },
        {
          title: 'Issuance & Delivery',
          description:
            'Track application status and receive notification when Emirates ID is ready. Collect from typing center or opt for home delivery service.',
        },
      ]}
      faqs={[
        {
          question: 'How long does it take to get a new Emirates ID?',
          answer:
            'New Emirates ID applications typically take 3-5 working days after biometric capture. During peak seasons, it may take up to 7-10 working days. Urgent processing options may be available for additional fees.',
        },
        {
          question: 'When should I renew my Emirates ID?',
          answer:
            'You should apply for Emirates ID renewal 30 days before expiry. Late renewal may result in fines. The renewal process requires updated biometrics even if your visa is still valid.',
        },
        {
          question: 'What if I lost my Emirates ID card?',
          answer:
            'Report the loss immediately and apply for a replacement. You\'ll need to visit a typing center for new biometrics, pay replacement fees, and submit a lost card declaration. The replacement process takes 3-5 working days.',
        },
        {
          question: 'Is Emirates ID mandatory for residents?',
          answer:
            'Yes, Emirates ID is mandatory for all UAE residents and must be carried at all times. It\'s required for government services, banking, utilities, telecom services, and various other transactions.',
        },
      ]}
    />
  );
}
