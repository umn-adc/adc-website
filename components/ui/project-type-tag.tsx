import { Globe, Smartphone, TerminalSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const projectTypeData = {
  mobile: { label: 'Mobile app', icon: Smartphone },
  web: { label: 'Web app', icon: Globe },
  cli: { label: 'CLI tool', icon: TerminalSquare },
} as const;

export type ProjectType = keyof typeof projectTypeData;

type ProjectTypeTagProps = {
  type: ProjectType;
  className?: string;
};

const ProjectTypeTag: React.FC<ProjectTypeTagProps> = ({ type, className }) => {
  const { icon: Icon, label } = projectTypeData[type];

  return (
    <Badge
      variant="secondary"
      className={cn(
        'bg-primary-foreground/12 backdrop-blur-xs text-primary-foreground border border-primary-foreground/10 font-sans',
        className
      )}
    >
      {Icon ? <Icon className="w-3 h-3 mr-1" /> : null}
      {label}
    </Badge>
  );
};

export default ProjectTypeTag;
