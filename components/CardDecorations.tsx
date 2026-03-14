import Globe from './Globe';
import RandomImg from './RandomImg';

export default function CardDecorations({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Globe />
      <RandomImg src="/roses.png" className="absolute -bottom-20 -left-15 w-40 z-20 rotate-30" />
      {children}
    </div>
  );
}
