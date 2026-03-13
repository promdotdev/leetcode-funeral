import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import BottomNav from '@/components/BottomNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Who Killed Lee T. Code?',
  description: 'A murder mystery at the LeetCode funeral. Collect clues. Eliminate suspects. Find the killer.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a1a1a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable}`}>
        {/* Full-screen floral background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/bg-floral.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Providers>
          <main className="relative z-10 mx-auto min-h-screen max-w-[400px] px-6">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
