import type * as React from 'react';
import type { ProjectSectionProps } from './types';
import {
  ProjectLeadershipSection,
  ProjectOverviewSection,
  ProjectTechStackSection,
} from './project-details-section/index';

const ProjectDetailsSection: React.FC<ProjectSectionProps> = ({ project }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(87,54,255,0.08),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_88%,rgba(30,61,89,0.06),transparent_42%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="space-y-14">
          <ProjectOverviewSection project={project} />
          <ProjectTechStackSection project={project} />
          <ProjectLeadershipSection project={project} />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
