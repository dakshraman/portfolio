import './globals.css';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import AmbientBackground from '@/components/AmbientBackground';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';
import DpdpBanner from '@/components/DpdpBanner';
import LoaderWrapper from '@/components/LoaderWrapper';

export const metadata = {
  title: {
    default: 'Raman Daksh | Software Engineer',
    template: '%s | Raman Daksh',
  },
  description: 'Senior Full Stack Developer specializing in Laravel, Flutter, and cross-platform architecture. Building scalable backend systems and beautiful mobile apps.',
  keywords: ['Software Engineer', 'Laravel', 'Flutter', 'Full Stack Developer', 'REST API', 'Cross-Platform', 'Raman Daksh'],
  authors: [{ name: 'Raman Daksh' }],
  creator: 'Raman Daksh',
  metadataBase: new URL('https://dakshraman.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dakshraman.in',
    siteName: 'Raman Daksh',
    title: 'Raman Daksh | Software Engineer',
    description: 'Senior Full Stack Developer specializing in Laravel, Flutter, and cross-platform architecture.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Raman Daksh - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raman Daksh | Software Engineer',
    description: 'Senior Full Stack Developer specializing in Laravel, Flutter, and cross-platform architecture.',
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
  jobTitle: 'Software Engineer',
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
  knowsAbout: ['Laravel', 'Flutter', 'PHP', 'Python', 'REST API', 'System Architecture'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AmbientBackground />
        <LoaderWrapper>
          <Navigation />
          <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
          <DpdpBanner />
          <BackToTop />
          <ThemeToggle />
        </LoaderWrapper>
      </body>
    </html>
  );
}
