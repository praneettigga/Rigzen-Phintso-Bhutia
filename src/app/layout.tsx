import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/fira-code';
import '@fontsource/noto-serif-tibetan/400.css';
import '@/styles/global.css';
import Chrome from '@/components/Chrome';
import Footer from '@/components/Footer';
import MotionRoot from '@/components/MotionRoot';
import Lightbox from '@/components/Lightbox';
import Overture from '@/components/Overture';
import { site, SITE_URL } from '@/data/site';
import poster from '@/assets/brand/thank-you-poster.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} — Architecture Portfolio`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: `${site.name} — Architecture Portfolio`,
    description: site.description,
    images: [{ url: poster.src, width: poster.width, height: poster.height }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

// Runs before paint: enables JS-only reveal states and decides whether the overture plays.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&!sessionStorage.getItem('overture-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('play-overture')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip sr-only" href="#main">Skip to content</a>
        <Overture />
        <Chrome />
        <main id="main">{children}</main>
        <Footer />
        <Lightbox />
        <MotionRoot />
      </body>
    </html>
  );
}
