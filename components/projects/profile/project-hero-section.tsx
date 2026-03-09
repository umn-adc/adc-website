import type * as React from 'react';
import { ViewTransition } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  LucideIcon,
  PencilRuler,
  TerminalSquare,
} from 'lucide-react';
import { FaAndroid, FaApple } from 'react-icons/fa';
import OfficerHeroBackground from '@/components/officers/profile/officer-hero-background';
import DecryptedText from '@/components/ui/decrypted-text';
import ProjectTechTag from '@/components/ui/project-tech-tag';
import ProjectTypeTag from '@/components/ui/project-type-tag';
import ProjectMockupParallax from './project-mockup-parallax';
import ProjectPreview from './project-preview';
import type { ProjectLinkItem, ProjectSectionProps } from './types';
import { getProjectStageLabel } from './utils';

const heroLinkItems: ProjectLinkItem[] = [
  { key: 'web', label: 'Website', icon: Globe },
  { key: 'ios', label: 'iOS', icon: FaApple },
  { key: 'android', label: 'Android', icon: FaAndroid },
  { key: 'other', label: 'CLI', icon: TerminalSquare },
];

const stageIconMap: Record<
  ProjectSectionProps['project']['stage'],
  LucideIcon
> = {
  dev: PencilRuler,
  release: CheckCircle2,
  unsupported: AlertTriangle,
};

const ProjectHeroSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const heroLinks = heroLinkItems
    .map((item) => ({
      ...item,
      href: project.links[item.key],
    }))
    .filter((item): item is ProjectLinkItem & { href: string } =>
      Boolean(item.href)
    );

  const stageLabel = getProjectStageLabel(project.stage);
  const StageIcon = stageIconMap[project.stage];
  const hasWebPreview =
    project.types.includes('web') &&
    Boolean(project.demoVideo.web || project.img);
  const hasMobilePreview =
    project.types.includes('mobile') &&
    Boolean(project.demoVideo.ios || project.demoVideo.android || project.img);
  const hasCliPreview = project.types.includes('cli');
  const hasRenderablePreview =
    hasWebPreview || hasMobilePreview || hasCliPreview;
  const usesPhonePreview =
    project.types.includes('mobile') &&
    !project.types.includes('web') &&
    !project.types.includes('cli') &&
    hasMobilePreview;
  const previewContainerClass = usesPhonePreview
    ? 'w-80 h-80 mx-auto lg:-translate-y-10'
    : hasRenderablePreview
      ? 'w-full max-w-2xl mx-auto lg:max-w-none lg:w-[138%] xl:w-[150%] lg:translate-x-10 xl:translate-x-14 lg:translate-y-10 xl:translate-y-14'
      : 'w-full max-w-lg mx-auto lg:max-w-xl lg:translate-y-4';

  return (
    <section
      className={`relative z-10 overflow-y-visible overflow-x-clip bg-indigo text-white pt-28 md:pt-36 ${!project.types.includes('web') && project.types.includes('mobile') ? 'pb-50 md:pb-40' : ''} lg:pb-16`}
    >
      <OfficerHeroBackground />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          {project.logo ? (
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="mb-3 w-18 h-auto object-contain"
            />
          ) : null}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.types.map((type) => (
              <ProjectTypeTag key={`${project.id}-${type}`} type={type} />
            ))}
          </div>
          <DecryptedText
            speed={100}
            maxIterations={100}
            animateOn="view"
            sequential
            parentClassName="font-mono text-xs text-white/60 mb-3"
            text={project.id}
          />
          <ViewTransition name={`${project.id}--title`}>
            <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight">
              {project.title}
            </h1>
          </ViewTransition>
          <p className="mt-2 inline-flex items-center gap-1 font-sans text-sm md:text-base text-white/75">
            <StageIcon className="size-4 shrink-0" />
            <span>{stageLabel}</span>
          </p>

          {project.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <ProjectTechTag
                  key={`${project.id}-${tag}`}
                  tag={tag}
                  className="text-white bg-white/20 border-white/25"
                />
              ))}
            </div>
          ) : null}

          <p className="mt-6 font-serif text-lg text-white/85 max-w-2xl text-pretty">
            {project.shortDescription}
          </p>

          {heroLinks.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {heroLinks.map((link, index) => {
                const Icon = link.icon;
                const isPrimary = index === 0;
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isPrimary
                        ? 'group inline-flex items-center gap-2 rounded-full bg-white text-indigo px-5 py-2.5 text-sm font-semibold transition hover:bg-white/90'
                        : 'inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10'
                    }
                  >
                    <Icon className="size-4" />
                    {link.label}
                    <ArrowUpRight
                      className={
                        isPrimary
                          ? 'size-4 transition-transform duration-200 ease-out group-hover:translate-x-1'
                          : 'size-4'
                      }
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
              Public links and demos coming soon
            </p>
          )}
        </div>

        <div className={previewContainerClass}>
          {hasRenderablePreview ? (
            <ProjectMockupParallax>
              <ProjectPreview project={project} />
            </ProjectMockupParallax>
          ) : (
            <ProjectPreview project={project} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectHeroSection;
