import './globals.css';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import AmbientBackground from '@/components/AmbientBackground';
import DpdpBanner from '@/components/DpdpBanner';

export const metadata = {
  title: 'Raman Daksh | Software Engineer',
  description: 'Senior Full Stack Developer specializing in Laravel, Flutter, and cross-platform architecture.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <AmbientBackground />
        <Navigation />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        <DpdpBanner />
      </body>
    </html>
  );
}
