'use client';

import type * as React from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Lanyard from '@/components/ui/lanyard';

type Officer = {
  name: string;
  role: string;
  modelUrl: string;
  href: string;
};

type LanyardScrollerProps = {
  officers: Officer[];
};

const LanyardScroller: React.FC<LanyardScrollerProps> = ({ officers }) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const fov = 46;
  const z = 8;
  const y = 0.12;
  const xStep = 0.6;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      scroller.scrollLeft += event.deltaY;
      event.preventDefault();
    };

    scroller.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scroller.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="flex gap-0 overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory scrollbar-hide px-0 py-0"
      aria-label="Officer lanyards"
    >
      {officers.map((officer, index) => (
        <article
          key={officer.name}
          className="relative flex-none w-[65vw] sm:w-[45vw] lg:w-[32vw] xl:w-[28vw] snap-center -mr-4 sm:-mr-6 lg:-mr-8 last:mr-0 overflow-visible"
        >
          <Lanyard
            modelUrl={officer.modelUrl}
            fov={fov}
            position={[(index - (officers.length - 1) / 2) * xStep, y, z]}
          />
          <div className="pointer-events-none absolute inset-x-0 top-[85%] z-20 flex justify-center">
            <Link
              href={officer.href}
              className="pointer-events-auto inline-flex items-center rounded-full border border-border/60 bg-card px-5 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
            >
              Officer Page →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default LanyardScroller;
