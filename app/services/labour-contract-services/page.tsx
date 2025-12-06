import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Labour Contract Services UAE | Employment Contract Typing Dubai',
  description:
    'Professional labour contract drafting and attestation services. UAE employment agreements compliant with MOHRE regulations.',
};

export default function LabourContractPage() {
  return (
    <ServicePageTemplate
      subtitle="Employment Contracts"
      title="Labour Contract Services"
      description="Professional drafting and attestation of employment contracts fully compliant with UAE labor laws. We prepare limited and unlimited contracts, handle MOHRE attestation, and ensure all terms meet Ministry of Human Resources requirements. Essential documentation for hiring employees in the UAE."
      benefits={[
        'Contracts drafted according to UAE Labor Law standards',
        'MOHRE attestation and electronic submission',
        'Limited and unlimited contract options available',
        'Clear salary, benefits, and termination clauses included',
        'Multi-language contracts (English and Arabic)',
        'Amendments and contract renewal services provided'
      ]}
      howItWorks={[
        {
          title: 'Information Gathering',
          description:
            'Provide employee details, salary structure, job description, benefits, and company information. We review employment terms and advise on legal requirements.',
        },
        {
          title: 'Contract Drafting',
          description:
            'Draft employment contract with all necessary clauses including probation period, working hours, leave entitlements, and notice periods per UAE law.',
        },
        {
          title: 'Attestation & Filing',
          description:
            'Submit contract to MOHRE for official attestation. Both employer and employee receive attested copies for records and future reference.',
        },
      ]}
      faqs={[
        {
          question: 'What is the difference between limited and unlimited contracts?',
          answer:
            'Limited contracts have a fixed term (usually 2 years) with specific end dates. Unlimited contracts have no fixed end date. Limited contracts are now less common as UAE law shifted toward unlimited contracts for most employment scenarios.',
        },
        {
          question: 'Is MOHRE attestation mandatory for labour contracts?',
          answer:
            'Yes, all employment contracts in UAE must be attested by the Ministry of Human Resources and Emiratisation (MOHRE). Unattested contracts are not legally valid and cannot be used for visa processing.',
        },
        {
          question: 'Can we modify the contract after attestation?',
          answer:
            'Yes, contract amendments can be made through MOHRE systems. Changes to salary, job title, or other terms require formal amendment submission and both parties\' consent.',
        },
      ]}
    />
  );
}
