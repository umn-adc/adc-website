import { useRef, ViewTransition } from 'react';
import { motion, useInView } from 'motion/react';
import { urlFor } from '@/sanity/lib/image';
import type { Project as SanityProject } from '@/sanity/types';
import { ArrowUpRight, LucidePencilRuler } from 'lucide-react';
import ProjectTypeTag, {
  type ProjectType,
} from '@/components/ui/project-type-tag';
import ProjectTechTag from '@/components/ui/project-tech-tag';
import Link from 'next/link';

type ProjectStage = 'release' | 'dev' | 'unsupported';
type ProjectTag = string;
type ProjectStats = { users: number; rating: number };
type ProjectImage = NonNullable<SanityProject['img']>;

type ProjectBase = {
  id: string | number;
  title: string;
  link?: string;
  description: string;
  tags: ProjectTag[];
  types: ProjectType[];
};

type ProjectLink = { href?: string; onClick?: VoidFunction };

type ProjectVisual =
  | { img: ProjectImage | string; color?: never }
  | { color: `from-${string} to-${string}` | string; img?: never };

type ProjectStageInfo = { stage: ProjectStage; stats?: ProjectStats };

export type Project = ProjectBase &
  ProjectLink &
  ProjectVisual &
  ProjectStageInfo;

type ProjectCardProps = { project: Project; index: number; isActive: boolean };

const MotionLink = motion.create(Link);

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isActive,
}) => {
  const { img, color = '' } = project;
  const types: ProjectType[] =
    project.types.length > 0 ? project.types : ['web'];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const backgroundImage = (() => {
    if (!img) return undefined;
    if (typeof img === 'string') {
      return img.startsWith('url(') || img.startsWith('linear-gradient(')
        ? img
        : `url(${img})`;
    }
    if (!img.asset?._ref) return undefined;
    return `url(${urlFor(img).auto('format').fit('max').width(1200).quality(80).url()})`;
  })();
  const headerStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(#0001, #0008), ${backgroundImage}`,
        backgroundSize: '100%, cover',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'center, center',
      }
    : undefined;

  return (
    <motion.div
      ref={ref}
      className={`relative h-full ${isActive ? 'z-10' : 'z-0'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="group relative h-full bg-card rounded-3xl border border-border overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Gradient Header */}
        <div
          className={`relative h-48 ${backgroundImage ? '' : `bg-linear-to-br ${color}`} p-6 flex flex-col justify-between overflow-hidden`}
          style={headerStyle}
        >
          {/* Project Type Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {types.map((type) => (
                <ProjectTypeTag
                  key={`${type}-${String(project.id)}`}
                  type={type}
                />
              ))}
            </div>
            <MotionLink
              href={`/projects/${project.id}`}
              onClick={project.onClick}
              className="shrink-0 w-10 h-10 rounded-full bg-primary-foreground/12 backdrop-blur-xs border border-primary-foreground/10 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View ${project.title} project`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </MotionLink>
          </div>

          {/* Project Title */}
          <div>
            <ViewTransition name={`${project.id}--title`}>
              <h3 className="font-sans text-2xl font-bold text-primary-foreground mb-1">
                {project.title}
              </h3>
            </ViewTransition>
            <div className="flex items-center gap-4 text-primary-foreground/80 text-sm font-serif">
              {project.stage === 'dev' ? (
                <div className="flex flex-row gap-1 items-center">
                  <LucidePencilRuler className="w-3 h-3" />
                  <span>in development</span>
                </div>
              ) : (
                <>
                  <span>{project.stats?.users ?? 0} users</span>
                  <span>★ {project.stats?.rating ?? 0}</span>
                </>
              )}
            </div>
          </div>

          {/* Decorative Star */}
          {!img && (
            <motion.div
              className="absolute top-4 right-16 opacity-20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              <img src="/adc-star-white.svg" alt="ADC star logo" />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="font-serif text-muted-foreground leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <ProjectTechTag key={`${tag}-${tagIndex}`} tag={tag} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
