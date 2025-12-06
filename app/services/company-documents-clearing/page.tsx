import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata = {
  title: 'Company Documents Clearing Dubai | PRO Document Processing UAE',
  description:
    'Fast-track document clearing and attestation services for government departments in Dubai. Professional PRO services.',
};

export default function CompanyDocumentsClearingPage() {
  return (
    <ServicePageTemplate
      subtitle="Document Processing"
      title="Company Documents Clearing"
      description="Expedited document clearing and attestation services for all UAE government departments and authorities. Our experienced PRO team handles submissions to DED, immigration, municipalities, MOHRE, and various regulatory bodies. Fast-track processing ensures your business documents are cleared efficiently without delays."
      benefits={[
        'Document submission to all government departments',
        'Attestation services for commercial and personal documents',
        'License renewal and amendment processing',
        'Municipality approvals and NOC acquisitions',
        'Chamber of Commerce certification and attestation',
        'Embassy legalization coordination for international documents'
      ]}
      howItWorks={[
        {
          title: 'Document Collection',
          description:
            'Identify which approvals or attestations you need. Collect original documents and supporting materials. We verify completeness and accuracy before submission.',
        },
        {
          title: 'Government Submission',
          description:
            'Our PRO representatives visit relevant government offices, submit documents, pay fees, and coordinate with officials. We handle any queries or additional requirements.',
        },
        {
          title: 'Collection & Delivery',
          description:
            'Track processing status and collect cleared documents once approved. Deliver attested documents to your office with copies for your records.',
        },
      ]}
      faqs={[
        {
          question: 'What types of documents can be cleared or attested?',
          answer:
            'We clear all business documents including trade licenses, contracts, agreements, certificates of incorporation, powers of attorney, educational certificates, and personal documents requiring government authentication.',
        },
        {
          question: 'How long does document clearing take in Dubai?',
          answer:
            'Timeline varies by document type and department. Simple attestations may take 1-2 days, while complex approvals requiring multiple departments can take 1-2 weeks. We offer expedited processing when urgency is needed.',
        },
        {
          question: 'Do you handle embassy attestation for international use?',
          answer:
            'Yes, we coordinate attestation from relevant embassies and consulates for documents being used internationally. This includes MOFA attestation followed by embassy legalization.',
        },
      ]}
    />
  );
}
