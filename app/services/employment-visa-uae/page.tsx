import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Employment Visa UAE | Fast Work Visa Processing in Dubai',
  description:
    'Get your UAE employment visa processed quickly with complete documentation, medical tests, and Emirates ID. Expert assistance for work permits in Dubai.',
};

export default function EmploymentVisaPage() {
  return (
    <ServicePageTemplate
      subtitle="Work Visa Services"
      title="Employment Visa UAE"
      description="Secure your UAE employment visa with our comprehensive service covering medical tests, Emirates ID, and complete documentation. We handle the entire process from application to approval, ensuring fast and hassle-free work permit processing for your new job in the UAE."
      benefits={[
        'Complete visa application processing with all required documentation',
        'Medical fitness test coordination and certificate processing',
        'Emirates ID application, biometrics, and delivery included',
        'Labour card and work permit processing with MOHRE',
        'Fast-track processing options available for urgent cases',
        'Entry permit stamping and visa status tracking throughout'
      ]}
      howItWorks={[
        {
          title: 'Submit Documents',
          description:
            'Provide us with your passport copy, job offer letter, educational certificates, and company sponsor details. We verify all requirements.',
        },
        {
          title: 'Processing & Medical',
          description:
            'We submit your application to immigration, coordinate medical fitness tests, and handle biometrics for Emirates ID.',
        },
        {
          title: 'Visa Issuance',
          description:
            'Receive your visa stamping, Emirates ID, and labour card. We provide tracking updates at every step until completion.',
        },
      ]}
      faqs={[
        {
          question: 'How long does it take to process an employment visa in UAE?',
          answer:
            'Typically, an employment visa takes 5-7 working days for standard processing. Fast-track options can reduce this to 2-3 working days, subject to immigration approval and document readiness.',
        },
        {
          question: 'What documents are required for an employment visa?',
          answer:
            'You need a valid passport with at least 6 months validity, passport-sized photographs, educational certificates attested, job offer letter from UAE company, company trade license copy, and completed application forms.',
        },
        {
          question: 'Is medical fitness test mandatory for employment visa?',
          answer:
            'Yes, a medical fitness test is mandatory for all employment visa applicants in the UAE. The test screens for communicable diseases and is conducted at approved medical centers.',
        },
        {
          question: 'Can I change jobs on my employment visa?',
          answer:
            'Yes, but you need to transfer your visa sponsorship to your new employer. The new company must apply for a transfer, and there are specific procedures and fees involved. We can assist with visa transfers.',
        },
      ]}
    />
  );
}
