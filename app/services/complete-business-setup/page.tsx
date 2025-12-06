import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Business Setup Dubai | Complete Company Formation UAE',
  description:
    'End-to-end business setup services in Dubai. Mainland, freezone, and offshore company formation with licensing and visa processing.',
};

export default function CompleteBusinessSetupPage() {
  return (
    <ServicePageTemplate
      subtitle="Company Formation"
      title="Complete Business Setup"
      description="Comprehensive business setup services covering every aspect of company formation in Dubai and across the UAE. From mainland commercial licenses to freezone entities, we handle trade name registration, license applications, office space, visa allocation, and bank account opening. Your complete solution for starting a business in the UAE."
      benefits={[
        'Mainland, freezone, and offshore company formation options',
        'Trade name registration and DED approval coordination',
        'Business license processing for all commercial activities',
        'Office space solutions including ejari registration',
        'Initial approval and external approvals from relevant authorities',
        'Shareholder visa processing and bank account opening support'
      ]}
      howItWorks={[
        {
          title: 'Business Consultation',
          description:
            'Discuss your business activities, budget, and requirements. Recommend optimal jurisdiction (mainland/freezone), legal structure, and license type based on your needs.',
        },
        {
          title: 'License & Registration',
          description:
            'Process trade name approval, MOA drafting, license applications, and external approvals. Arrange office space, complete initial approval, and secure business license.',
        },
        {
          title: 'Post-Setup Services',
          description:
            'Open bank accounts, process shareholder and employee visas, register for VAT if applicable, and set up essential business services for operations.',
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between mainland and freezone company setup?',
          answer:
            'Mainland companies can trade anywhere in UAE and internationally but may require local service agent (UAE national) for certain activities. Freezone companies offer 100% foreign ownership, tax benefits, and full repatriation of capital but have restrictions on mainland trading.',
        },
        {
          question: 'How much does it cost to setup a company in Dubai?',
          answer:
            'Costs vary significantly based on jurisdiction, license type, and business activities. Freezone setups typically range from AED 15,000 to AED 50,000+ annually. Mainland setups vary more widely depending on office requirements and activity approvals.',
        },
        {
          question: 'How many visas can a new company sponsor?',
          answer:
            'Visa quota depends on office space size and license type. Small offices typically allow 3-6 visas, while larger spaces allow more. Freezone companies receive visa allocation based on package purchased. Additional visas can often be purchased.',
        },
      ]}
    />
  );
}
