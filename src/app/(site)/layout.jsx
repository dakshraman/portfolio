import CustomCursor from '@/components/CustomCursor';
import AmbientBackground from '@/components/AmbientBackground';
import LoaderWrapper from '@/components/LoaderWrapper';
import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';

/**
 * Classic site chrome.
 *
 * All of the scrollable marketing pages live in this route group so the
 * immersive `/studio` route can render edge-to-edge without the navigation,
 * loader, cursor, or ambient WebGL background.
 */
export default function SiteLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <AmbientBackground />
      <LoaderWrapper>
        <Navigation />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        <BackToTop />
      </LoaderWrapper>
    </>
  );
}
