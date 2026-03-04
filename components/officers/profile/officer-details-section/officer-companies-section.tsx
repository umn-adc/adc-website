import type * as React from 'react';
import IconPillRow from './icon-pill-row';
import { companyFallbackIcon, companyIconMap } from './icon-maps';

type OfficerCompaniesSectionProps = {
  companies: string[];
  officerGivenName: string;
};

const OfficerCompaniesSection: React.FC<OfficerCompaniesSectionProps> = ({
  companies,
  officerGivenName,
}) => {
  if (companies.length === 0) return null;

  return (
    <div className="space-y-5 border-b border-border/60 pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
          Companies
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Organizations {officerGivenName} has worked with/at
        </p>
      </div>
      <IconPillRow
        items={companies}
        iconMap={companyIconMap}
        fallbackIcon={companyFallbackIcon}
      />
    </div>
  );
};

export default OfficerCompaniesSection;
