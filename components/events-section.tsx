"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import EventCard, { type EventItem } from "@/components/ui/event-card";
import FeaturedEvent from "@/components/ui/featured-event";
import { Calendar } from "lucide-react";

type EventItemSerialized = Omit<EventItem, "date"> & { date: string };

type EventsSectionProps = {
  events?: EventItemSerialized[];
};

const fallbackEvents: EventItem[] = [
  {
    id: 'react-native-workshop',
    title: "React Native Workshop",
    description:
      "Build your first mobile app from scratch. Learn navigation, state management, and deployment.",
    date: new Date(2026, 1, 15, 18, 0),
    location: "Keller Hall 3-210",
    attendees: 45,
    type: "codingWorkshop",
    featured: true,
  },
  {
    id: 'design-systems-deep-dive',
    title: "Design Systems Deep Dive",
    description:
      "Create consistent, scalable UI components. From tokens to documentation.",
    date: new Date(2026, 1, 22, 17, 30),
    location: "Blegen Hall 155",
    attendees: 32,
    type: "designWorkshop",
    featured: false,
  },
  {
    id: 'industry-panel--breaking-into-tech',
    title: "Industry Panel: Breaking into Tech",
    description:
      "Engineers from top companies share their journey and tips for landing your first role.",
    date: new Date(2026, 2, 1, 19, 0),
    location: "Coffman Union Theater",
    attendees: 120,
    type: "panel",
    featured: false,
  },
];

export function EventsSection({ events }: EventsSectionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const resolvedEvents =
    events && events.length > 0
      ? events.map((event) => ({
          ...event,
          date: new Date(event.date),
        }))
      : fallbackEvents;
  const featuredEvent =
    resolvedEvents.find((event) => event.featured) ?? resolvedEvents[0];
  const otherEvents = featuredEvent
    ? resolvedEvents.filter((event) => event.id !== featuredEvent.id)
    : [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background todo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        // style={{ x: backgroundX }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(198,235,247,0.4),transparent_50%)]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/10 mb-6"
          >
            <span className="font-mono text-sm text-primary">
              {"// upcoming events"}
            </span>
          </motion.div>

          <motion.h2
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-balance">
              Level up{" "}
              <span className="text-gradient-indigo">every week</span>
            </span>
          </motion.h2>

          <motion.p
            className="font-serif text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Workshops, panels, and hands-on sessions to help you grow as a
            builder.
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Event - Takes 2 columns */}
          {featuredEvent ? <FeaturedEvent event={featuredEvent} /> : null}

          {/* Other Events */}
          {otherEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View Calendar CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            as="a"
            href="https://z.umn.edu/adc-gopherlink-events"
            variant="outline"
            size="lg"
            className="font-sans font-semibold rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all bg-transparent"
          >
            View Full Calendar
            <Calendar className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
