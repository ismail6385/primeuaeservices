import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const services = [
    { name: 'Employment Visa UAE', href: '/services/employment-visa-uae' },
    { name: 'Family Visa UAE', href: '/services/family-visa-uae' },
    { name: 'Golden Visa Services', href: '/services/golden-visa-services' },
    { name: 'Freelance Visa UAE', href: '/services/freelance-visa-uae' },
    { name: 'Company Documents Typing', href: '/services/company-documents-typing' },
    { name: 'VAT Registration UAE', href: '/services/vat-registration-uae' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <footer className="bg-brand-footer text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <span className="text-lg font-bold">Prime UAE Services</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Your trusted partner for hassle-free UAE visa services, PRO services, and business setup solutions. Fast, compliant, and fully documented.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-300 transition-colors hover:text-brand-gold"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 transition-colors hover:text-brand-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 transition-colors hover:text-brand-gold"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Our Services
            </h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                <a
                  href="mailto:info@primeuaeservices.com"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  info@primeuaeservices.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                <a
                  href="tel:+971527707492"
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  +971 52 770 7492
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                <span className="text-sm text-gray-300">
                  Al Qusais, Dubai, UAE
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Prime UAE Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
