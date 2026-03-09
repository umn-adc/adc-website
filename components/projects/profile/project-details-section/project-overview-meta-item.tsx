import type * as React from 'react';

type ProjectOverviewMetaItemProps = {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
};

const ProjectOverviewMetaItem: React.FC<ProjectOverviewMetaItemProps> = ({
  label,
  value,
  valueClassName,
}) => (
  <div className="space-y-2">
    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
      {label}
    </dt>
    <dd className={valueClassName ?? 'font-serif text-base text-foreground'}>
      {value}
    </dd>
  </div>
);

export default ProjectOverviewMetaItem;
