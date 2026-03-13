import { SUSPECTS } from '@/lib/data';
import SuspectDossier from '@/components/SuspectDossier';

export function generateStaticParams() {
  return SUSPECTS.map((s) => ({ id: s.id }));
}

export default async function SuspectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SuspectDossier id={id} />;
}
