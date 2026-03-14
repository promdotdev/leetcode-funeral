'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RandomImg({ src, className }: { src: string; className: string }) {
  const pathname = usePathname();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setOffset({
      x: Math.round(Math.random() * 16 - 8),
      y: Math.round(Math.random() * 16 - 8),
    });
  }, [pathname]);

  return (
    <img
      src={src}
      alt=""
      className={className}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    />
  );
}
