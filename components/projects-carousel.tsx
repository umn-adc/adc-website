'use client';

import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import ProjectCard from './ui/project-card';
import type { Project } from './ui/project-card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

type ProjectsCarouselProps = {
  projects: Project[];
  setApi?: React.ComponentProps<typeof Carousel>['setApi'];
  opts?: React.ComponentProps<typeof Carousel>['opts'];
  contentProps?: Omit<React.ComponentProps<typeof CarouselContent>, 'children'>;
  itemProps?: Omit<React.ComponentProps<typeof CarouselItem>, 'children'>;
  hideControls?: boolean;
};

export default function ProjectsCarousel({
  projects,
  setApi,
  opts,
  contentProps,
  itemProps,
  hideControls = false,
}: ProjectsCarouselProps) {
  const [api, setInternalApi] = useState<CarouselApi | null>(null);
  const { className: contentClassName, ...contentRestProps } = contentProps ?? {};
  const { className: itemClassName, ...itemRestProps } = itemProps ?? {};
  const resolvedOpts: React.ComponentProps<typeof Carousel>['opts'] = {
    align: 'start',
    ...opts,
  };

  const handleSetApi = useCallback(
    (nextApi: CarouselApi) => {
      setInternalApi(nextApi);
      setApi?.(nextApi);
    },
    [setApi]
  );

  return (
    <div>
      {!hideControls && projects.length > 1 ? (
        <div className="mb-4 flex items-center justify-end gap-2">
          <CarouselPrevious api={api} />
          <CarouselNext api={api} />
        </div>
      ) : null}

      <Carousel opts={resolvedOpts} setApi={handleSetApi}>
        <CarouselContent
          className={cn('-ml-6 py-4', contentClassName)}
          {...contentRestProps}
        >
          {projects.map((project, index) => (
            <CarouselItem
              key={String(project.id)}
              className={cn(
                'pl-6 basis-full md:basis-1/2 lg:basis-1/3',
                itemClassName
              )}
              {...itemRestProps}
            >
              <ProjectCard
                project={project}
                index={index}
                isActive={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
