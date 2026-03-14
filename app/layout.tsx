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
        <div className="checkerboard-bg" />
        <div className="fixed inset-0 z-1 overflow-hidden pointer-events-none">
          <img src="/detective.png" alt="" className="absolute right-0 bottom-0 h-screen object-contain object-bottom" style={{ transform: 'translateX(35%)' }} />
          <img src="/skull.png" alt="" className="absolute top-8 -left-[10%] sm:left-4 w-40 sm:w-64 opacity-80 -rotate-15" />
          <img src="/casket.png" alt="" className="absolute bottom-0 left-2 w-40 sm:w-56 opacity-80" />
        </div>
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
