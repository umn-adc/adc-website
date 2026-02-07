import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import { eventTypeData, type EventItem } from "@/components/ui/event-card";

type FeaturedEventProps = {event: EventItem;}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({event}) => {
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

  useEffect(() => {
    console.log('event:', event)
  });

  return (
    <motion.div
      ref={ref}
      className="relative col-span-full lg:col-span-2 rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="relative gradient-indigo p-8 md:p-10 min-h-[400px] flex flex-col justify-between">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 opacity-10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <img src="/adc-star-white.svg" alt="ADC star logo" />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-white/20 text-white border-0 font-sans">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              Next Event
            </Badge>
            <Badge className="bg-white/20 text-white border-0 font-sans">
              <Icon className="w-3 h-3 mr-1" />
              {label}
            </Badge>
          </div>

          <h3 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
            {event.title}
          </h3>
          <p className="font-serif text-white/80 text-lg max-w-xl leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="relative">
          {/* Event Details */}
          <div className="flex flex-wrap gap-6 mb-6 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-serif text-sm">{eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-serif text-sm">{eventTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-serif text-sm">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-serif text-sm">
                {event.attendees} attending
              </span>
            </div>
          </div>

          {/* CTA */}
          {
            !!event.link && <Button
              as="a"
              href={event.link}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-sans font-semibold rounded-full px-8 group"
            >
              Register Now
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          }
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturedEvent;
