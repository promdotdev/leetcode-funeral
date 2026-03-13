'use client';

import { GameProvider } from '@/lib/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
