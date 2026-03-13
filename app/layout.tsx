import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Who Killed Lee T. Code?',
  description: 'A murder mystery at the LeetCode funeral. Collect clues. Eliminate suspects. Find the killer.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0B1E1E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="mx-auto min-h-screen max-w-[375px] px-2">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
