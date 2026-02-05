"use client";

import { useEffect, useRef } from "react";
import Lanyard from "@/components/ui/lanyard";

type Officer = {
  name: string;
  role: string;
  modelUrl: string;
};

type LanyardScrollerProps = {
  officers: Officer[];
};

export default function LanyardScroller({ officers }: LanyardScrollerProps) {
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

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
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
            position={[
              (index - (officers.length - 1) / 2) * xStep,
              y,
              z,
            ]}
          />
        </article>
      ))}
    </div>
  );
}
