# Prime UAE Services Website

A modern, production-ready Next.js 14 website for Prime UAE Services - a leading provider of UAE visa services, PRO services, and business setup solutions in Dubai.

## Features

- **Modern Tech Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS
- **SEO Optimized**: Complete meta tags, Open Graph, structured data (Schema.org)
- **Responsive Design**: Mobile-first design with professional Dubai/UAE aesthetic
- **15 Service Pages**: Comprehensive visa and PRO service pages with FAQs
- **Contact Form**: Client-side validation with serverless API route
- **Accessibility**: WCAG AA compliant with semantic HTML
- **Performance**: Optimized images, lazy loading, and fast page loads

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prime-uae-services
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
prime-uae-services/
├── app/                      # Next.js 14 app directory
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── services/            # Services pages
│   │   ├── [service-slug]/  # Individual service pages
│   │   └── page.tsx         # Services overview
│   ├── privacy-policy/      # Privacy policy
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form endpoint
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts           # Dynamic sitemap
│   └── not-found.tsx        # 404 page
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   ├── Header.tsx           # Site header
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Hero component
│   ├── ServiceCard.tsx      # Service card
│   ├── HowItWorks.tsx       # Process steps
│   ├── FAQ.tsx              # FAQ component
│   ├── Testimonials.tsx     # Testimonials
│   ├── ContactForm.tsx      # Contact form
│   └── WhatsAppButton.tsx   # Floating WhatsApp button
├── public/                  # Static assets
│   └── robots.txt           # Robots.txt
└── tailwind.config.ts       # Tailwind configuration

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Brand Colors

The website uses the following brand color palette:

- **Primary Navy**: #0A4D94
- **Gold Accent**: #F4B94F
- **WhatsApp Green**: #25D366
- **Teal Accent**: #0FB3A6
- **Dark Text**: #0B2236
- **Body Text**: #333A43
- **Muted Grey**: #9AA3AB
- **Page Background**: #F7F9FB
- **Footer Dark**: #061627

## Contact Information

- **Email**: info@primeuaeservices.com
- **Phone**: +971 000 000 000 (placeholder)
- **WhatsApp**: https://wa.me/971000000000 (placeholder)
- **Location**: Dubai, United Arab Emirates

## Services

The website includes 15 comprehensive service pages:

1. Employment Visa UAE
2. Family Visa UAE
3. Golden Visa Services
4. Freelance Visa UAE
5. Emirates ID Services
6. Labour Contract Services
7. Tasheel Services
8. Amer Center Services
9. Company Documents Typing
10. VAT Registration UAE
11. Corporate Tax Registration
12. Accounting & Bookkeeping Dubai
13. Bank Account Opening Assistance
14. Complete Business Setup
15. Company Documents Clearing

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure build settings (auto-detected)
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## SEO Features

- Meta tags on all pages
- Open Graph tags for social sharing
- Structured data (Organization, LocalBusiness, FAQs)
- Dynamic sitemap generation
- Robots.txt configuration
- Semantic HTML structure

## Performance Optimizations

- Next.js Image component for optimized images
- Code splitting and lazy loading
- Minimal JavaScript bundle size
- CSS optimization with Tailwind
- Static generation where possible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - All rights reserved by Prime UAE Services

## Support

For technical support or questions, contact the development team or refer to the Next.js documentation at [nextjs.org/docs](https://nextjs.org/docs).
