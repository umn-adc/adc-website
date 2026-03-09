import type { ProjectProfile } from '@/lib/projects';

export const formatProjectDate = (value?: string): string | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getProjectStageLabel = (stage: ProjectProfile['stage']): string => {
  if (stage === 'release') return 'Released';
  if (stage === 'unsupported') return 'Deprecated';
  return 'In Development';
};
