export const metadata = {
  title: 'Privacy Policy | Prime UAE Services',
  description:
    'Privacy policy for Prime UAE Services. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy to-brand-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-gray-300">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-brand-dark">
              Introduction
            </h2>
            <p className="mb-6 text-brand-text">
              Prime UAE Services ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Information We Collect
            </h2>
            <p className="mb-4 text-brand-text">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-2 text-brand-text">
              <li>Name, email address, phone number, and contact details</li>
              <li>Passport information and visa-related documents</li>
              <li>Business information including trade licenses and company documents</li>
              <li>Financial information for service payment processing</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              How We Use Your Information
            </h2>
            <p className="mb-4 text-brand-text">
              We use the information we collect to:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-2 text-brand-text">
              <li>Process visa applications and PRO service requests</li>
              <li>Communicate with you about our services</li>
              <li>Submit applications to government authorities on your behalf</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Improve our services and customer experience</li>
              <li>Send administrative information and service updates</li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Information Sharing and Disclosure
            </h2>
            <p className="mb-6 text-brand-text">
              We may share your information with UAE government authorities and departments as required to process your visa and PRO service applications. We do not sell your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, subject to confidentiality obligations.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Data Security
            </h2>
            <p className="mb-6 text-brand-text">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Data Retention
            </h2>
            <p className="mb-6 text-brand-text">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Visa and immigration documents are retained according to UAE legal requirements.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Your Rights
            </h2>
            <p className="mb-4 text-brand-text">
              You have the right to:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-2 text-brand-text">
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Object to processing of your information</li>
              <li>Request restriction of processing</li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Contact Us
            </h2>
            <p className="mb-6 text-brand-text">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mb-6 rounded-lg bg-brand-bg p-6">
              <p className="text-brand-text">
                <strong>Email:</strong> info@primeuaeservices.com
              </p>
              <p className="text-brand-text">
                <strong>Phone:</strong> +971 000 000 000
              </p>
            </div>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-brand-dark">
              Changes to This Policy
            </h2>
            <p className="text-brand-text">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
