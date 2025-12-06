'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Phone, MessageCircle, Star, Shield, Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  features?: string[];
  imageSrc?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText = 'Get Started',
  ctaHref = '/contact',
  features = [],
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Employment Visa', 'Family Visa', 'Golden Visa', 'Business Setup'];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#0A4D94] to-brand-teal py-16 lg:py-24">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full bg-brand-gold/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 h-40 w-40 animate-pulse rounded-full bg-brand-teal/20 blur-3xl delay-1000"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div
            className={`text-white transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
          >
            {/* Trust Badges Row */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {/* Online Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                </span>
                <span className="text-xs font-semibold text-white">Online Now</span>
              </div>

              {/* Rating Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white">4.9/5</span>
              </div>

              {/* Licensed Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <Shield className="h-3 w-3 text-brand-gold" />
                <span className="text-xs font-semibold text-white">Licensed PRO</span>
              </div>
            </div>

            {/* Subtitle Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-gold/20 px-4 py-2 backdrop-blur-sm">
              <Award className="h-4 w-4 text-brand-gold" />
              <span className="text-sm font-semibold text-brand-gold">
                {subtitle}
              </span>
            </div>

            {/* Title with Typing Animation */}
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-gold to-brand-teal bg-clip-text text-transparent transition-all duration-500">
                  {words[currentWord]}
                </span>
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-brand-gold to-brand-teal"></span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Services in Dubai
              </span>
            </h1>

            {/* Description */}
            {description && (
              <p className="mb-8 text-lg leading-relaxed text-gray-100">
                {description}
              </p>
            )}

            {/* Features */}
            {features.length > 0 && (
              <ul className="mb-8 space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-teal/20 transition-all group-hover:scale-110 group-hover:bg-brand-teal">
                      <CheckCircle className="h-4 w-4 text-brand-teal group-hover:text-white" />
                    </div>
                    <span className="text-gray-100">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-brand-gold px-8 text-lg font-semibold text-brand-dark shadow-xl transition-all duration-300 hover:scale-105 hover:bg-brand-gold/90 hover:shadow-2xl"
              >
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="group rounded-full border-2 border-white/30 bg-white/10 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-brand-navy"
              >
                <a
                  href="https://wa.me/971527707492"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            {/* Quick Contact Info */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20">
                  <Phone className="h-4 w-4 text-brand-gold" />
                </div>
                <a
                  href="tel:+971527707492"
                  className="font-medium transition-colors hover:text-brand-gold"
                >
                  +971 52 770 7492
                </a>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4 text-brand-teal" />
                <span>Mon-Sat: 9AM-6PM</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Shield className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Government</div>
                  <div className="text-sm font-semibold">Approved</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Award className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">15+ Years</div>
                  <div className="text-sm font-semibold">Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <CheckCircle className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">5000+</div>
                  <div className="text-sm font-semibold">Visas Done</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-1 backdrop-blur-sm">
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-teal/20 to-brand-navy/20">
                  <Image
                    src="/hero-visa-services.png"
                    alt="UAE Visa Services - Professional Immigration Solutions"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 animate-bounce rounded-2xl bg-white p-4 shadow-2xl delay-500">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-brand-navy">5000+</div>
                    <div className="text-xs text-gray-600">Visas Processed</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 animate-bounce rounded-2xl bg-white p-4 shadow-2xl delay-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold">
                    <span className="text-xl font-bold text-brand-dark">99%</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-dark">Success</div>
                    <div className="text-xs text-gray-600">Rate</div>
                  </div>
                </div>
              </div>

              {/* Glow Effects */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand-gold/30 blur-3xl"></div>
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-teal/30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
}
