import {
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Project } from '@/components/ui/project-card';
import ProjectsCarousel from '@/components/projects-carousel';
import { useState } from 'react';

type OfficerProjectsSectionProps = {
  projects: Project[];
};

const OfficerProjectsSection: React.FC<OfficerProjectsSectionProps> = ({
  projects,
}) => {
  const [projectsCarouselApi, setProjectsCarouselApi] =
    useState<CarouselApi | null>(null);
  if (projects.length === 0) return null;

  return (
    <div className="space-y-5 border-b border-border/60 pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
          ADC Projects
        </h3>
        {projects.length > 1 ? (
          <div className="flex items-center gap-2">
            <CarouselPrevious api={projectsCarouselApi} />
            <CarouselNext api={projectsCarouselApi} />
          </div>
        ) : null}
      </div>
      <ProjectsCarousel
        projects={projects}
        setApi={setProjectsCarouselApi}
        hideControls
      />
    </div>
  );
};

export default OfficerProjectsSection;
