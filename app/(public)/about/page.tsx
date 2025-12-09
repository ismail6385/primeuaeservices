import Hero from '@/components/Hero';
import {
  Shield,
  Users,
  Award,
  Target,
  CheckCircle,
  TrendingUp,
  Clock,
  Globe,
  Star,
  UserCheck,
  Briefcase
} from 'lucide-react';

export const metadata = {
  title: 'About Prime UAE Services | Trusted Visa & PRO Service Experts in Dubai',
  description:
    'Learn about Prime UAE Services, your trusted partner for visa processing and PRO services in Dubai. Over 15 years of experience serving 5,000+ individuals and businesses with 99% success rate.',
  keywords: 'about prime uae services, visa experts dubai, pro services dubai, licensed visa provider, business setup dubai',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Prime UAE Services | Trusted Visa & PRO Service Experts',
    description: 'Over 15 years of excellence in visa processing and PRO services in Dubai. Licensed, certified, and trusted by 5,000+ clients.',
    type: 'website',
  },
};

const stats = [
  {
    icon: TrendingUp,
    value: '15+',
    label: 'Years of Excellence',
    description: 'Serving UAE since 2008',
  },
  {
    icon: Users,
    value: '5,000+',
    label: 'Happy Clients',
    description: 'Individuals & businesses',
  },
  {
    icon: Star,
    value: '99%',
    label: 'Success Rate',
    description: 'Across all visa categories',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Support Available',
    description: 'Always here for you',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We operate with complete transparency and honesty in all our dealings, ensuring you always know what to expect.',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description:
      'Your satisfaction and success are at the heart of everything we do. We tailor our services to your unique needs.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We strive for perfection in every service we provide, maintaining the highest standards of quality and compliance.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description:
      'We focus on delivering tangible results and successful outcomes, backed by our proven track record.',
  },
];

const milestones = [
  {
    year: '2008',
    event: 'Company founded in Dubai',
    description: 'Started our journey to simplify visa and PRO services'
  },
  {
    year: '2012',
    event: 'Expanded services to include business setup',
    description: 'Became a one-stop solution for entrepreneurs'
  },
  {
    year: '2018',
    event: 'Reached 5,000+ satisfied clients',
    description: 'Milestone achievement in client satisfaction'
  },
  {
    year: '2023',
    event: 'Became authorized Golden Visa service provider',
    description: 'Official partner for UAE Golden Visa program'
  },
];

const team = [
  {
    name: 'Expert PRO Team',
    role: 'Government Relations',
    description: 'Licensed professionals with deep knowledge of UAE regulations',
    icon: Briefcase,
  },
  {
    name: 'Visa Specialists',
    role: 'Immigration Services',
    description: 'Experienced in all visa categories and immigration processes',
    icon: Globe,
  },
  {
    name: 'Client Support',
    role: 'Customer Success',
    description: 'Dedicated team ensuring smooth journey from start to finish',
    icon: UserCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        subtitle="Who We Are"
        title="Licensed UAE Visa & PRO Experts"
        description="Since 2008, our licensed team has guided 5,000+ clients through visas, PRO, and business setup with transparent pricing, fast timelines, and government-approved processes."
        ctaText="Talk to Our Experts"
        ctaHref="/contact"
        features={[
          '15+ years of UAE experience',
          'Government-approved & licensed',
          '5,000+ clients, 99% success rate',
          'Dedicated PRO support for every case',
        ]}
      />

      {/* Stats Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-dark to-brand-navy py-16 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
                <div className="relative">
                  <stat.icon className="mb-4 h-10 w-10 text-brand-gold" />
                  <div className="mb-2 text-4xl font-bold">{stat.value}</div>
                  <div className="mb-1 text-lg font-semibold">{stat.label}</div>
                  <p className="text-sm text-gray-300">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="mb-4 inline-block rounded-full bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-navy">
                Established 2008
              </div>
              <h2 className="mb-6 text-4xl font-bold text-brand-dark sm:text-5xl">
                Who We Are
              </h2>
              <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-brand-gold to-brand-teal"></div>
              <p className="mb-6 text-lg leading-relaxed text-brand-text">
                <span className="font-semibold text-brand-navy">Prime UAE Services</span> is a leading provider of comprehensive visa processing, PRO services, and business setup solutions in Dubai and across the United Arab Emirates. With over 15 years of experience, we have helped thousands of individuals and businesses navigate the UAE&apos;s immigration and regulatory landscape.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-brand-text">
                Our team of experienced professionals brings deep knowledge of UAE laws, regulations, and government procedures. We are <span className="font-semibold text-brand-navy">licensed and authorized</span> to provide PRO services, ensuring that every application we handle meets the highest standards of compliance and accuracy.
              </p>
              <p className="text-lg leading-relaxed text-brand-text">
                From employment visas to Golden Visa applications, from business setup to corporate tax registration, we offer end-to-end solutions tailored to your specific needs. Our commitment to excellence, transparency, and client satisfaction has made us the trusted choice for visa and PRO services in the UAE.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-brand-bg px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-brand-teal" />
                  <span className="font-medium text-brand-dark">Licensed & Certified</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-brand-bg px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-brand-teal" />
                  <span className="font-medium text-brand-dark">Government Approved</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-brand-bg px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-brand-teal" />
                  <span className="font-medium text-brand-dark">99% Success Rate</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-gold/20 to-brand-teal/20 blur-2xl"></div>
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-dark to-brand-teal shadow-2xl">
                  <div className="flex h-full items-center justify-center p-8 text-center text-white">
                    <div>
                      <div className="mb-4 text-7xl font-bold bg-gradient-to-r from-brand-gold to-white bg-clip-text text-transparent">
                        15+
                      </div>
                      <div className="mb-2 text-3xl font-semibold">Years of Excellence</div>
                      <div className="mt-6 text-xl text-gray-300">Serving the UAE Community</div>
                      <div className="mt-8 flex justify-center gap-8">
                        <div>
                          <div className="text-3xl font-bold text-brand-gold">5K+</div>
                          <div className="text-sm text-gray-400">Clients</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-brand-gold">99%</div>
                          <div className="text-sm text-gray-400">Success</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-brand-dark sm:text-5xl">
              Our Expert Team
            </h2>
            <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-gold to-brand-teal"></div>
            <p className="mx-auto max-w-2xl text-lg text-brand-text">
              Dedicated professionals committed to making your UAE journey seamless
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-gold/10 to-brand-teal/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
                <div className="relative">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-teal text-white shadow-lg transition-all duration-300 group-hover:scale-110">
                    <member.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-brand-dark">
                    {member.name}
                  </h3>
                  <div className="mb-4 text-sm font-semibold text-brand-teal">
                    {member.role}
                  </div>
                  <p className="text-brand-text leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-brand-dark sm:text-5xl">
              Our Core Values
            </h2>
            <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-gold to-brand-teal"></div>
            <p className="mx-auto max-w-2xl text-lg text-brand-text">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-brand-muted/30 bg-gradient-to-br from-white to-brand-bg p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 to-brand-teal/0 transition-all duration-500 group-hover:from-brand-gold/5 group-hover:to-brand-teal/5"></div>
                <div className="relative">
                  <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-teal text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <value.icon className="h-10 w-10" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-brand-dark transition-colors duration-300 group-hover:text-brand-navy">
                    {value.title}
                  </h3>
                  <p className="text-brand-text leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-brand-dark sm:text-5xl">
              Our Journey
            </h2>
            <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-gold to-brand-teal"></div>
            <p className="mx-auto max-w-2xl text-lg text-brand-text">
              Milestones that shaped our success story
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-brand-gold via-brand-teal to-brand-navy md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                    }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                      }`}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-brand-muted/30 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-gold/10 to-brand-teal/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
                      <div className="relative">
                        <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-brand-gold to-brand-teal px-4 py-2 text-2xl font-bold text-white shadow-lg">
                          {milestone.year}
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-brand-dark">
                          {milestone.event}
                        </h3>
                        <p className="text-brand-text">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-brand-gold to-brand-teal shadow-xl md:flex">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-dark to-brand-navy py-20 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              Why Clients Choose Us
            </h2>
            <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-brand-gold"></div>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              What sets us apart in the UAE visa and PRO services industry
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
              <div className="relative">
                <Shield className="mb-4 h-10 w-10 text-brand-gold" />
                <h3 className="mb-3 text-xl font-bold">Licensed & Certified</h3>
                <p className="text-gray-300 leading-relaxed">
                  Fully licensed PRO service provider with all necessary government approvals and certifications.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
              <div className="relative">
                <Users className="mb-4 h-10 w-10 text-brand-gold" />
                <h3 className="mb-3 text-xl font-bold">Experienced Team</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our professionals have extensive experience handling complex visa and business setup cases.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
              <div className="relative">
                <Star className="mb-4 h-10 w-10 text-brand-gold" />
                <h3 className="mb-3 text-xl font-bold">Proven Track Record</h3>
                <p className="text-gray-300 leading-relaxed">
                  99% success rate with over 5,000 satisfied clients across various visa categories.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
              <div className="relative">
                <Clock className="mb-4 h-10 w-10 text-brand-gold" />
                <h3 className="mb-3 text-xl font-bold">Fast Processing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Streamlined procedures and strong government relationships ensure quick turnaround times.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
              <div className="relative">
                <CheckCircle className="mb-4 h-10 w-10 text-brand-gold" />
                <h3 className="mb-3 text-xl font-bold">Transparent Pricing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Clear, upfront pricing with no hidden fees or surprise charges along the way.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl transition-all duration-300 group-hover:bg-brand-gold/30"></div>
              <div className="relative">
                <UserCheck className="mb-4 h-10 w-10 text-brand-gold" />
                <h3 className="mb-3 text-xl font-bold">Ongoing Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  Continuous assistance and guidance throughout your visa journey and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-brand-dark sm:text-5xl">
            Ready to Start Your UAE Journey?
          </h2>
          <p className="mb-8 text-xl text-brand-text">
            Let our experienced team guide you through every step of the process
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-navy to-brand-teal px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Contact Us Today
              <CheckCircle className="h-5 w-5" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy px-8 py-4 text-lg font-semibold text-brand-navy transition-all duration-300 hover:bg-brand-navy hover:text-white"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
