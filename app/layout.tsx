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
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scanlines">
        <Providers>
          <main className="mx-auto min-h-screen max-w-[375px] px-4 py-6">
            {children}
          </main>
          <BottomNav />
          <footer className="fixed bottom-14 left-0 right-0 py-1 text-center font-[family-name:var(--font-terminal)] text-[10px] uppercase tracking-[3px] text-secondary/40">
            Klew Studio / Narrative Operations
          </footer>
        </Providers>
      </body>
    </html>
  );
}
