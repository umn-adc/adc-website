type ProjectTag = string;

type ProjectType = string;

export type Project = {
  id: string | number | symbol;
  title: string;
  href?: string;
  onClick?: () => void;
  description: string;
  tags: ProjectTag[];
  type: ProjectType;
  color: `from-${string} to-${string}` | string;
  stats?: { users: number, rating: number };
}