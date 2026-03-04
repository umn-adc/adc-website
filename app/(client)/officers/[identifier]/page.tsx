import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OfficerProfilePage from '@/components/officers/officer-profile-page';
import {
  getHexIdentifierForLookup,
  getOfficerFullName,
  mapOfficerSourceToProfile,
} from '@/lib/officers';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/live';
import {
  OFFICER_BY_IDENTIFIER_QUERY,
  OFFICER_IDENTIFIERS_QUERY,
  PROJECTS_BY_SLUGS_QUERY,
} from '@/sanity/lib/queries';
import type {
  OFFICER_BY_IDENTIFIER_QUERYResult,
  OFFICER_IDENTIFIERS_QUERYResult,
  Project as SanityProject,
} from '@/sanity/types';
import type { Project } from '@/components/ui/project-card';

type SanityProjectWithSlug = SanityProject & {
  slug?: string | null;
};

const mapSanityProjectToProjectCard = (
  project: SanityProject,
  index: number
): Project => {
  const stage = project.stage ?? 'dev';
  const stats =
    stage === 'dev'
      ? undefined
      : {
          users: project.stats?.users ?? 0,
          rating: project.stats?.rating ?? 0,
        };

  return {
    id: project.id ?? project._id ?? index,
    title: project.title ?? 'Untitled project',
    description: project.description ?? '',
    tags: project.tags ?? [],
    type: (project.type ?? 'web') as Project['type'],
    stage,
    ...(project.href ? { href: project.href } : {}),
    ...(project.img
      ? { img: project.img }
      : { color: project.color ?? 'from-primary to-indigo-deep' }),
    ...(stats ? { stats } : {}),
  };
};

const mapAndSortProjectsBySlugs = (
  projectsData: SanityProjectWithSlug[],
  slugs: string[]
): Project[] => {
  const normalizeKey = (value: string) => value.trim().toLowerCase();
  const mapped = projectsData.map((project, index) =>
    mapSanityProjectToProjectCard(project, index)
  );

  const indexByKey = new Map<string, number>();
  projectsData.forEach((project, index) => {
    const keys = [project.slug, project.id, project._id];
    keys.forEach((key) => {
      if (!key) return;
      const normalizedKey = normalizeKey(key);
      if (!indexByKey.has(normalizedKey)) {
        indexByKey.set(normalizedKey, index);
      }
    });
  });

  const usedIndexes = new Set<number>();
  const ordered: Project[] = [];

  slugs.forEach((slug) => {
    const index = indexByKey.get(normalizeKey(slug));
    if (index === undefined || usedIndexes.has(index)) return;
    usedIndexes.add(index);
    ordered.push(mapped[index]);
  });

  mapped.forEach((project, index) => {
    if (!usedIndexes.has(index)) {
      ordered.push(project);
    }
  });

  return ordered;
};

type OfficerProfileRouteProps = {
  params: Promise<{
    identifier: string;
  }>;
};

const getOfficerByIdentifier = async (identifier: string) => {
  const lowerIdentifier = identifier.toLowerCase();
  const data = await client.fetch<OFFICER_BY_IDENTIFIER_QUERYResult>(
    OFFICER_BY_IDENTIFIER_QUERY,
    {
      slugIdentifier: lowerIdentifier,
      hexIdentifier: getHexIdentifierForLookup(lowerIdentifier),
    }
  );

  if (data === null || data === undefined) return undefined;

  return mapOfficerSourceToProfile(
    data as Exclude<OFFICER_BY_IDENTIFIER_QUERYResult, null>
  );
};

const getLiveOfficerByIdentifier = async (identifier: string) => {
  const lowerIdentifier = identifier.toLowerCase();
  const { data } = await sanityFetch({
    query: OFFICER_BY_IDENTIFIER_QUERY,
    params: {
      slugIdentifier: lowerIdentifier,
      hexIdentifier: getHexIdentifierForLookup(lowerIdentifier),
    },
  });

  if (data === null || data === undefined) return undefined;

  return mapOfficerSourceToProfile(
    data as Exclude<OFFICER_BY_IDENTIFIER_QUERYResult, null>
  );
};

export const generateStaticParams = async () => {
  const data =
    await client.fetch<OFFICER_IDENTIFIERS_QUERYResult>(OFFICER_IDENTIFIERS_QUERY);

  const officers = Array.isArray(data)
    ? (data as OFFICER_IDENTIFIERS_QUERYResult)
    : [];
  const identifiers = new Set<string>();

  officers.forEach((officer) => {
    if (typeof officer.slug === 'string' && officer.slug.trim().length > 0) {
      identifiers.add(officer.slug.trim().toLowerCase());
    }

    if (typeof officer.id === 'string' && officer.id.trim().length > 0) {
      const hex = officer.id.replace(/^0x/i, '').trim().toLowerCase();
      if (hex) {
        identifiers.add(hex);
      }
    }
  });

  return [...identifiers].map((identifier) => ({ identifier }));
};

export const generateMetadata = async ({
  params,
}: OfficerProfileRouteProps): Promise<Metadata> => {
  const { identifier } = await params;
  const officer = await getOfficerByIdentifier(identifier);

  if (!officer) {
    return {
      title: 'ADC | Officer Profile',
    };
  }

  return {
    title: `${getOfficerFullName(officer)} | Officer Profile`,
    description: officer.bioShort,
  };
};

const OfficerPage = async ({ params }: OfficerProfileRouteProps) => {
  const { identifier } = await params;
  const officer = await getLiveOfficerByIdentifier(identifier);

  if (!officer) {
    notFound();
  }

  const projectSlugs = officer.projects ?? [];
  const { data: projectsData } =
    projectSlugs.length > 0
      ? await sanityFetch({
          query: PROJECTS_BY_SLUGS_QUERY,
          params: { slugs: projectSlugs },
        })
      : { data: [] };

  const projects = Array.isArray(projectsData)
    ? mapAndSortProjectsBySlugs(
        projectsData as SanityProjectWithSlug[],
        projectSlugs
      )
    : [];

  return <OfficerProfilePage officer={officer} projects={projects} />;
};

export default OfficerPage;
