import type * as React from 'react';
import TechStackVelocityRow from './tech-stack-velocity-row';
import { getOfficerGivenNamePossessive } from '@/lib/officers';

type OfficerTechStackSectionProps = {
  officerGivenName: string;
  techStack: string[];
};

const OfficerTechStackSection: React.FC<OfficerTechStackSectionProps> = ({
  officerGivenName,
  techStack,
}) => {
  return (
    <div className="space-y-5 border-b border-border/60 pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
          Tech Stack
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {getOfficerGivenNamePossessive(officerGivenName)} daily drivers
        </p>
      </div>
      <TechStackVelocityRow stack={techStack} />
    </div>
  );
};

export default OfficerTechStackSection;
