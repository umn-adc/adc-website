import {HeroSection} from "@/components/hero-section";
import {AboutSection} from "@/components/about-section";
import {ProjectsSection} from "@/components/projects-section";
import {EventsSection} from "@/components/events-section";
import {ContactSection} from "@/components/contact-section";
import {sanityFetch} from "@/sanity/lib/live";
import {EVENTS_QUERY, PROJECTS_QUERY} from "@/sanity/lib/queries";
import type {Event as SanityEvent, Project as SanityProject} from "@/sanity/types";
import type {EventType} from "@/components/ui/event-card";
import type {Project} from "@/components/ui/project-card";

type EventItemSerialized = {
  id: string;
  title: string;
  description: string;
  link?: string;
  date: string;
  location: string;
  attendees: number;
  type: EventType;
  featured?: boolean;
};

const normalizeEventType = (value?: string): EventType => {
  if (value === "codingWorkshop" || value === "designWorkshop" || value === "panel") {
    return value;
  }
  if (value === "codingWorkshop") {
    return "codingWorkshop";
  }
  return "panel";
};

const mapEvent = (event: SanityEvent, index: number): EventItemSerialized => ({
  id: event.id ?? `${index + 1}`,
  title: event.title ?? "Untitled event",
  link: event.link ?? '',
  description: event.description ?? "",
  date: event.date ?? new Date().toISOString(),
  location: event.location ?? "TBA",
  attendees: event.attendees ?? 0,
  type: normalizeEventType(event.type),
  featured: event.featured ?? false,
});

const mapProject = (project: SanityProject, index: number): Project => {
  const stage = project.stage ?? "dev";
  const stats =
    stage === "dev"
      ? undefined
      : {
          users: project.stats?.users ?? 0,
          rating: project.stats?.rating ?? 0,
        };
  return {
    id: project.id ?? project._id ?? index,
    title: project.title ?? "Untitled project",
    description: project.description ?? "",
    tags: project.tags ?? [],
    type: (project.type ?? "web") as Project["type"],
    stage,
    ...(project.href ? {href: project.href} : {}),
    ...(project.img ? {img: project.img} : {color: project.color ?? "from-primary to-indigo-deep"}),
    ...(stats ? {stats} : {}),
  };
};

export default async function Home() {
  const [{data: eventsData}, {data: projectsData}] = await Promise.all([
    sanityFetch({query: EVENTS_QUERY}),
    sanityFetch({query: PROJECTS_QUERY}),
  ]);
  const events = Array.isArray(eventsData)
    ? (eventsData as SanityEvent[]).map(mapEvent)
    : [];
  const projects = Array.isArray(projectsData)
    ? (projectsData as SanityProject[]).map(mapProject)
    : [];

  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <EventsSection events={events} />
      <ContactSection />
    </main>
  );
}
