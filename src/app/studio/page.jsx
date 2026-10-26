import Link from 'next/link';
import { Press_Start_2P, VT323 } from 'next/font/google';
import StudioExperience from '@/components/studio/StudioExperience';
import './studio.css';
import './minecraft-theme.css';
import './minecraft-hud.css';
import './minecraft-modals.css';
import './minecraft-touch.css';

const pixel = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
});

const pixelDisplay = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel-display',
  display: 'swap',
});

export const metadata = {
  title: 'Virtual Studio — Interactive 3D Portfolio',
  description: 'Step inside Raman Daksh’s isometric 3D studio. Walk a humanoid robot around a low-poly workspace, explore project case studies, the tech stack, and contact details.',
  keywords: [
    'Raman Daksh 3D portfolio',
    'interactive portfolio',
    'Three.js portfolio',
    'isometric portfolio',
    'virtual studio',
    'freelance software engineer portfolio',
  ],
  alternates: {
    canonical: 'https://dakshraman.in/studio',
  },
  openGraph: {
    type: 'website',
    url: 'https://dakshraman.in/studio',
    title: 'Virtual Studio — Interactive 3D Portfolio | Raman Daksh',
    description: 'Guide a robot through a low-poly creative studio and explore the work of Raman Daksh, freelance software engineer.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Raman Daksh — Virtual Studio, an interactive 3D portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Studio — Interactive 3D Portfolio | Raman Daksh',
    description: 'Guide a robot through a low-poly creative studio and explore the work of Raman Daksh.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StudioPage() {
  return (
    <>
      <div className={`${pixel.variable} ${pixelDisplay.variable}`}>
        <StudioExperience />
      </div>
      <noscript>
        <div className="studio-noscript">
          <div className="studio-noscript__card">
            <p className="studio-noscript__eyebrow">Raman Daksh · Virtual Studio</p>
            <h1>The 3D studio needs JavaScript.</h1>
            <p>
              The full portfolio is available as a fast, accessible, classic page.
              Use the links below to jump straight to the essentials.
            </p>
            <div className="studio-noscript__links">
              <Link href="/">Open the classic portfolio</Link>
              <Link href="/#about">About</Link>
              <Link href="/#projects">Projects</Link>
              <Link href="/#skills">Skills</Link>
              <Link href="/#contact">Contact</Link>
              <a href="/Raman-Daksh.pdf">Download résumé</a>
            </div>
          </div>
        </div>
      </noscript>
    </>
  );
}
