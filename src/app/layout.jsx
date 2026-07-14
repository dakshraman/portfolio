import './globals.css';
import Navigation from '@/components/Navigation';
import AmbientBackground from '@/components/AmbientBackground';
import BackToTop from '@/components/BackToTop';
import CustomCursor from '@/components/CustomCursor';
import LoaderWrapper from '@/components/LoaderWrapper';

export const metadata = {
  title: {
    default: 'Raman Daksh | Freelance Software Engineer & IT Consultant',
    template: '%s | Raman Daksh',
  },
  description: 'Hire Raman Daksh — a freelance software engineer and IT consultant specializing in Laravel, Flutter, and full-stack architecture. 4+ years building scalable apps for startups and enterprises.',
  keywords: ['Freelance Software Engineer', 'IT Consultant', 'Laravel Developer', 'Flutter Developer', 'Full Stack Developer', 'REST API', 'Freelancer India', 'Hire Laravel Developer', 'Cross-Platform Development', 'Raman Daksh'],
  authors: [{ name: 'Raman Daksh' }],
  creator: 'Raman Daksh',
  metadataBase: new URL('https://dakshraman.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dakshraman.in',
    siteName: 'Raman Daksh',
    title: 'Raman Daksh | Freelance Software Engineer & IT Consultant',
    description: 'Hire a freelance Laravel & Flutter expert. 4+ years building scalable apps, REST APIs, and cross-platform solutions.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Raman Daksh - Freelance Software Engineer & IT Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raman Daksh | Freelance Software Engineer & IT Consultant',
    description: 'Hire a freelance Laravel & Flutter expert. 4+ years building scalable apps, REST APIs, and cross-platform solutions.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raman Daksh',
  url: 'https://dakshraman.in',
  image: 'https://dakshraman.in/og.png',
  jobTitle: 'Freelance Software Engineer & IT Consultant',
  description: 'Freelance software engineer and IT consultant specializing in Laravel, Flutter, and full-stack architecture. Building scalable backend systems and cross-platform mobile apps for startups and enterprises.',
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
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Raman Daksh',
  url: 'https://dakshraman.in',
  description: 'Portfolio of Raman Daksh — Freelance Software Engineer & IT Consultant. Specializing in Laravel, Flutter, and full-stack development.',
  author: {
    '@type': 'Person',
    name: 'Raman Daksh',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
