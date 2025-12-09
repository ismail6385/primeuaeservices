import Hero from '@/components/Hero';

export const metadata = {
    title: 'Refund Policy | Prime UAE Services',
    description: 'Understand our refund and cancellation policies for visa and PRO services.',
};

export default function RefundPolicyPage() {
    return (
        <>
            <Hero
                subtitle="Legal"
                title="Refund Policy"
                description="Our commitment to fair and transparent billing practices."
                ctaText="Contact Support"
                ctaHref="/contact"
            />

            <section className="bg-white py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg mx-auto text-brand-text">
                        <h2>1. Service Fees Refund</h2>
                        <p>
                            Our refund policy varies depending on the stage of the service provided:
                        </p>
                        <ul>
                            <li>
                                <strong>Before Application Submission:</strong> If you cancel your request before we have submitted any application to government authorities, you are eligible for a refund of our service fees, minus a 10% administrative processing fee.
                            </li>
                            <li>
                                <strong>After Application Submission:</strong> Once an application has been submitted to the government authorities, our service fees are non-refundable, as the work has already been performed.
                            </li>
                        </ul>

                        <h2>2. Government Fees</h2>
                        <p>
                            Government fees paid on your behalf are subject to the refund policies of the respective government departments (e.g., ICP, DET). We will assist you in applying for a refund from the government if applicable, but we cannot guarantee that they will approve the refund.
                        </p>

                        <h2>3. Rejection of Application</h2>
                        <p>
                            If a visa or license application is rejected by the government authorities due to reasons beyond our control (e.g., security ban, previous violations), our service fees are non-refundable. However, we may assist with an appeal or re-application at a discounted rate.
                        </p>

                        <h2>4. Processing Time</h2>
                        <p>
                            Refunds for service fees, if approved, will be processed within 14-21 business days and credited back to the original method of payment.
                        </p>

                        <h2>5. Contact Us</h2>
                        <p>
                            To request a refund or for any inquiries regarding payments, please reach out to our accounts department at accounts@primeuaeservices.com.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
