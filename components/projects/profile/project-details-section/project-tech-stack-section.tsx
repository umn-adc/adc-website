import type * as React from 'react';
import TechStackVelocityRow from '@/components/officers/profile/officer-details-section/tech-stack-velocity-row';
import type { ProjectSectionProps } from '@/components/projects/profile/types';

const ProjectTechStackSection: React.FC<ProjectSectionProps> = ({ project }) => {
  if (project.techStack.length === 0) return null;

  return (
    <div className="space-y-5 border-b border-border/60 pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
          Tech Stack
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Tools powering this build
        </p>
      </div>

      <TechStackVelocityRow stack={project.techStack} />
    </div>
  );
};

export default ProjectTechStackSection;
