import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Clock,
  Code,
  Palette,
  Presentation,
  Users,
} from "lucide-react";
import Link from "next/link";

export type EventItem = {
  id: string;
  title: string;
  link?: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  type: EventType;
  featured?: boolean;
}

export const eventTypeData = {
  codingWorkshop: {label: "Workshop", icon: Code},
  designWorkshop: {label: "Workshop", icon: Palette},
  panel: {label: "Panel", icon: Presentation},
} as const;

export type EventType = keyof typeof eventTypeData;

type EventCardProps = {event: EventItem; index: number;}

const MotionLink = motion.create(Link);

const EventCard: React.FC<EventCardProps> = ({event, index}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const {icon: Icon, label} = eventTypeData[event.type];
  const eventDate = event.date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const eventTime = event.date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-card rounded-2xl border overflow-hidden"
      initial={{ opacity: 0, y: 30, borderColor: 'var(--border)' }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, borderColor: 'var(--primary)' }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Badge
            variant="outline"
            className="font-sans text-xs bg-muted/50 border-border"
          >
            <Icon className="w-3 h-3 mr-1" />
            {label}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="font-mono text-xs">{event.attendees}</span>
          </div>
        </div>

        {/* Content */}
        <h4 className="font-sans text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h4>
        <p className="font-serif text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-serif">{eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-serif">{eventTime}</span>
          </div>
        </div>

        {/* Hover Arrow */}
        {
          !!event.link && <MotionLink
            href={event.link}
            className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
          </MotionLink>
        }
      </div>
    </motion.div>
  );
}

export default EventCard;
