import type * as React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  PencilRuler,
  type LucideIcon,
} from 'lucide-react';
import type { ProjectSectionProps } from '@/components/projects/profile/types';
import { projectTypeData } from '@/components/ui/project-type-tag';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  formatProjectDate,
  getProjectStageLabel,
} from '@/components/projects/profile/utils';
import ProjectOverviewMetaItem from './project-overview-meta-item';

const stageIconMap: Record<
  ProjectSectionProps['project']['stage'],
  LucideIcon
> = {
  dev: PencilRuler,
  release: CheckCircle2,
  unsupported: AlertTriangle,
};

const ProjectOverviewSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const stageLabel = getProjectStageLabel(project.stage);
  const StageIcon = stageIconMap[project.stage];
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
        <ProjectOverviewMetaItem
          label="Status"
          value={
            <span className="inline-flex items-center gap-1.5 font-sans text-sm text-foreground/85">
              <StageIcon className="size-4 shrink-0" />
              <span>{stageLabel}</span>
            </span>
          }
        />
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
          value={
            <div className="flex flex-wrap items-center gap-2">
              {project.types.map((type) => {
                const { icon: TypeIcon, label } = projectTypeData[type];
                return (
                  <Tooltip key={`${project.id}-type-${type}`}>
                    <TooltipTrigger
                      className="inline-flex size-8 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-foreground/80 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label={label}
                    >
                      <TypeIcon className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={6}>
                      {label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          }
        />
      </dl>
    </div>
  );
};

export default ProjectOverviewSection;
