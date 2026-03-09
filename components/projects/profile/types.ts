import type * as React from 'react';
import type { ProjectProfile } from '@/lib/projects';

export type ProjectSectionProps = {
  project: ProjectProfile;
};

export type ProjectLinkItem = {
  key: keyof ProjectProfile['links'];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};
