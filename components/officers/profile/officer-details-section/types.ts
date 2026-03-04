import type * as React from 'react';

export type IconComponent = React.ComponentType<{ className?: string }>;

export type TechMapItem = {
  icon: IconComponent;
  url: string;
};
