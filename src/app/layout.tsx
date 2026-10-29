import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ShellClient } from '@/components/layout/ShellClient';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { template: '%s | HealthCover Uganda', default: 'HealthCover Uganda — health insurance, made simple' },
  description: 'Explore and compare health insurance plans in Uganda in plain language: benefits, exclusions, limits and enrolment steps. No account, no medical questions.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppProvider>
          <ShellClient>{children}</ShellClient>
        </AppProvider>
      </body>
    </html>
  );
}
