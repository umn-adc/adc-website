import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ProjectTechTagProps = {
  tag: string;
  className?: string;
};

const ProjectTechTag: React.FC<ProjectTechTagProps> = ({ tag, className }) => {
  return (
    <Badge
      variant="outline"
      className={cn('font-mono text-xs bg-muted/50', className)}
    >
      {tag}
    </Badge>
  );
};

export default ProjectTechTag;
