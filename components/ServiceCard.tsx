import Link from 'next/link';
import { LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  featured?: boolean;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  featured = false,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full"
    >
      <div className={`relative h-full overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 ${featured
          ? 'border-brand-gold shadow-lg'
          : 'border-gray-100 hover:border-brand-teal'
        } hover:-translate-y-2 hover:shadow-2xl`}>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-gold to-brand-teal px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3 w-3" />
            Popular
          </div>
        )}

        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 via-transparent to-brand-teal/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Content */}
        <div className="relative">
          {/* Icon */}
          <div className="mb-5 inline-flex">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-teal transition-all duration-500 group-hover:scale-110 group-hover:from-brand-gold group-hover:to-brand-teal group-hover:shadow-lg">
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-brand-dark transition-colors group-hover:text-brand-navy">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-brand-text">
            {description}
          </p>

          {/* CTA Link */}
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy transition-colors group-hover:text-brand-teal">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>

        {/* Bottom Border Animation */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-navy via-brand-teal to-brand-gold transition-all duration-500 group-hover:w-full"></div>
      </div>
    </Link>
  );
}
