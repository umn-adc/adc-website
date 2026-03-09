import type * as React from 'react';
import type { ProjectSectionProps } from '@/components/projects/profile/types';
import {
  formatProjectDate,
  getProjectStageLabel,
} from '@/components/projects/profile/utils';
import ProjectOverviewMetaItem from './project-overview-meta-item';

const ProjectOverviewSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const stageLabel = getProjectStageLabel(project.stage);
  const startDateLabel = formatProjectDate(project.startDate);
  const releaseDateLabel = formatProjectDate(project.releaseDate);
  const deprecationDateLabel = formatProjectDate(project.deprecationDate);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] border-b border-border/60 pb-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/75">
          Project Details
        </p>
        <h2 className="mt-3 font-sans text-4xl md:text-5xl font-bold tracking-tight text-balance">
          {project.blurb}
        </h2>
        <p className="mt-6 font-serif text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty">
          {project.longDescription}
        </p>
      </div>

      <dl className="space-y-5 border-l border-border/60 pl-6">
        <ProjectOverviewMetaItem label="Status" value={stageLabel} />
        {startDateLabel ? (
          <ProjectOverviewMetaItem label="Started" value={startDateLabel} />
        ) : null}
        {releaseDateLabel ? (
          <ProjectOverviewMetaItem label="Released" value={releaseDateLabel} />
        ) : null}
        {deprecationDateLabel ? (
          <ProjectOverviewMetaItem
            label="Deprecated"
            value={deprecationDateLabel}
          />
        ) : null}
        <ProjectOverviewMetaItem
          label="Project Types"
          value={project.types.map((type) => type.toUpperCase()).join(' • ')}
        />
      </dl>
    </div>
  );
};

export default ProjectOverviewSection;
