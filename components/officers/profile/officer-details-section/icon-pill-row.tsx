import type * as React from 'react';
import ScrollVelocity from '@/components/ui/scroll-velocity';
import { cn } from '@/lib/utils';
import type { IconComponent } from './types';
import { normalizeLookupKey } from './utils';

type IconPillRowProps = {
  items: string[];
  iconMap: Record<string, IconComponent>;
  fallbackIcon: IconComponent;
};

const IconPillRow: React.FC<IconPillRowProps> = ({
  items,
  iconMap,
  fallbackIcon,
}) => {
  const showVelocityFallback = items.length >= 6;
  const velocityText = items.join('  •  ');

  return (
    <>
      <div
        className={cn(
          'overflow-x-auto pb-1',
          showVelocityFallback ? 'hidden sm:block' : ''
        )}
      >
        <ul className="flex min-w-max items-center gap-3 pr-2">
          {items.map((item, index) => {
            const Icon = iconMap[normalizeLookupKey(item)] ?? fallbackIcon;

            return (
              <li key={`${item}-${index}`} className="shrink-0">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {showVelocityFallback ? (
        <div className="sm:hidden">
          <ScrollVelocity
            texts={[velocityText]}
            velocity={30}
            damping={45}
            stiffness={320}
            numCopies={5}
            className="px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
            parallaxClassName="rounded-full border border-border/60 bg-muted/35"
            scrollerClassName="!text-xs !font-mono !font-semibold !tracking-[0.14em] !uppercase !text-muted-foreground py-1"
            velocityMapping={{ input: [0, 700], output: [0, 1.2] }}
          />
        </div>
      ) : null}
    </>
  );
};

export default IconPillRow;
