import type * as React from 'react';
import { Wrench } from 'lucide-react';
import LogoLoop from '@/components/ui/logo-loop';
import { techMap } from './icon-maps';
import { normalizeLookupKey } from './utils';

type TechStackVelocityRowProps = {
  stack: string[];
};

const TechStackVelocityRow: React.FC<TechStackVelocityRowProps> = ({
  stack,
}) => {
  const logos = stack.map((tech) => {
    const key = normalizeLookupKey(tech);
    const techItem = techMap[key];
    const Icon = techItem?.icon ?? Wrench;
    const href =
      techItem?.url ??
      `https://www.google.com/search?q=${encodeURIComponent(tech)}`;

    return {
      node: <Icon className="text-foreground" aria-hidden />,
      href,
      title: tech,
      ariaLabel: `${tech} official page`,
    };
  });

  return (
    <LogoLoop
      scrollVelocity
      scrollVelocityStiffness={600}
      logos={logos}
      speed={100}
      direction="left"
      logoHeight={60}
      gap={60}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      fadeOutColor="#fdfefe"
      ariaLabel="Officer Tech Stack"
    />
  );
};

export default TechStackVelocityRow;
