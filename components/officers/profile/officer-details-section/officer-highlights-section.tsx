import type * as React from 'react';

type OfficerHighlightsSectionProps = {
  highlights: string[];
  officerId: string;
};

const OfficerHighlightsSection: React.FC<OfficerHighlightsSectionProps> = ({
  highlights,
  officerId,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div>
          <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
            ADC Highlights
          </h3>
          <p className="mt-2 font-serif text-lg text-muted-foreground">
            Top contributions this member has made across projects, systems, and
            community growth.
          </p>
        </div>
      </div>

      <ol className="space-y-5">
        {highlights.map((highlight, index) => (
          <li
            key={`${officerId}-highlight-${index}`}
            className="flex gap-4 border-b border-border/60 pb-5 last:border-0 last:pb-0"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-base md:text-lg leading-relaxed text-foreground/90">
              {highlight}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OfficerHighlightsSection;
