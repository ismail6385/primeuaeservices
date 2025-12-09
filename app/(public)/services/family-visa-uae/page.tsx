import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Family Visa UAE | Spouse & Dependents Visa Services Dubai',
  description:
    'Bring your family to UAE with our complete family visa services. Spouse, children, and parents visa processing with all documentation and requirements.',
};

export default function FamilyVisaPage() {
  return (
    <ServicePageTemplate
      subtitle="Family Sponsorship"
      title="Family Visa UAE"
      description="Reunite with your loved ones in the UAE through our comprehensive family visa services. We handle spouse visas, dependent children visas, and parent sponsorship with complete documentation support. Our team ensures smooth processing while meeting all salary and accommodation requirements set by UAE immigration."
      heroFeatures={[
        'Spouse & children visas',
        'Parent sponsorship available',
        'Salary requirement guidance',
        'Complete family documentation'
      ]}
      benefits={[
        'Spouse visa processing with marriage certificate attestation',
        'Dependent children visas with birth certificate requirements',
        'Parents visa sponsorship for eligible applicants',
        'Tenancy contract verification and approval assistance',
        'Salary certificate processing and bank statement coordination',
        'Complete Emirates ID and medical test arrangements for family members'
      ]}
      howItWorks={[
        {
          title: 'Eligibility Check',
          description:
            'We verify your salary requirements, accommodation status, and necessary documents. Minimum salary thresholds must be met for family sponsorship.',
        },
        {
          title: 'Document Preparation',
          description:
            'Attestation of marriage certificates, birth certificates, and other family documents. We coordinate with embassies for authentication.',
        },
        {
          title: 'Visa Processing',
          description:
            'Submit applications to immigration, arrange medical tests, biometrics for Emirates ID, and complete the visa stamping process.',
        },
      ]}
      faqs={[
        {
          question: 'What is the minimum salary requirement for family visa sponsorship?',
          answer:
            'Generally, the minimum salary is AED 4,000 per month or AED 3,000 plus accommodation for sponsoring a spouse. For sponsoring spouse and children, AED 4,000-5,000 is typically required. Requirements may vary by emirate.',
        },
        {
          question: 'Which family members can I sponsor on my UAE visa?',
          answer:
            'You can sponsor your spouse, unmarried children (sons under 18, daughters until they marry), and in some cases, parents if you meet higher salary requirements, typically AED 20,000+ per month.',
        },
        {
          question: 'Do family members need to undergo medical tests?',
          answer:
            'Yes, all family members applying for UAE residence visas must complete medical fitness tests at approved health centers. This includes screening for communicable diseases.',
        },
        {
          question: 'How long is the family visa valid for?',
          answer:
            'Family residence visas are typically issued for 2-3 years, matching the sponsor\'s visa validity. They must be renewed before expiry along with Emirates ID renewal.',
        },
      ]}
    />
  );
}
