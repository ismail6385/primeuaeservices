import Hero from '@/components/Hero';

export const metadata = {
    title: 'Terms of Service | Prime UAE Services',
    description: 'Read the terms and conditions for using Prime UAE Services website and services.',
};

export default function TermsOfServicePage() {
    return (
        <>
            <Hero
                subtitle="Legal"
                title="Terms of Service"
                description="Please read these terms carefully before using our services."
                ctaText="Contact Support"
                ctaHref="/contact"
            />

            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg mx-auto text-brand-text">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            By accessing our website and using our services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
                        </p>

                        <h2>2. Intellectul Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Prime UAE Services and its licensors.
                        </p>

                        <h2>3. Services Provided</h2>
                        <p>
                            We provide professional visa processing, PRO services, and business setup assistance in the UAE. While we strive for 100% accuracy, final approval of visas and licenses lies with the respective government authorities.
                        </p>

                        <h2>4. User Responsibilities</h2>
                        <p>
                            You are responsible for providing accurate and complete information required for processing your applications. Providing false or misleading information may result in rejection of services without refund.
                        </p>

                        <h2>5. Payment Terms</h2>
                        <p>
                            Usage of our paid services requires payment of fees as described on our pricing pages or service agreements. All fees are in UAE Dirhams (AED).
                        </p>

                        <h2>6. Limitation of Liability</h2>
                        <p>
                            In no event shall Prime UAE Services, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>

                        <h2>7. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                        </p>

                        <h2>8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at info@primeuaeservices.com.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
