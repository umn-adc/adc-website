import type * as React from 'react';

type OfficerHobbiesSectionProps = {
  hobbies: string[];
  officerId: string;
};

const OfficerHobbiesSection: React.FC<OfficerHobbiesSectionProps> = ({
  hobbies,
  officerId,
}) => {
  if (hobbies.length === 0) return null;

  return (
    <div className="space-y-5 border-b border-border/60 pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
          Hobbies
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Outside the build
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <span
            key={`${officerId}-hobby-${index}`}
            className="inline-flex items-center rounded-full border border-border/60 bg-white px-4 py-2 text-sm text-primary/200"
          >
            {hobby}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OfficerHobbiesSection;
