import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Accounting & Bookkeeping Services Dubai | Professional Accounting UAE',
  description:
    'Professional accounting and bookkeeping services for Dubai businesses. Financial reporting, payroll, VAT returns, and compliance.',
};

export default function AccountingBookkeepingPage() {
  return (
    <ServicePageTemplate
      subtitle="Financial Services"
      title="Accounting & Bookkeeping Dubai"
      description="Comprehensive accounting and bookkeeping services tailored for UAE businesses of all sizes. From daily transaction recording to financial reporting and tax compliance, our qualified accountants ensure your books are accurate and compliant with UAE accounting standards and regulatory requirements."
      heroFeatures={[
        'Daily bookkeeping services',
        'Monthly financial reports',
        'VAT return preparation',
        'Cloud-based accounting'
      ]}
      benefits={[
        'Daily bookkeeping and transaction recording in accounting systems',
        'Monthly financial statements including P&L and balance sheets',
        'VAT return preparation and FTA submissions',
        'Payroll processing with WPS compliance',
        'Year-end accounts preparation and audit support',
        'Cloud-based accounting software implementation and training'
      ]}
      howItWorks={[
        {
          title: 'Setup & Assessment',
          description:
            'Review your business structure, current accounting practices, and compliance requirements. Set up or migrate to suitable accounting software and establish procedures.',
        },
        {
          title: 'Ongoing Bookkeeping',
          description:
            'Record daily transactions, reconcile bank accounts, manage accounts payable and receivable. Maintain organized financial records in compliance with UAE standards.',
        },
        {
          title: 'Reporting & Compliance',
          description:
            'Generate monthly financial reports, prepare VAT returns, process payroll, and ensure all regulatory filings are submitted on time to relevant authorities.',
        },
      ]}
      faqs={[
        {
          question: 'What accounting software do you support?',
          answer:
            'We work with popular cloud-based platforms including QuickBooks Online, Xero, Zoho Books, and Tally. We can also assist with software selection and migration from spreadsheets to professional accounting systems.',
        },
        {
          question: 'Do you prepare financial statements for audit?',
          answer:
            'Yes, we prepare year-end financial statements ready for external audit. Our statements comply with UAE accounting standards and include all necessary schedules and disclosures required by auditors.',
        },
        {
          question: 'Can you handle multiple company bookkeeping?',
          answer:
            'Absolutely. We manage accounting for businesses with multiple entities, group companies, and complex structures. We provide consolidated reporting and inter-company reconciliation services.',
        },
      ]}
    />
  );
}
