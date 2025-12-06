import { CheckCircle2 } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
  title?: string;
}

export default function HowItWorks({
  steps,
  title = 'How It Works',
}: HowItWorksProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-brand-gold"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-teal text-2xl font-bold text-white shadow-lg">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-brand-teal to-transparent md:block"></div>
                )}
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-dark">
                {step.title}
              </h3>
              <p className="text-brand-text">{step.description}</p>
              <CheckCircle2 className="mt-4 h-6 w-6 text-brand-teal" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
