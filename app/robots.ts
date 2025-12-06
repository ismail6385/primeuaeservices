import { Metadata } from 'next';

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: 'https://primeuaeservices.com/sitemap.xml',
    };
}
