'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: FAQProps) {
  return (
    <section className="bg-brand-bg py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-brand-gold"></div>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-brand-muted/30 bg-white px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-brand-dark hover:text-brand-navy">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-brand-text">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
