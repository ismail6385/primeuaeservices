import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: 'Ahmed Al Mansoori',
    role: 'Business Owner',
    content:
      'Prime UAE Services made our Golden Visa application incredibly smooth. Their team was professional, efficient, and kept us informed every step of the way.',
    rating: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'Expatriate',
    content:
      'I was worried about the family visa process, but they handled everything perfectly. The entire process was completed faster than I expected.',
    rating: 5,
  },
  {
    name: 'Mohammed Hassan',
    role: 'Freelancer',
    content:
      'Getting my freelance visa was hassle-free thanks to Prime UAE Services. They guided me through every requirement and made it so easy.',
    rating: 5,
  },
];

export default function Testimonials({
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
            What Our Clients Say
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-brand-gold"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-brand-muted/30 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              <p className="mb-6 text-brand-text">{testimonial.content}</p>
              <div className="border-t border-brand-muted/30 pt-4">
                <p className="font-semibold text-brand-dark">
                  {testimonial.name}
                </p>
                <p className="text-sm text-brand-muted">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
