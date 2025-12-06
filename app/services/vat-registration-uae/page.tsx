import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'VAT Registration UAE | FTA Tax Registration Services Dubai',
  description:
    'Complete VAT registration services in UAE. Expert assistance with Federal Tax Authority registration, TRN application, and tax compliance.',
};

export default function VATRegistrationPage() {
  return (
    <ServicePageTemplate
      subtitle="Tax Registration"
      title="VAT Registration UAE"
      description="Register your business for VAT with the Federal Tax Authority (FTA) with complete support from our tax experts. We handle mandatory and voluntary VAT registration, TRN issuance, and ensure full compliance with UAE tax regulations. Essential service for businesses exceeding AED 375,000 annual turnover."
      benefits={[
        'Mandatory VAT registration for revenue over AED 375,000',
        'Voluntary registration support for lower revenue businesses',
        'Tax Registration Number (TRN) application and issuance',
        'FTA portal setup and EmaraTax system configuration',
        'Guidance on VAT invoicing and record-keeping requirements',
        'De-registration services when no longer required'
      ]}
      howItWorks={[
        {
          title: 'Eligibility Assessment',
          description:
            'Review your business revenue and activities to determine VAT registration requirement. Mandatory if taxable turnover exceeds AED 375,000, optional between AED 187,500-375,000.',
        },
        {
          title: 'Application Preparation',
          description:
            'Gather trade license, financial statements, bank details, and ownership documents. Complete FTA registration forms with accurate business information.',
        },
        {
          title: 'Registration & TRN',
          description:
            'Submit application to FTA through EmaraTax portal. Receive Tax Registration Number (TRN) and guidance on VAT compliance obligations.',
        },
      ]}
      faqs={[
        {
          question: 'When is VAT registration mandatory in UAE?',
          answer:
            'VAT registration is mandatory when your taxable supplies and imports exceed AED 375,000 in the last 12 months, or are expected to exceed this threshold in the next 30 days. Certain businesses may have different thresholds.',
        },
        {
          question: 'What is a Tax Registration Number (TRN)?',
          answer:
            'TRN is a unique 15-digit number issued by FTA to VAT-registered businesses. It must be displayed on all tax invoices and official documents. This number identifies your business for VAT purposes.',
        },
        {
          question: 'What are the penalties for not registering for VAT?',
          answer:
            'Failure to register for VAT when required can result in penalties of AED 20,000 for late registration. Additional penalties may apply for non-compliance with VAT return filings and payments.',
        },
      ]}
    />
  );
}
