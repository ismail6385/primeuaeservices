import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Company Documents Typing Dubai | PRO Typing Services UAE',
  description:
    'Professional typing services for corporate documents, visa applications, and government submissions in Dubai.',
};

export default function CompanyDocumentsTypingPage() {
  return (
    <ServicePageTemplate
      subtitle="Professional Typing"
      title="Company Documents Typing"
      description="Professional typing services for all corporate documents, government applications, and official submissions in Dubai. Our experienced typists prepare visa applications, trade license documents, contracts, and attestation requests in proper formats accepted by UAE government departments."
      benefits={[
        'Expert typing in English and Arabic languages',
        'All government forms and applications formatted correctly',
        'Fast turnaround with same-day service available',
        'Liaison with government departments for submissions',
        'Document attestation and notarization coordination',
        'Digital and physical copies provided as needed'
      ]}
      howItWorks={[
        {
          title: 'Document Request',
          description:
            'Specify which documents you need typed - visa applications, contracts, applications, or attestation requests. Provide source materials and required information.',
        },
        {
          title: 'Professional Typing',
          description:
            'Our skilled typists prepare documents in proper government-accepted formats with accurate Arabic and English translations where required.',
        },
        {
          title: 'Review & Submission',
          description:
            'Documents reviewed for accuracy, printed, and submitted to relevant authorities. We handle any follow-up or corrections needed.',
        },
      ]}
      faqs={[
        {
          question: 'What types of documents can you type?',
          answer:
            'We type all corporate documents including visa applications, employment contracts, trade license applications, PRO letters, attestation requests, bank documents, partnership agreements, and general company correspondence.',
        },
        {
          question: 'Do you provide Arabic typing services?',
          answer:
            'Yes, we provide professional Arabic typing for all government documents and official correspondence. Many UAE government forms require Arabic versions or translations.',
        },
        {
          question: 'How long does document typing take?',
          answer:
            'Simple documents are typed same-day. Complex applications or contracts may take 1-2 business days. Urgent service is available for time-sensitive submissions.',
        },
      ]}
    />
  );
}
