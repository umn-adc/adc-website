"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Lectern, Users } from "lucide-react";
import { AnimatedStar } from "@/components/ui/animated-star";
import CountUp from "./ui/count-up";

// Floating code snippets for background
const codeSnippets = [
  { code: "git commit -m 'adc!'", x: "8%", y: "18%", delay: 0 },
  { code: "<ADC />", x: "82%", y: "12%", delay: 0.3 },
  { code: "bun ship", x: "12%", y: "72%", delay: 0.5 },
  { code: "const learn = () => build()", x: "70%", y: "68%", delay: 0.7 },
  { code: "export default App", x: "5%", y: "42%", delay: 0.9 },
  { code: "import { team } from 'adc'", x: "78%", y: "38%", delay: 1.1 },
  { code: "await deploy()", x: "18%", y: "55%", delay: 1.3 },
  { code: "console.log('shipped!')", x: "65%", y: "25%", delay: 1.5 },
  { code: "bun create adc-app", x: "88%", y: "55%", delay: 1.7 },
  { code: "git push origin main", x: "3%", y: "85%", delay: 1.9 },
  { code: "useADC()", x: "75%", y: "82%", delay: 2.1 },
  { code: "const ship = () => {...}", x: "25%", y: "30%", delay: 2.3 },
];

// Large animated star logo for hero
function HeroStar() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);

  return (
    <motion.div
      ref={ref}
      id="hero"
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ scale, opacity }}
    >
      <motion.img
        src="/adc-star-white.svg"
        alt="ADC star logo"
        className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  );
}

// Floating orbs for depth
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl"
        style={{ left: "-10%", top: "20%" }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-indigo-deep/30 blur-3xl"
        style={{ right: "-5%", top: "40%" }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-white/5 blur-3xl"
        style={{ left: "30%", bottom: "10%" }}
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-indigo"
    >
      {/* Background Elements */}
      <HeroStar />
      <FloatingOrbs />

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet) => (
          <motion.div
            key={snippet.code}
            className="absolute font-mono text-xs md:text-sm text-white/20"
            style={{ left: snippet.x, top: snippet.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.7, 0.7, 0],
                    y: [20, 0, 0, -20],
                  }
                : {}
            }
            transition={{
              duration: 8,
              delay: snippet.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          >
            {snippet.code}
          </motion.div>
        ))}
      </div>

      {/* Sparkles scattered around */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <AnimatedStar delay={i * 0.5} size={3 + (i % 3)} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity: textOpacity }}
      >
        {/* Announcement Badge */}
        {/* I'm thinking we can toggle this from the CDN with announcements */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="font-sans text-sm font-medium text-white">
            Announcement hereeeee
          </span>
        </motion.div> */}

        {/* Main Headline */}
        <motion.h1
          className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block text-balance">Build it right</span>
          <motion.span
            className="block text-white/90"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            from day one
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-serif text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Learn modern development and product skills through hands-on
          workshops, mentorship, and real projects built in teams.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            as="a"
            href="https://z.umn.edu/adc-discord"
            target="_blank"
            size="lg"
            className="bg-white hover:bg-white/90 text-indigo font-sans font-semibold rounded-full px-8 py-6 text-lg group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            as="a"
            href="/officers"
            // onClick={() => router.push('/officers')}
            variant="outline"
            size="lg"
            className="font-sans font-semibold rounded-full px-8 py-6 text-lg border-2 border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            Meet the team
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { icon: Users, value: 100, label: "Members" },
            { icon: Code2, value: 25, label: "Projects" },
            { icon: Lectern, value: 50, label: "Workshops" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            >
              <stat.icon className="w-5 h-5 text-white/80 mx-auto mb-2" />
              <div className="font-sans text-2xl md:text-3xl font-bold text-white">
                <CountUp to={stat.value} delay={1}/>+
              </div>
              <div className="font-serif text-sm text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
