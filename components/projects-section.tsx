"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProjectCard from "./ui/project-card";
import type { Project } from '@/components/ui/project-card';

const projects: Project[] = [
  {
    id: 'gt',
    title: "GopherTunnels",
    stage: 'release',
    type: 'mobile',
    href: "https://apps.apple.com/us/app/gophertunnels/id6754943228",
    description:
      "A mobile app helping UMN students navigate the GopherWay with smart paths and real-time directions.",
    tags: ["TypeScript", "React Native", "Express"],
    color: "from-primary to-indigo-deep",
    stats: { users: 100, rating: 5 },
  },
  {
    id: 'gf',
    title: "GopherFit",
    stage: 'dev',
    type: 'mobile',
    description:
      "A fitness and nutrition mobile app tailored to UMN resources, like the RecWell and GopherAthletics.",
    tags: ["TypeScript", "Go", "React Native"],
    color: "from-navy to-caption",
  },
];

export function ProjectsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(87,54,255,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(30,61,89,0.05),transparent_40%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/10 mb-6"
            >
              <span className="font-mono text-sm text-primary">
                {"// featured projects"}
              </span>
            </motion.div>

            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-balance">
                Apps that{" "}
                <span className="text-gradient-indigo">make an impact</span>
              </span>
            </motion.h2>

            <motion.p
              className="font-serif text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Real projects built by real teams, serving the campus community
              and beyond.
            </motion.p>
          </div>

          {/* Navigation Arrows */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-transparent"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-transparent"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Projects Carousel */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4 snap-x snap-mandatory box-border"
        >
          <div className="flex gap-6 overflow-visible py-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isActive={activeIndex === index}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="font-sans font-semibold rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all bg-transparent"
          >
            View All Projects
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
