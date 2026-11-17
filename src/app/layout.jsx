import './globals.css';
import Script from 'next/script';
import { Archivo, Space_Grotesk } from 'next/font/google';
import { LocaleProvider } from '@/context/LocaleContext';
import CountrySelectorModal from '@/components/CountrySelectorModal';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Raman Daksh | Senior Laravel & Flutter Developer',
    template: '%s | Raman Daksh',
  },
  description:
    'Senior Freelance Laravel & Flutter Developer with 4+ years of experience architecting scalable backend APIs, cloud systems, and cross-platform mobile apps for startups and high-growth businesses.',
  keywords: [
    'Raman Daksh',
    'Freelance Laravel Developer',
    'Freelance Flutter Developer',
    'Senior Software Engineer',
    'Full Stack Developer',
    'REST API Architecture',
    'Flutter App Developer',
    'DevOps Consultant',
    'System Architect',
    'Cloud Deployment',
    'Dehradun Developer',
    'Hire Laravel Developer',
    'Hire Flutter Engineer',
  ],
  authors: [{ name: 'Raman Daksh' }],
  creator: 'Raman Daksh',
  metadataBase: new URL('https://dakshraman.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dakshraman.in',
    siteName: 'Raman Daksh',
    title: 'Raman Daksh | Senior Laravel & Flutter Developer',
    description:
      'Senior Freelance Laravel & Flutter Developer with 4+ years of experience architecting scalable backend APIs, cloud systems, and cross-platform mobile apps.',
    images: [
      {
        url: 'https://dakshraman.in/og.png',
        width: 1200,
        height: 630,
        alt: 'Raman Daksh - Senior Freelance Laravel & Flutter Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raman Daksh | Senior Laravel & Flutter Developer',
    description:
      'Senior Freelance Laravel & Flutter Developer with 4+ years of experience architecting scalable backend APIs, cloud systems, and cross-platform mobile apps.',
    images: ['https://dakshraman.in/og.png'],
    creator: '@dakshraman',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://dakshraman.in',
  },
};

const rootJsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://dakshraman.in/#website',
      url: 'https://dakshraman.in',
      name: 'Raman Daksh',
      alternateName: ['Raman Daksh Portfolio', 'dakshraman'],
      description:
        'Senior Freelance Laravel & Flutter Engineer architecting high-scale backends, REST APIs, and cross-platform mobile apps.',
      publisher: {
        '@id': 'https://dakshraman.in/#person',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Person',
      '@id': 'https://dakshraman.in/#person',
      name: 'Raman Daksh',
      url: 'https://dakshraman.in',
      image: 'https://dakshraman.in/og.png',
      jobTitle: 'Senior Freelance Laravel & Flutter Developer',
      description:
        'Senior software engineer with 4+ years of experience specializing in Laravel backend architecture, REST API design, DevOps, and Flutter cross-platform mobile app development.',
      email: 'ramandaksh6161@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dehradun',
        addressRegion: 'Uttarakhand',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://github.com/dakshraman',
        'https://linkedin.com/in/dakshraman',
        'https://t.me/dakshraman',
        'https://instagram.com/dakshraman',
      ],
      knowsAbout: [
        'Laravel',
        'Flutter',
        'Dart',
        'PHP',
        'REST APIs',
        'System Architecture',
        'MySQL',
        'PostgreSQL',
        'Redis',
        'Docker',
        'CI/CD Pipelines',
        'DevOps',
        'Firebase',
        'Next.js',
        'Tailwind CSS',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://dakshraman.in/#service',
      name: 'Raman Daksh - Senior Freelance Laravel & Flutter Engineering',
      image: 'https://dakshraman.in/og.png',
      url: 'https://dakshraman.in',
      provider: {
        '@id': 'https://dakshraman.in/#person',
      },
      priceRange: '$$',
      currenciesAccepted: 'USD, EUR, GBP, INR',
      paymentAccepted: 'Stripe, Wire Transfer, Crypto',
      areaServed: 'Worldwide',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dehradun',
        addressRegion: 'Uttarakhand',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.3165,
        longitude: 78.0322,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '21:00',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '20',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Engineering Disciplines & Sprints',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full-Cycle MVP Product Sprint (Laravel + Flutter)',
              description:
                'Production-ready MVP development: high-concurrency Laravel backend, REST APIs, and native iOS & Android Flutter apps delivered in 3–5 weeks.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Laravel Backend Architecture & REST APIs',
              description:
                'Structured database schemas, Redis caching, payment gateways, and scalable API transformers for mobile and web clients.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Flutter Cross-Platform Mobile Apps',
              description:
                'High-performance iOS and Android mobile app development with BLoC state management and offline-first storage.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'DevOps & Cloud Infrastructure',
              description:
                'Automated CI/CD pipelines, Docker containerization, Let’s Encrypt SSL, and multi-tenant cloud deployments.',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Declare both light and dark scheme support for browser UI & canvas */}
        <meta name="color-scheme" content="light dark" />
        {/* Zero-FOUC theme hydration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var meta = document.querySelector('meta[name="color-scheme"]');
                  var saved = localStorage.getItem('theme-mode');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    if (meta) meta.content = 'dark';
                    var tc = document.querySelector('meta[name="theme-color"]');
                    if (tc) tc.content = '#000000';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    if (meta) meta.content = 'light';
                    var tc = document.querySelector('meta[name="theme-color"]');
                    if (tc) tc.content = '#f5f5f7';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <meta name="theme-color" content="#f5f5f7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen antialiased bg-[var(--bg-page)] text-[var(--fg-page)]">
        <LocaleProvider>
          {children}
          <CountrySelectorModal />
        </LocaleProvider>
        <Script
          id="umami-analytics"
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
          data-website-id="15bbbb9e-fc01-4707-bd2c-71560c02318e"
          data-domains="dakshraman.in,www.dakshraman.in"
        />
      </body>
    </html>
  );
}
