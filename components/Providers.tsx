'use client';

import { GameProvider } from '@/lib/store';
import NameModal from '@/components/NameModal';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <NameModal />
      {children}
    </GameProvider>
  );
}
