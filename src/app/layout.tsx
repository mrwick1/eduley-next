import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getInstituteConfig, DEFAULT_INSTITUTE_CONFIG } from '@/api/config';
import { ThemeProvider } from '@/context/ThemeContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from '@/providers/QueryProvider';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// This function will be called at build time
async function getConfig() {
  try {
    const config = await getInstituteConfig();
    return config;
  } catch (error) {
    console.error('Failed to fetch config:', error);
    return DEFAULT_INSTITUTE_CONFIG;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  
  return {
    title: config?.name || 'Eduley',
    description: config?.tagline || 'Eduley is a platform for learning and teaching',
    icons: [
      {
        rel: 'icon',
        url: config?.favicon || '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        url: config?.favicon || '/apple-touch-icon.png',
      }
    ],
    metadataBase: new URL(config?.domain || 'https://eduley.com'),
    openGraph: {
      title: config?.name,
      description: config?.tagline,
      images: [config?.logo],
    },
    twitter: {
      title: config?.name,
      description: config?.tagline,
      images: [config?.logo],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --primary-color: ${config.primary_color || DEFAULT_INSTITUTE_CONFIG.primary_color};
              --secondary-color: ${config.secondary_color || DEFAULT_INSTITUTE_CONFIG.secondary_color};
            }
          `
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme') || 'light';
                if (theme === 'system' || !theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
      <Analytics/>
      <SpeedInsights/>
        <QueryProvider>
          <ThemeProvider config={config}>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-20">
                  {children}
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
