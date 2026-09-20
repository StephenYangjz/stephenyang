import { Inter } from 'next/font/google';
import './globals.css';
import { websiteInfo, personalInfo } from '@/website.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ambient from '@/components/Ambient';
import ScrollBoot from '@/components/ScrollBoot';
import RouteTransition from '@/components/RouteTransition';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(websiteInfo.url),
  title: {
    default: `${personalInfo.name} — ${personalInfo.role}, ${personalInfo.university}`,
    template: `%s · ${personalInfo.name}`,
  },
  description: websiteInfo.description,
  openGraph: {
    title: personalInfo.fullName,
    description: websiteInfo.description,
    url: websiteInfo.url,
    siteName: personalInfo.name,
    images: [{ url: websiteInfo.teaserImage }],
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: personalInfo.fullName,
    description: websiteInfo.description,
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f5f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0b0f' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Ambient />
          <ScrollBoot />
          <Header />
          <div className="relative z-10">
            <RouteTransition>{children}</RouteTransition>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
