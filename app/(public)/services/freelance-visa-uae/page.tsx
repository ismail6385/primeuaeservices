import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Freelance Visa UAE | Self-Employment Permit Dubai',
  description:
    'Get your UAE freelance visa and work permit. Complete freelance permit processing for consultants, creatives, and independent professionals in Dubai.',
};

export default function FreelanceVisaPage() {
  return (
    <ServicePageTemplate
      subtitle="Self-Employment Permit"
      title="Freelance Visa UAE"
      description="Obtain your UAE freelance visa and work independently as a consultant, designer, content creator, or other professional. Our service covers freelance permit application, visa processing, Emirates ID, and all regulatory requirements. Perfect for digital nomads and independent contractors wanting legal status in the UAE."
      heroFeatures={[
        'Work independently legally',
        'No office space required',
        'Family sponsorship option',
        'Multiple client flexibility'
      ]}
      benefits={[
        'Legal authorization to work as a freelancer in the UAE',
        'No need for local business partners or office space',
        'Ability to sponsor family members on your freelance visa',
        'Work with multiple clients without employment restrictions',
        'Two or three-year visa validity with renewal options',
        'Access to freezone benefits and business facilities'
      ]}
      howItWorks={[
        {
          title: 'Choose Freezone',
          description:
            'Select appropriate freezone for your profession (Dubai Media City, Dubai Internet City, etc.). Different freezones cater to specific industries and offer various packages.',
        },
        {
          title: 'Application & Approval',
          description:
            'Submit freelance permit application with portfolio, qualifications, and required documents. We handle the approval process with freezone authorities.',
        },
        {
          title: 'Visa & Setup',
          description:
            'Complete visa stamping, Emirates ID, and medical tests. Receive your freelance permit and begin working legally as an independent professional.',
        },
      ]}
      faqs={[
        {
          question: 'What professions can apply for a freelance visa in UAE?',
          answer:
            'Eligible professions include media professionals, content creators, designers, photographers, consultants, IT professionals, fitness trainers, and various creative and professional services. The specific freezone determines eligible categories.',
        },
        {
          question: 'How much does a freelance visa cost in UAE?',
          answer:
            'Costs vary by freezone and package, typically ranging from AED 7,500 to AED 15,000 annually. This includes permit fees, visa processing, and Emirates ID. Additional costs may apply for co-working space or business center addresses.',
        },
        {
          question: 'Can I sponsor my family on a freelance visa?',
          answer:
            'Yes, freelance visa holders can sponsor immediate family members (spouse and children) if they meet the minimum income requirements, which vary but typically require demonstrating sufficient earnings.',
        },
        {
          question: 'Do I need an office for a freelance visa?',
          answer:
            'No physical office is required. Most freelance permits provide a business center address or flexi-desk option. You can work remotely or from co-working spaces while maintaining legal status.',
        },
      ]}
    />
  );
}
