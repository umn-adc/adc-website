import type * as React from 'react';
import { cn } from '@/lib/utils';

type OfficerOverviewMetaItemProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
};

const OfficerOverviewMetaItem: React.FC<OfficerOverviewMetaItemProps> = ({
  label,
  value,
  className,
  valueClassName,
}) => {
  return (
    <div className={className}>
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          'mt-1 font-sans text-xl font-semibold text-foreground',
          valueClassName
        )}
      >
        {value}
      </dd>
    </div>
  );
};

export default OfficerOverviewMetaItem;
