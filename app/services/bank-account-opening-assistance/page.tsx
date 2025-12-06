import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Bank Account Opening UAE | Corporate Banking Assistance Dubai',
  description:
    'Assistance with opening corporate and personal bank accounts in UAE. Liaison with major banks for business banking setup.',
};

export default function BankAccountOpeningPage() {
  return (
    <ServicePageTemplate
      subtitle="Banking Assistance"
      title="Bank Account Opening Assistance"
      description="Expert assistance with opening corporate and personal bank accounts with major UAE banks. We liaise with bank relationship managers, prepare required documentation, and guide you through the account opening process. Essential service for new businesses and individuals establishing banking relationships in the UAE."
      benefits={[
        'Liaison with multiple banks to find suitable options',
        'Document preparation and verification assistance',
        'Coordination with bank relationship managers',
        'Support for both corporate and personal accounts',
        'Guidance on minimum balance and account features',
        'Assistance with digital banking and online setup'
      ]}
      howItWorks={[
        {
          title: 'Bank Selection',
          description:
            'Assess your banking needs and recommend suitable banks based on business type, expected transactions, and services required. Connect with appropriate bank representatives.',
        },
        {
          title: 'Document Preparation',
          description:
            'Compile all required documents including trade license, Emirates ID, company documents, business plan, and financial projections. Ensure everything meets bank requirements.',
        },
        {
          title: 'Application & Activation',
          description:
            'Coordinate bank meetings, submit applications, and follow up on approval process. Assist with initial deposit, online banking setup, and account activation.',
        },
      ]}
      faqs={[
        {
          question: 'What documents are needed to open a corporate bank account?',
          answer:
            'Required documents typically include trade license, memorandum of association, share certificates, passport and Emirates ID of signatories, proof of address, business plan, and financial projections. Specific requirements vary by bank.',
        },
        {
          question: 'How long does it take to open a bank account in UAE?',
          answer:
            'With complete documentation, corporate account opening takes 2-4 weeks on average. The process involves document verification, board approval, and compliance checks. Some banks offer faster processing for specific business types.',
        },
        {
          question: 'Can freezone companies open accounts with mainland banks?',
          answer:
            'Yes, freezone companies can open accounts with mainland banks. However, requirements may be more stringent, and banks may require additional documentation or higher minimum balances for freezone entities.',
        },
      ]}
    />
  );
}
