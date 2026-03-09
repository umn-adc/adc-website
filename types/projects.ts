type ProjectTag = string;

type ProjectType = 'mobile' | 'web' | 'cli';
type ProjectStage = 'release' | 'dev' | 'unsupported';

type ProjectLeadership = {
  title: string;
  officerId: string;
};

type ProjectLinks = {
  web?: string;
  ios?: string;
  android?: string;
  other?: string;
};

type ProjectDemoVideo = {
  web?: string;
  ios?: string;
  android?: string;
  cli?: string;
};

export type Project = {
  id: string | number | symbol;
  title: string;
  logo?: string;
  blurb: string;
  longDescription: string;
  href?: string;
  onClick?: () => void;
  description?: string;
  tags: ProjectTag[];
  types: ProjectType[];
  stage: ProjectStage;
  leadership?: ProjectLeadership[];
  techStack?: string[];
  links?: ProjectLinks;
  startDate?: string;
  releaseDate?: string;
  deprecationDate?: string;
  demoVideo?: ProjectDemoVideo;
  terminalExample?: string[];
  color: `from-${string} to-${string}` | string;
  stats?: { users: number, rating: number };
}
