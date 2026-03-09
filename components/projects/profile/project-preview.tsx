import type * as React from 'react';
import { urlFor } from '@/sanity/lib/image';
import type { ProjectProfile } from '@/lib/projects';
import { Android } from '@/components/ui/android';
import { Iphone } from '@/components/ui/iphone';
import { Safari } from '@/components/ui/safari';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/ui/terminal';

type ProjectPreviewProps = {
  project: ProjectProfile;
};

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  if (project.types.includes('web')) {
    if (project.demoVideo.web) {
      return (
        <Safari
          theme="dark"
          videoSrc={project.demoVideo.web}
          url={project.links.web ?? `${project.slug}.app`}
          className="w-full"
        />
      );
    }

    if (project.img) {
      return (
        <Safari
          theme="dark"
          imageSrc={urlFor(project.img)
            .auto('format')
            .fit('max')
            .width(1600)
            .url()}
          url={project.links.web ?? `${project.slug}.app`}
          className="w-full"
        />
      );
    }
  }

  if (project.types.includes('mobile')) {
    if (project.demoVideo.ios && project.demoVideo.android) {
      return (
        <>
          <Iphone theme="dark" videoSrc={project.demoVideo.ios} />
          <Android
            theme="dark"
            videoSrc={project.demoVideo.android}
            className="absolute top-5 left-30 -z-10 h-[100%] brightness-90"
          />
        </>
      );
    }

    if (project.demoVideo.ios) {
      return <Iphone theme="dark" videoSrc={project.demoVideo.ios} />;
    }

    if (project.demoVideo.android) {
      return <Android theme="dark" videoSrc={project.demoVideo.android} />;
    }

    if (project.img) {
      return (
        <Iphone
          theme="dark"
          src={urlFor(project.img).auto('format').fit('max').width(1200).url()}
        />
      );
    }
  }

  if (project.types.includes('cli')) {
    const lines = project.terminalExample.length
      ? project.terminalExample
      : ['$ adc --help', 'Command docs coming soon'];

    return (
      <Terminal className="max-w-full" sequence startOnView>
        {lines.map((line, index) =>
          line.startsWith('$') ? (
            <TypingAnimation key={`${line}-${index}`} className="text-sm">
              {line}
            </TypingAnimation>
          ) : (
            <AnimatedSpan
              key={`${line}-${index}`}
              className="text-muted-foreground"
            >
              {line}
            </AnimatedSpan>
          )
        )}
      </Terminal>
    );
  }

  return (
    <div className="rounded-3xl border border-white/25 bg-black/15 p-10 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
        Preview
      </p>
      <p className="mt-3 font-sans text-xl font-semibold text-white">
        {project.title}
      </p>
      <p className="mt-2 font-serif text-white/80">
        Project media preview coming soon.
      </p>
    </div>
  );
};

export default ProjectPreview;
