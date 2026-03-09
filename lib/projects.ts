import type { ProjectType } from '@/components/ui/project-type-tag';
import type { PROJECT_BY_IDENTIFIER_QUERYResult } from '@/sanity/types';

type ProjectSource = Exclude<PROJECT_BY_IDENTIFIER_QUERYResult, null>;
type ProjectImage = Exclude<ProjectSource['img'], null>;

type ProjectStage = 'release' | 'dev' | 'unsupported';

export type ProjectLinkMap = {
  web?: string;
  ios?: string;
  android?: string;
  other?: string;
};

export type ProjectDemoVideoMap = {
  web?: string;
  ios?: string;
  android?: string;
  cli?: string;
};

export type ProjectLeadershipEntry = {
  title: string;
  officerName: string;
  officerHref?: string;
  officerId?: string;
  officerPhoto?: string;
};

export type ProjectProfile = {
  id: string;
  slug: string;
  title: string;
  logo?: string;
  shortDescription: string;
  blurb: string;
  longDescription: string;
  stage: ProjectStage;
  types: ProjectType[];
  tags: string[];
  techStack: string[];
  links: ProjectLinkMap;
  demoVideo: ProjectDemoVideoMap;
  terminalExample: string[];
  leadership: ProjectLeadershipEntry[];
  startDate?: string;
  releaseDate?: string;
  deprecationDate?: string;
  img?: ProjectImage;
};

const isNonEmptyString = (value: string | null | undefined): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const toStringArray = (values: Array<string | null> | null | undefined): string[] =>
  (values ?? [])
    .filter((value): value is string => isNonEmptyString(value))
    .map((value) => value.trim());

const normalizeProjectTypes = (
  values: Array<string> | Array<never> | Array<'cli' | 'mobile' | 'web'> | null
): ProjectType[] => {
  const valid = (values ?? []).filter(
    (value): value is ProjectType =>
      value === 'mobile' || value === 'web' || value === 'cli'
  );
  return valid.length > 0 ? valid : ['web'];
};

const normalizeOfficerIdentifier = (value?: string): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (/^0x[0-9a-f]+$/i.test(trimmed)) {
    return trimmed.replace(/^0x/i, '').toLowerCase();
  }

  return trimmed.toLowerCase();
};

const getOfficerHref = (officer?: {
  slug: string | null;
  id: string | null;
}): string | undefined => {
  if (!officer) return undefined;
  if (isNonEmptyString(officer.slug)) {
    return `/officers/${officer.slug.trim().toLowerCase()}`;
  }

  const normalizedId = normalizeOfficerIdentifier(
    isNonEmptyString(officer.id) ? officer.id : undefined
  );
  return normalizedId ? `/officers/${normalizedId}` : undefined;
};

const getOfficerDisplayName = (officer?: {
  givenName: string | null;
  familyName: string | null;
  id: string | null;
}): string => {
  if (!officer) return 'Officer';
  const fullName = [officer.givenName, officer.familyName]
    .filter((value): value is string => isNonEmptyString(value))
    .map((value) => value.trim())
    .join(' ')
    .trim();

  if (fullName) return fullName;
  if (isNonEmptyString(officer.id)) return officer.id.trim();
  return 'Officer';
};

const mapLeadership = (
  leadership:
    | Array<{
        title: string | null;
        officer: {
          id: string | null;
          slug: string | null;
          givenName: string | null;
          familyName: string | null;
          photo?: string | null;
        } | null;
      } | null>
    | null
    | undefined
): ProjectLeadershipEntry[] => {
  const grouped = new Map<
    string,
    {
      officerName: string;
      officerHref?: string;
      officerId?: string;
      officerPhoto?: string;
      titles: string[];
    }
  >();

  (leadership ?? []).forEach((entry) => {
    if (!entry || !isNonEmptyString(entry.title)) return;

    const title = entry.title.trim();
    const officer = entry.officer ?? undefined;
    const officerName = getOfficerDisplayName(officer);
    const officerHref = getOfficerHref(officer);
    const officerId = isNonEmptyString(officer?.id)
      ? officer.id.trim()
      : undefined;
    const officerPhoto = isNonEmptyString(officer?.photo)
      ? officer.photo.trim()
      : undefined;
    const key = officerId
      ? `id:${officerId.toLowerCase()}`
      : officerHref
        ? `href:${officerHref}`
        : `name:${officerName.toLowerCase()}`;

    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        officerName,
        ...(officerHref ? { officerHref } : {}),
        ...(officerId ? { officerId } : {}),
        ...(officerPhoto ? { officerPhoto } : {}),
        titles: [title],
      });
      return;
    }

    if (!existing.officerPhoto && officerPhoto) {
      existing.officerPhoto = officerPhoto;
    }

    if (!existing.titles.includes(title)) {
      existing.titles.push(title);
    }
  });

  return [...grouped.values()].map((entry) => ({
    title: entry.titles.join(', '),
    officerName: entry.officerName,
    ...(entry.officerHref ? { officerHref: entry.officerHref } : {}),
    ...(entry.officerId ? { officerId: entry.officerId } : {}),
    ...(entry.officerPhoto ? { officerPhoto: entry.officerPhoto } : {}),
  }));
};

const normalizeStage = (stage: ProjectSource['stage']): ProjectStage =>
  stage === 'release' || stage === 'unsupported' ? stage : 'dev';

const trimOrUndefined = (value?: string | null): string | undefined =>
  isNonEmptyString(value) ? value.trim() : undefined;

export const mapProjectSourceToProfile = (
  project: PROJECT_BY_IDENTIFIER_QUERYResult
): ProjectProfile | null => {
  if (!project || !isNonEmptyString(project.title)) return null;

  const id = trimOrUndefined(project.id) ?? trimOrUndefined(project.slug);
  const slug = trimOrUndefined(project.slug) ?? trimOrUndefined(project.id);
  if (!id || !slug) return null;

  const blurb = trimOrUndefined(project.blurb ?? project.description) ?? '';
  const shortDescription =
    trimOrUndefined(project.description ?? project.blurb) ?? blurb;
  const longDescription =
    trimOrUndefined(project.longDescription ?? project.description ?? project.blurb) ??
    blurb;

  return {
    id,
    slug: slug.toLowerCase(),
    title: project.title.trim(),
    logo: trimOrUndefined(project.logo),
    shortDescription,
    blurb,
    longDescription,
    stage: normalizeStage(project.stage),
    types: normalizeProjectTypes(project.types),
    tags: toStringArray(project.tags),
    techStack: toStringArray(project.techStack),
    links: {
      web: trimOrUndefined(project.links?.web),
      ios: trimOrUndefined(project.links?.ios),
      android: trimOrUndefined(project.links?.android),
      other: trimOrUndefined(project.links?.other),
    },
    demoVideo: {
      web: trimOrUndefined(project.demoVideo?.web),
      ios: trimOrUndefined(project.demoVideo?.ios),
      android: trimOrUndefined(project.demoVideo?.android),
      cli: trimOrUndefined(project.demoVideo?.cli),
    },
    terminalExample: toStringArray(project.terminalExample),
    leadership: mapLeadership(project.leadership),
    startDate: trimOrUndefined(project.startDate),
    releaseDate: trimOrUndefined(project.releaseDate),
    deprecationDate: trimOrUndefined(project.deprecationDate),
    img:
      project.img && project.img.asset?._ref
        ? (project.img as ProjectImage)
        : undefined,
  };
};
