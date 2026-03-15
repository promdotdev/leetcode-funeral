import { Suspense } from 'react';
import { SUSPECTS } from '@/lib/data';
import UnlockHandler from '@/components/UnlockHandler';

export function generateStaticParams() {
  return SUSPECTS.map((s) => ({ id: s.id }));
}

export default async function UnlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="pt-4 text-center text-white/60">Verifying...</div>}>
      <UnlockHandler id={id} />
    </Suspense>
  );
}
