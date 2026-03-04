type Option = {
  title: string;
  value: string;
};

import { techMap } from '../../components/officers/profile/officer-details-section/icon-maps';

export const OFFICER_HEX_ID_PATTERN = /^0x[0-9a-f]{4}$/i;
const OFFICER_HEX_MAX = 0xffff;

export const getNextHexOfficerId = (ids: Array<string | null | undefined>): string => {
  const max = ids.reduce((highest, value) => {
    if (!value || !OFFICER_HEX_ID_PATTERN.test(value)) return highest;
    const parsed = Number.parseInt(value.slice(2), 16);
    return Number.isNaN(parsed) ? highest : Math.max(highest, parsed);
  }, -1);

  const next = max + 1;
  if (next > OFFICER_HEX_MAX) {
    throw new Error('No remaining 4-digit officer hex IDs.');
  }

  return `0x${next.toString(16).padStart(4, '0')}`;
};

const normalizeSlugToken = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const buildCanonicalOfficerSlug = (
  givenName?: string | null,
  familyName?: string | null
): string =>
  [givenName ?? '', familyName ?? '']
    .map((part) => normalizeSlugToken(part))
    .filter(Boolean)
    .join('-');

export const slugifyOfficerValue = (value: string): string =>
  normalizeSlugToken(value);

const normalizeTechKey = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, ' ');

const TECH_STACK_KEYS = Object.keys(techMap).sort((a, b) =>
  a.localeCompare(b, 'en')
);

const techStackTitleOverrides: Record<string, string> = {
  aws: 'AWS',
  c: 'C',
  'c#': 'C#',
  'c++': 'C++',
  css: 'CSS',
  html: 'HTML',
  ios: 'iOS',
  npm: 'npm',
  sql: 'SQL',
  ubuntu: 'Ubuntu',
  ui: 'UI',
  ux: 'UX',
};

const toTechStackTitle = (key: string): string =>
  techStackTitleOverrides[key] ?? key;

export const TECH_STACK_OPTIONS: Option[] = TECH_STACK_KEYS.map((key) => ({
  title: toTechStackTitle(key),
  value: key,
}));

const TECH_STACK_ALLOWED_NORMALIZED_VALUES = new Set<string>(
  TECH_STACK_KEYS.map((key) => normalizeTechKey(key))
);

export const isAllowedTechStackValue = (value: string): boolean =>
  TECH_STACK_ALLOWED_NORMALIZED_VALUES.has(normalizeTechKey(value));

const nationalityLabelOverrides: Record<string, string> = {
  PS: 'Palestine',
  US: 'USA',
};

const excludedNationalityLabels = new Set<string>([
  'Outlying Oceania',
  'Pseudo-Accents',
  'Pseudo-Bidi',
  'United Nations',
]);

const buildNationalityOptions = (): Option[] => {
  if (typeof Intl === 'undefined' || typeof Intl.DisplayNames === 'undefined') {
    return [
      { title: 'USA', value: 'USA' },
      { title: 'Brazil', value: 'Brazil' },
      { title: 'China', value: 'China' },
      { title: 'Palestine', value: 'Palestine' },
    ];
  }

  const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const options: Option[] = [];

  for (let first = 65; first <= 90; first += 1) {
    for (let second = 65; second <= 90; second += 1) {
      const code = `${String.fromCharCode(first)}${String.fromCharCode(second)}`;
      const label = nationalityLabelOverrides[code] ?? displayNames.of(code);

      if (!label) continue;
      if (label.toUpperCase() === code) continue;
      if (label.toLowerCase() === 'unknown region') continue;
      if (excludedNationalityLabels.has(label)) continue;

      options.push({ title: label, value: label });
    }
  }

  const deduped = new Map<string, Option>();
  options.forEach((option) => {
    deduped.set(option.value.toLowerCase(), option);
  });

  return [...deduped.values()].sort((a, b) =>
    a.title.localeCompare(b.title, 'en')
  );
};

export const NATIONALITY_OPTIONS = buildNationalityOptions();
