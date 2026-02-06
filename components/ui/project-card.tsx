import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Smartphone,
  Globe,
  LucidePencilRuler,
} from "lucide-react";

const projectTypeData = {
  mobile: {label: "Mobile app", icon: Smartphone},
  web: {label: "Web app", icon: Globe},
} as const;

type ProjectStage = 'release' | 'dev' | 'unsupported';
type ProjectTag = string;
type ProjectType = keyof typeof projectTypeData;
type ProjectStats = { users: number; rating: number };

type ProjectBase = {
  id: string | number | symbol;
  title: string;
  link?: string;
  description: string;
  tags: ProjectTag[];
  type: ProjectType;
};

type ProjectLink =
  | { href: string; onClick?: never }
  | { onClick?: VoidFunction; href?: never };

type ProjectVisual =
  | { img: string; color?: never }
  | { color: `from-${string} to-${string}` | string; img?: never };

type ProjectStageInfo =
  | { stage: "dev"; stats?: never }
  | { stage: Exclude<ProjectStage, "dev">; stats: ProjectStats };

export type Project = ProjectBase & ProjectLink & ProjectVisual & ProjectStageInfo;

type ProjectCardProps = {project: Project; index: number; isActive: boolean}

const ProjectCard: React.FC<ProjectCardProps> = ({project, index, isActive}) => {
  const {
    id,
    title,
    description,
    tags,
    type,
    href,
    onClick = null,
    img,
    color = "",
    stage,
  } = project;
  const {icon: Icon, label} = projectTypeData[type];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${isActive ? "z-10" : "z-0"}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="group relative h-full bg-card rounded-3xl border border-border overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Gradient Header */}
        <div
          className={`relative h-48 bg-linear-to-br ${project.color} p-6 flex flex-col justify-between overflow-hidden`}
          style={{backgroundImage: project.img}}
        >
          {/* Project Type Badge */}
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-0 font-sans"
            >
              {Icon ? <Icon className="w-3 h-3 mr-1" /> : null}
              {label}
            </Badge>
            <motion.a
              href={project.href}
              onClick={project.onClick}
              className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View ${project.title} project`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Project Title */}
          <div>
            <h3 className="font-sans text-2xl font-bold text-primary-foreground mb-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-4 text-primary-foreground/80 text-sm font-serif">
              {project.stage === 'dev' ? <div className="flex flex-row gap-1 items-center"><LucidePencilRuler className="w-3 h-3"/><span>in development</span></div> : <><span>{project.stats.users} users</span>
              <span>★ {project.stats.rating}</span></>}
            </div>
          </div>

          {/* Decorative Star */}
          {!project.img && <motion.div
            className="absolute top-4 right-16 opacity-20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <img src="/adc-star-white.svg"/>
          </motion.div>}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="font-serif text-muted-foreground leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-mono text-xs bg-muted/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
