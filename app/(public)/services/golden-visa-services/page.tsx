import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'UAE Golden Visa Services | 10-Year Residency Visa Dubai',
  description:
    'Apply for UAE Golden Visa with expert assistance. 10-year residency for investors, entrepreneurs, professionals, and students. Complete application support.',
};

export default function GoldenVisaPage() {
  return (
    <ServicePageTemplate
      subtitle="Long-Term Residency"
      title="Golden Visa Services"
      description="Secure your UAE Golden Visa and enjoy 10-year residency with exclusive benefits. Our expert consultants guide investors, entrepreneurs, specialized professionals, and outstanding students through the application process. We ensure all eligibility criteria are met and handle complete documentation for this prestigious long-term residency program."
      heroFeatures={[
        '10-year residency visa',
        'No sponsor required',
        'Family inclusion support',
        'Investment guidance'
      ]}
      benefits={[
        '10-year renewable residence visa with no sponsor required',
        'Eligibility assessment for investors, entrepreneurs, and professionals',
        'Complete application preparation with investment documentation',
        'Support for family members including spouse, children, and parents',
        'No mandatory stay requirements to maintain residency status',
        'Priority processing and direct government liaison for approvals'
      ]}
      howItWorks={[
        {
          title: 'Eligibility Assessment',
          description:
            'Evaluate your qualifications against Golden Visa categories: investors (AED 2M+ property), entrepreneurs, doctors, scientists, artists, or students with outstanding achievements.',
        },
        {
          title: 'Documentation & Application',
          description:
            'Prepare investment proofs, professional credentials, recommendation letters, and complete application package. We ensure all government requirements are met.',
        },
        {
          title: 'Approval & Issuance',
          description:
            'Submit to immigration authorities, coordinate approvals, and complete medical tests and biometrics. Receive your 10-year Golden Visa.',
        },
      ]}
      faqs={[
        {
          question: 'Who is eligible for the UAE Golden Visa?',
          answer:
            'Eligible categories include real estate investors (AED 2M+), entrepreneurs with successful projects, specialized talents (doctors, scientists, artists), outstanding students with 3.75+ GPA, and humanitarian pioneers. Each category has specific requirements.',
        },
        {
          question: 'What are the investment requirements for Golden Visa?',
          answer:
            'For property investment, you need to own real estate worth at least AED 2 million. For public investment, deposit AED 2 million in an investment fund. Company owners and entrepreneurs may qualify through business ownership with specific capital requirements.',
        },
        {
          question: 'Can I include my family in the Golden Visa?',
          answer:
            'Yes, Golden Visa holders can sponsor their spouse, children of any age, and up to one executive director. This is one of the key benefits, as dependents also receive long-term residence.',
        },
        {
          question: 'Do I need to live in UAE to maintain Golden Visa?',
          answer:
            'No, there is no minimum stay requirement for Golden Visa holders. You can maintain your residency status even if living abroad, making it ideal for global investors and professionals.',
        },
      ]}
    />
  );
}
