import type * as React from 'react';
import { ViewTransition } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectSectionProps } from '@/components/projects/profile/types';

const ProjectLeadershipSection: React.FC<ProjectSectionProps> = ({
  project,
}) => {
  if (project.leadership.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight">
          Leadership
        </h3>
        <p className="mt-2 font-serif text-lg text-muted-foreground">
          The team leading this project&apos;s strategy and execution.
        </p>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {project.leadership.map((entry, index) => (
          <li
            key={`${entry.title}-${entry.officerName}-${index}`}
            className="rounded-2xl border border-border/60 bg-card p-5 md:p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className={`shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted ${
                  entry.officerPhoto
                    ? 'self-stretch aspect-square max-w-24'
                    : 'mt-1 size-14'
                }`}
              >
                {entry.officerPhoto ? (
                  <img
                    src={entry.officerPhoto}
                    alt={`${entry.officerName} profile photo`}
                    className="block h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-mono text-sm uppercase text-muted-foreground">
                    {entry.officerName.trim().charAt(0) || '?'}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/75">
                  {entry.title}
                </p>
                <ViewTransition name={`${entry.officerId}--name`}>
                  <p className="mt-1 font-sans text-xl font-semibold tracking-tight">
                    {entry.officerName}
                  </p>
                </ViewTransition>
                <p className="font-mono text-xs">{entry.officerId}</p>
                {entry.officerHref ? (
                  <Link
                    href={entry.officerHref}
                    className="group relative mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors"
                  >
                    View officer profile
                    <ArrowUpRight className="size-4" />
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Officer profile coming soon.
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectLeadershipSection;
