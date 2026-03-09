import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectProfilePage from '@/components/projects/project-profile-page';
import { mapProjectSourceToProfile } from '@/lib/projects';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/live';
import {
  PROJECT_BY_IDENTIFIER_QUERY,
  PROJECT_IDENTIFIERS_QUERY,
} from '@/sanity/lib/queries';
import type {
  PROJECT_BY_IDENTIFIER_QUERYResult,
  PROJECT_IDENTIFIERS_QUERYResult,
} from '@/sanity/types';

type ProjectRouteProps = {
  params: Promise<{
    identifier: string;
  }>;
};

const normalizeIdentifier = (identifier: string): string =>
  identifier.trim().toLowerCase();

const getProjectByIdentifier = async (identifier: string) => {
  const data = await client.fetch<PROJECT_BY_IDENTIFIER_QUERYResult>(
    PROJECT_BY_IDENTIFIER_QUERY,
    {
      identifier: normalizeIdentifier(identifier),
    }
  );

  return mapProjectSourceToProfile(data);
};

const getLiveProjectByIdentifier = async (identifier: string) => {
  const { data } = await sanityFetch({
    query: PROJECT_BY_IDENTIFIER_QUERY,
    params: {
      identifier: normalizeIdentifier(identifier),
    },
  });

  return mapProjectSourceToProfile(data as PROJECT_BY_IDENTIFIER_QUERYResult);
};

export const generateStaticParams = async () => {
  const data =
    await client.fetch<PROJECT_IDENTIFIERS_QUERYResult>(PROJECT_IDENTIFIERS_QUERY);
  const projects = Array.isArray(data)
    ? (data as PROJECT_IDENTIFIERS_QUERYResult)
    : [];
  const identifiers = new Set<string>();

  projects.forEach((project) => {
    if (typeof project.slug === 'string' && project.slug.trim().length > 0) {
      identifiers.add(project.slug.trim().toLowerCase());
    }
    if (typeof project.id === 'string' && project.id.trim().length > 0) {
      identifiers.add(project.id.trim().toLowerCase());
    }
  });

  return [...identifiers].map((identifier) => ({ identifier }));
};

export const generateMetadata = async ({
  params,
}: ProjectRouteProps): Promise<Metadata> => {
  const { identifier } = await params;
  const project = await getProjectByIdentifier(identifier);

  if (!project) {
    return {
      title: 'ADC | Project Page',
    };
  }

  return {
    title: `${project.title} | Project Page`,
    description: project.blurb || `Learn more about ${project.title}.`,
  };
};

const ProjectPage = async ({ params }: ProjectRouteProps) => {
  const { identifier } = await params;
  const project = await getLiveProjectByIdentifier(identifier);

  if (!project) {
    notFound();
  }

  return <ProjectProfilePage project={project} />;
};

export default ProjectPage;
