import type * as React from 'react';
import type { OfficerProfile } from '@/lib/officers';
import OfficerOverviewMetaItem from './officer-overview-meta-item';

type OfficerOverviewSectionProps = {
  officer: OfficerProfile;
  tenure: string;
};

type NationalityMeta = {
  code: string;
  label: string;
};

const countryLabelOverrides: Record<string, string> = {
  US: 'USA',
  PS: 'Palestine',
};

const getRegionCodes = (): string[] => {
  const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const codes: string[] = [];

  for (let first = 65; first <= 90; first += 1) {
    for (let second = 65; second <= 90; second += 1) {
      const code = `${String.fromCharCode(first)}${String.fromCharCode(second)}`;
      const label = displayNames.of(code);

      if (!label) continue;
      if (label.toUpperCase() === code) continue;
      if (label.toLowerCase() === 'unknown region') continue;

      codes.push(code);
    }
  }

  return codes;
};

const getFlagEmoji = (countryCode: string): string => {
  if (!/^[A-Z]{2}$/.test(countryCode)) return '';
  return [...countryCode].map((char) =>
    String.fromCodePoint(char.charCodeAt(0) + 127397)
  ).join('');
};

const buildNationalityFlagMap = (): Record<string, NationalityMeta> => {
  const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const map: Record<string, NationalityMeta> = {};

  getRegionCodes().forEach((code) => {
    const label = countryLabelOverrides[code] ?? displayNames.of(code);
    if (!label || label.toUpperCase() === code) return;

    const country = { code, label };
    map[label.toLowerCase()] = country;
  });

  return map;
};

const nationalityFlagMap = buildNationalityFlagMap();

const formatNationality = (nationality: string): string => {
  const cleaned = nationality.trim();
  const normalized = cleaned.toLowerCase();
  const country = nationalityFlagMap[normalized];

  if (country) {
    return `${getFlagEmoji(country.code)} ${country.label}`.trim();
  }

  return cleaned;
};

const OfficerOverviewSection: React.FC<OfficerOverviewSectionProps> = ({
  officer,
  tenure,
}) => {
  const nationalities = officer.nationalities ?? [];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] border-b border-border/60 pb-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/75">
          Officer Details
        </p>
        <h2 className="mt-3 font-sans text-4xl md:text-5xl font-bold tracking-tight text-balance">
          {officer.detailsTitle ?? 'Building Momentum Across ADC'}
        </h2>
        <p className="mt-6 font-serif text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty">
          {officer.bioLong}
        </p>
      </div>

      <dl className="space-y-5 border-l border-border/60 pl-6">
        <OfficerOverviewMetaItem
          label="Specialization"
          value={officer.specialization ?? 'Officer'}
        />
        <OfficerOverviewMetaItem label="Tenure" value={tenure} />
        <OfficerOverviewMetaItem
          label="Leadership Style"
          value={officer.leadershipStyle ?? 'Builder-first'}
        />
        {nationalities.length > 0 ? (
          <OfficerOverviewMetaItem
            label={nationalities.length > 1 ? 'Nationalities' : 'Nationality'}
            valueClassName="flex flex-wrap gap-x-3 gap-y-1"
            value={nationalities.map((nationality, index) => (
              <span key={`${nationality}-${index}`}>
                {formatNationality(nationality)}
              </span>
            ))}
          />
        ) : null}
      </dl>
    </div>
  );
};

export default OfficerOverviewSection;
