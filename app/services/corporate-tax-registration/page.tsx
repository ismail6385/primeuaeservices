import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Corporate Tax Registration UAE | CT Registration Services Dubai',
  description:
    'Expert corporate tax registration services for UAE businesses. FTA registration, tax group formation, and compliance support.',
};

export default function CorporateTaxRegistrationPage() {
  return (
    <ServicePageTemplate
      subtitle="Corporate Tax Compliance"
      title="Corporate Tax Registration"
      description="Navigate UAE corporate tax registration with expert guidance for your mainland or freezone business. We handle Federal Tax Authority registration, tax group formation, and ensure compliance with 9% corporate tax regulations effective from June 2023. Essential for all UAE businesses except those specifically exempted."
      benefits={[
        'Corporate tax registration for mainland and freezone entities',
        'Tax group formation for businesses with multiple entities',
        'Small business relief threshold assessment and application',
        'Free zone qualifying income evaluation and documentation',
        'Transfer pricing documentation for related party transactions',
        'Ongoing compliance support and tax return assistance'
      ]}
      howItWorks={[
        {
          title: 'Business Assessment',
          description:
            'Evaluate your business structure, revenue, and activities. Determine registration requirements, exemptions, and optimal tax structure including group formation options.',
        },
        {
          title: 'FTA Registration',
          description:
            'Submit corporate tax registration through FTA portal with all required business documents, financial information, and ownership details. Register all group entities if applicable.',
        },
        {
          title: 'Compliance Setup',
          description:
            'Receive corporate tax registration number. Set up accounting systems for tax compliance, establish transfer pricing policies, and prepare for tax return filings.',
        },
      ]}
      faqs={[
        {
          question: 'What is the corporate tax rate in UAE?',
          answer:
            'UAE corporate tax rate is 9% on taxable income exceeding AED 375,000. Income up to AED 375,000 qualifies for 0% rate under small business relief. Different rates may apply to large multinationals and extractive businesses.',
        },
        {
          question: 'Are freezone companies subject to corporate tax?',
          answer:
            'Freezone companies can maintain 0% corporate tax on qualifying income if they meet specific conditions including maintaining adequate substance, not conducting business with mainland UAE, and meeting other FTA requirements.',
        },
        {
          question: 'When must businesses register for corporate tax?',
          answer:
            'Businesses must register within the timeframe specified by FTA based on their license issuance date and financial year. Registration is mandatory even if you qualify for 0% rate or exemptions.',
        },
      ]}
    />
  );
}
