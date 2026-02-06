import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { EventsSection } from "@/components/events-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EventsSection />
      <ContactSection />
    </main>
  );
}
