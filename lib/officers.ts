export type OfficerPredefinedLinkType =
  | 'portfolio'
  | 'github'
  | 'linkedin'
  | 'x'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'twitch';

export type OfficerLink =
  | {
      type: OfficerPredefinedLinkType;
      url: string;
      label?: never;
    }
  | {
      type: 'other';
      label: string;
      url: string;
    };

const officerPredefinedLinkLabels: Record<OfficerPredefinedLinkType, string> = {
  portfolio: 'Portfolio',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  x: 'X',
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
  twitch: 'Twitch',
};

export const getOfficerLinkLabel = (link: OfficerLink): string =>
  link.type === 'other' ? link.label : officerPredefinedLinkLabels[link.type];

export type OfficerProfile = {
  id: string;
  slug: string;
  givenName: string;
  familyName: string;
  current: boolean;
  specialization?: string;
  positions: {
    position: string;
    startYear: number;
    endYear: number;
  }[];
  logo?: string;
  projects?: string[];
  modelUrl: string;
  bioShort: string;
  bioLong: string;
  detailsTitle?: string;
  leadershipStyle?: string;
  nationalities?: string[];
  college?: string;
  major?: string;
  classYear?: number;
  techStack: string[];
  companies?: string[];
  highlights?: string[];
  hobbies?: string[];
  links: OfficerLink[];
};

export const getOfficerFullName = (officer: OfficerProfile): string =>
  [officer.givenName, officer.familyName].filter(Boolean).join(' ').trim();

export const getOfficerGivenNamePossessive = (givenName: string): string => {
  if (!givenName) return "Officer's";
  return givenName.endsWith('s') ? `${givenName}'` : `${givenName}'s`;
};

export const getOfficerHexCode = (officer: OfficerProfile): string =>
  officer.id.replace(/^0x/i, '').toLowerCase();

export type OfficerSource = {
  id?: string | null;
  slug?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  current?: boolean | null;
  specialization?: string | null;
  positions?: Array<{
    position?: string | null;
    startYear?: number | null;
    endYear?: number | null;
  } | null> | null;
  logo?: string | null;
  projects?: Array<string | null> | null;
  modelUrl?: string | null;
  bioShort?: string | null;
  bioLong?: string | null;
  detailsTitle?: string | null;
  leadershipStyle?: string | null;
  nationalities?: Array<string | null> | null;
  college?: string | null;
  major?: string | null;
  classYear?: number | null;
  techStack?: Array<string | null> | null;
  companies?: Array<string | null> | null;
  highlights?: Array<string | null> | null;
  hobbies?: Array<string | null> | null;
  links?: Array<{
    type?: string | null;
    label?: string | null;
    url?: string | null;
  } | null> | null;
};

const isNonEmptyString = (value: string | null | undefined): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const toStringArray = (values: Array<string | null> | null | undefined) =>
  (values ?? [])
    .filter((value): value is string => isNonEmptyString(value))
    .map((value) => value.trim());

const predefinedLinkTypes = new Set<OfficerPredefinedLinkType>([
  'portfolio',
  'github',
  'linkedin',
  'x',
  'instagram',
  'youtube',
  'facebook',
  'twitch',
]);

const mapOfficerLink = (
  link:
    | {
        type?: string | null;
        label?: string | null;
        url?: string | null;
      }
    | null
    | undefined
): OfficerLink | null => {
  if (!link || !isNonEmptyString(link.url)) {
    return null;
  }

  const url = link.url.trim();
  const type = (link.type ?? '').trim().toLowerCase();

  if (predefinedLinkTypes.has(type as OfficerPredefinedLinkType)) {
    return {
      type: type as OfficerPredefinedLinkType,
      url,
    };
  }

  return {
    type: 'other',
    label: isNonEmptyString(link.label) ? link.label.trim() : 'Website',
    url,
  };
};

const mapOfficerPositions = (
  positions:
    | Array<{
        position?: string | null;
        startYear?: number | null;
        endYear?: number | null;
      } | null>
    | null
    | undefined
): OfficerProfile['positions'] =>
  (positions ?? [])
    .map((position) => {
      if (!position || !isNonEmptyString(position.position)) {
        return null;
      }

      if (
        typeof position.startYear !== 'number' ||
        Number.isNaN(position.startYear)
      ) {
        return null;
      }

      const endYear =
        typeof position.endYear === 'number' && !Number.isNaN(position.endYear)
          ? position.endYear
          : position.startYear;

      return {
        position: position.position.trim(),
        startYear: position.startYear,
        endYear,
      };
    })
    .filter((position): position is OfficerProfile['positions'][number] =>
      Boolean(position)
    );

export const mapOfficerSourceToProfile = (
  officer: OfficerSource
): OfficerProfile | null => {
  if (
    !isNonEmptyString(officer.id) ||
    !isNonEmptyString(officer.slug) ||
    !isNonEmptyString(officer.givenName) ||
    !isNonEmptyString(officer.familyName) ||
    !isNonEmptyString(officer.modelUrl) ||
    !isNonEmptyString(officer.bioShort)
  ) {
    return null;
  }

  const links = (officer.links ?? [])
    .map((link) => mapOfficerLink(link))
    .filter((link): link is OfficerLink => Boolean(link));

  return {
    id: officer.id.trim(),
    slug: officer.slug.trim().toLowerCase(),
    givenName: officer.givenName.trim(),
    familyName: officer.familyName.trim(),
    current: officer.current ?? true,
    specialization: isNonEmptyString(officer.specialization)
      ? officer.specialization.trim()
      : undefined,
    positions: mapOfficerPositions(officer.positions),
    logo: isNonEmptyString(officer.logo) ? officer.logo.trim() : undefined,
    projects: toStringArray(officer.projects),
    modelUrl: officer.modelUrl.trim(),
    bioShort: officer.bioShort.trim(),
    bioLong: isNonEmptyString(officer.bioLong)
      ? officer.bioLong.trim()
      : officer.bioShort.trim(),
    detailsTitle: isNonEmptyString(officer.detailsTitle)
      ? officer.detailsTitle.trim()
      : undefined,
    leadershipStyle: isNonEmptyString(officer.leadershipStyle)
      ? officer.leadershipStyle.trim()
      : undefined,
    nationalities: toStringArray(officer.nationalities),
    college: isNonEmptyString(officer.college)
      ? officer.college.trim()
      : undefined,
    major: isNonEmptyString(officer.major) ? officer.major.trim() : undefined,
    classYear:
      typeof officer.classYear === 'number' && !Number.isNaN(officer.classYear)
        ? officer.classYear
        : undefined,
    techStack: toStringArray(officer.techStack),
    companies: toStringArray(officer.companies),
    highlights: toStringArray(officer.highlights),
    hobbies: toStringArray(officer.hobbies),
    links,
  };
};

export const mapOfficerSourcesToProfiles = (
  officers: OfficerSource[] | null | undefined
): OfficerProfile[] =>
  (officers ?? [])
    .map((officer) => mapOfficerSourceToProfile(officer))
    .filter((officer): officer is OfficerProfile => Boolean(officer));

export const getHexIdentifierForLookup = (identifier: string): string => {
  const lower = identifier.toLowerCase();
  if (/^0x[0-9a-f]+$/.test(lower)) {
    return lower;
  }
  if (/^[0-9a-f]+$/.test(lower)) {
    return `0x${lower}`;
  }
  return '__invalid_hex_identifier__';
};
