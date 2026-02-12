'use client';

import {
  type ComponentType,
  type RefCallback,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Globe, Rocket, Users, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import SectionChip from '@/components/ui/section-chip';
import LogoLoop from './ui/logo-loop';

import {
  FaAmazon,
  FaApple,
  FaGoogle,
  FaMeta,
  FaMicrosoft,
  FaTiktok,
} from 'react-icons/fa6';
import { SiNetflix, SiQualcomm, SiStripe, SiTesla } from 'react-icons/si';

const outcomeLogos = [
  { node: <FaAmazon />, href: 'https://www.amazon.jobs/' },
  { node: <FaMicrosoft />, href: 'https://careers.microsoft.com/v2/' },
  { node: <FaTiktok />, href: 'https://lifeattiktok.com/home' },
  { node: <FaApple />, href: 'https://www.apple.com/careers/us/' },
  { node: <FaMeta />, href: 'https://www.metacareers.com/' },
  {
    node: <FaGoogle />,
    href: 'https://www.google.com/about/careers/applications/',
  },
  { node: <SiNetflix />, href: 'https://jobs.netflix.com/' },
  { node: <SiTesla />, href: 'https://www.tesla.com/careers' },
  { node: <SiQualcomm />, href: 'https://careers.qualcomm.com/careers' },
  { node: <SiStripe />, href: 'https://stripe.com/jobs' },
];

type JourneyStep = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  proof: string;
};

const journeySteps: JourneyStep[] = [
  {
    icon: Users,
    title: 'Start coding on day one',
    description:
      "You don't join ADC to watch tutorials. You join a live product team, pick your track, and start contributing to software people are actively building together.",
    proof: 'Meet your team and code together',
  },
  {
    icon: Zap,
    title: 'Level up every week',
    description:
      'Workshops run throughout the term to cover exactly what members need, from unblocking hard problems to leveling up technical skills in their track.',
    proof: 'Learn high-demand skills in the industry',
  },
  {
    icon: Globe,
    title: 'Deploy to the world',
    description:
      "It doesn't end when your product is complete—you learn how to publish and host apps and services, then manage and keep improving the live production codebase.",
    proof: 'Push to production and maintain real software',
  },
  {
    icon: Rocket,
    title: 'Launch your career or startup',
    description:
      'Attend tech interview prep sessions to smoothly translate your ADC experience into momentum for internships, full-time roles, or your own startup.',
    proof: 'Land that internship, full-time role, or funding',
  },
];

const STEP_ACTIVATION_EPSILON = 0.015;

function JourneyStepRow({
  step,
  index,
  isActive,
  iconRef,
}: {
  step: JourneyStep;
  index: number;
  isActive: boolean;
  iconRef: RefCallback<HTMLDivElement>;
}) {
  const Icon = step.icon;

  return (
    <motion.li
      className="relative pl-16 md:pl-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <motion.div
        ref={iconRef}
        className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white shadow-sm md:h-12 md:w-12"
        animate={isActive ? { scale: 1, rotate: [0, -8, 0] } : { scale: 0.95 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Icon
          className={`h-5 w-5 ${
            isActive ? 'text-primary' : 'text-muted-foreground'
          }`}
        />
      </motion.div>

      <motion.div
        animate={isActive ? { opacity: 1 } : { opacity: 0.75 }}
        transition={{ duration: 0.25 }}
      >
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
            isActive ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          Step {index + 1}
        </p>
        <h3
          className={`mt-2 font-sans text-2xl font-semibold leading-tight md:text-3xl ${
            isActive ? 'text-foreground' : 'text-foreground/75'
          }`}
        >
          {step.title}
        </h3>
        <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground md:text-lg">
          {step.description}
        </p>
        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-sans text-xs ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <ArrowRight className="h-3.5 w-3.5" />
          <span>{step.proof}</span>
        </div>
      </motion.div>
    </motion.li>
  );
}

export function AboutSection() {
  const containerRef = useRef(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const measureRafRef = useRef<number | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [railStart, setRailStart] = useState(20);
  const [railHeight, setRailHeight] = useState(0);
  const [stepThresholds, setStepThresholds] = useState<number[]>(
    journeySteps.map((_, i) => i / Math.max(journeySteps.length - 1, 1))
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ['start 80%', 'end 50%'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const smoothJourneyProgress = useSpring(journeyProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.2,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setIsInView(latest > 0.02);
  });

  useMotionValueEvent(journeyProgress, 'change', (latest) => {
    const nextProgress = Math.min(1, Math.max(0, latest));
    setLineProgress(nextProgress > 0.995 ? 1 : nextProgress);
  });

  const measureRail = useCallback(() => {
    const container = journeyRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const iconCenters = iconRefs.current
      .map((iconEl) => {
        if (!iconEl) return null;
        const rect = iconEl.getBoundingClientRect();
        return rect.top - containerRect.top + rect.height / 2;
      })
      .filter((center): center is number => center !== null);

    if (iconCenters.length !== journeySteps.length) return;

    const start = iconCenters[0];
    const end = iconCenters[iconCenters.length - 1];
    const height = Math.max(1, end - start);

    setRailStart(start);
    setRailHeight(height);
    setStepThresholds(iconCenters.map((center) => (center - start) / height));
  }, []);

  const scheduleRailMeasure = useCallback(() => {
    if (measureRafRef.current !== null) {
      cancelAnimationFrame(measureRafRef.current);
    }
    measureRafRef.current = requestAnimationFrame(() => {
      measureRail();
    });
  }, [measureRail]);

  const setIconRef = useCallback(
    (index: number): RefCallback<HTMLDivElement> =>
      (node) => {
        iconRefs.current[index] = node;
        scheduleRailMeasure();
      },
    [scheduleRailMeasure]
  );

  useLayoutEffect(() => {
    scheduleRailMeasure();
  }, [scheduleRailMeasure]);

  useEffect(() => {
    const container = journeyRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      scheduleRailMeasure();
    });

    observer.observe(container);
    iconRefs.current.forEach((iconEl) => {
      if (iconEl) observer.observe(iconEl);
    });
    window.addEventListener('resize', scheduleRailMeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', scheduleRailMeasure);
      if (measureRafRef.current !== null) {
        cancelAnimationFrame(measureRafRef.current);
      }
    };
  }, [scheduleRailMeasure]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden z-10 bg-white"
    >
      {/* Background Pattern todo */}
      {/* <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(87,54,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(198,235,247,0.3),transparent_50%)]" />
      </motion.div> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <SectionChip label="about us" className="mb-6" />

          <ScrollReveal
            enableBlur={false}
            containerClassName="my-0 mb-6"
            textClassName="font-sans text-5xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance leading-tight"
          >
            <span>
              Where students become{' '}
              <span className="text-gradient-indigo">confident builders</span>
            </span>
          </ScrollReveal>

          <motion.p
            className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Born from the need for practical, real-world building experience,
            ADC was created around a simple mission: to help students learn by
            shipping. We believe the fastest way to grow as an engineer or
            designer is to build in teams, use modern tools, and work on
            projects that matter.
          </motion.p>
        </div>
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            member outcomes
          </p>
          <LogoLoop
            scrollVelocity
            scrollVelocityStiffness={600}
            logos={outcomeLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#fdfefe"
            ariaLabel="Student Outcomes"
          />
        </div>
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Your ADC Journey
        </p>
        <div ref={journeyRef} className="relative mx-auto max-w-3xl">
          <div
            className="pointer-events-none absolute left-5 w-px bg-border/80 md:left-6"
            style={{ top: railStart, height: railHeight }}
          />
          <motion.div
            className="pointer-events-none absolute left-5 w-px origin-top bg-indigo md:left-6"
            style={{
              top: railStart,
              height: railHeight,
              scaleY: smoothJourneyProgress,
            }}
          />
          <ol className="space-y-10 md:space-y-12">
            {journeySteps.map((step, index) => (
              <JourneyStepRow
                key={step.title}
                step={step}
                index={index}
                isActive={
                  lineProgress + STEP_ACTIVATION_EPSILON >=
                  stepThresholds[index]
                }
                iconRef={setIconRef(index)}
              />
            ))}
          </ol>
        </div>

        {/* Bottom Statement */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 p-6 md:p-8 rounded-3xl bg-navy text-primary-foreground">
            <div className="text-center md:text-left">
              <p className="font-sans text-lg md:text-xl font-semibold mb-1">
                Our Promise
              </p>
              <p className="font-serif text-primary-foreground/80 text-sm md:text-base max-w-xl">
                Empower members to grow fast, collaborate well, and ship
                polished, meaningful software with confidence.
              </p>
            </div>
            <motion.div
              className="shrink-0"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              <img
                src="/adc-star-white.svg"
                alt="ADC star logo"
                className="w-24 h-24 opacity-100 contrast-0"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
