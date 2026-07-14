import './globals.css';
import Navigation from '@/components/Navigation';
import AmbientBackground from '@/components/AmbientBackground';
import BackToTop from '@/components/BackToTop';
import CustomCursor from '@/components/CustomCursor';
import LoaderWrapper from '@/components/LoaderWrapper';

export const metadata = {
  title: {
    default: 'Raman Daksh | Freelance Software Engineer & IT Consultant in India',
    template: '%s | Raman Daksh',
  },
  description: 'Hire Raman Daksh — a freelance software engineer and IT consultant in Dehradun, India. Specializing in Laravel, Flutter, and full-stack architecture. 4+ years building scalable apps for startups and enterprises.',
  keywords: ['Freelance Software Engineer', 'Freelance Laravel Developer', 'Freelance Flutter Developer', 'IT Consultant', 'Laravel Developer', 'Flutter Developer', 'Full Stack Developer', 'REST API', 'Freelancer India', 'Hire Laravel Developer', 'Hire Freelancer', 'Cross-Platform Development', 'Raman Daksh', 'Dehradun Freelancer', 'Uttarakhand Developer', 'Remote Laravel Developer'],
  authors: [{ name: 'Raman Daksh' }],
  creator: 'Raman Daksh',
  metadataBase: new URL('https://dakshraman.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dakshraman.in',
    siteName: 'Raman Daksh',
    title: 'Raman Daksh | Freelance Software Engineer & IT Consultant in India',
    description: 'Hire a freelance Laravel & Flutter expert in India. 4+ years building scalable apps, REST APIs, and cross-platform solutions.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Raman Daksh - Freelance Software Engineer & IT Consultant from Dehradun, India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raman Daksh | Freelance Software Engineer & IT Consultant',
    description: 'Hire a freelance Laravel & Flutter expert in India. 4+ years building scalable apps, REST APIs, and cross-platform solutions.',
    images: ['/og.png'],
    creator: '@dakshraman',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dakshraman.in',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raman Daksh',
  url: 'https://dakshraman.in',
  image: 'https://dakshraman.in/og.png',
  jobTitle: 'Freelance Software Engineer & IT Consultant',
  description: 'Freelance software engineer and IT consultant based in Dehradun, India. Specializing in Laravel, Flutter, and full-stack architecture. Building scalable backend systems and cross-platform mobile apps for startups and enterprises.',
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
    'https://instagram.com/dakshraman',
    'https://t.me/dakshraman',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Freelance Software Engineer',
    description: 'Providing freelance software development and IT consulting services including Laravel development, Flutter app development, API design, and system architecture.',
    skills: 'Laravel, Flutter, PHP, Python, REST API Design, System Architecture, Full Stack Development',
  },
  knowsAbout: [
    'Laravel', 'Flutter', 'PHP', 'Python', 'REST API', 'System Architecture',
    'Full Stack Development', 'API Design', 'Database Design', 'Mobile Development',
    'Cloud Architecture', 'DevOps', 'Firebase', 'React', 'Dart',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Laravel Development',
        description: 'Custom web application development using the Laravel ecosystem — from MVP to enterprise-grade platforms.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Flutter App Development',
        description: 'Cross-platform mobile applications for Android and iOS from a single Dart codebase.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'REST API Design & Development',
        description: 'Scalable, well-documented RESTful APIs designed for performance, security, and developer experience.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Full-Stack Development',
        description: 'Complete web application development from database schema to polished frontend interface.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'IT Consulting',
        description: 'Technical consulting for startups and businesses — code audits, architecture reviews, and technology strategy.',
      },
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Raman Daksh',
  url: 'https://dakshraman.in',
  description: 'Portfolio of Raman Daksh — Freelance Software Engineer & IT Consultant based in Dehradun, India. Specializing in Laravel, Flutter, and full-stack development.',
  author: {
    '@type': 'Person',
    name: 'Raman Daksh',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://dakshraman.in/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://dakshraman.in',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body>
        <AmbientBackground />
        <LoaderWrapper>
          <Navigation />
          <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
          <CustomCursor />
          <BackToTop />
        </LoaderWrapper>
      </body>
    </html>
  );
}
