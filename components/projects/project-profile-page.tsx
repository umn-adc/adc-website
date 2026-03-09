import type * as React from 'react';
import type { ProjectProfile } from '@/lib/projects';
import {
  ProjectDetailsSection,
  ProjectHeroSection,
} from '@/components/projects/profile';

type ProjectProfilePageProps = {
  project: ProjectProfile;
};

const ProjectProfilePage: React.FC<ProjectProfilePageProps> = ({ project }) => {
  return (
    <main className="relative">
      <ProjectHeroSection project={project} />
      <ProjectDetailsSection project={project} />
    </main>
  );
};

export default ProjectProfilePage;
