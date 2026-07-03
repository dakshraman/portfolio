import './globals.css';
import DpdpBanner from '@/components/DpdpBanner';

export const metadata = {
  title: 'Raman Daksh | Senior Full Stack Developer',
  description: 'Full Stack Web & Mobile Developer specializing in Laravel and Flutter applications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <DpdpBanner />
      </body>
    </html>
  );
}
