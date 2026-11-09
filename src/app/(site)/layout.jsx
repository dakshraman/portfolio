import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

/**
 * Modern Editorial Site Layout
 */
export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
