"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Lightbulb, Rocket, Users2, Zap } from "lucide-react";
import ValueCard from "@/components/ui/value-card";

const values = [
  {
    icon: Lightbulb,
    title: "Learn by Shipping",
    description:
      "The fastest way to grow as an engineer or designer is to build in teams, use modern tools, and work on projects that matter.",
    color: "bg-baby-blue",
  },
  {
    icon: Users2,
    title: "Build Together",
    description:
      "Whether you're stuck on setup, architecture, or polish, ADC gives you teammates, mentorship, and structure so you can stay in the fun part: building.",
    color: "bg-sky-blue",
  },
  {
    icon: Rocket,
    title: "Ship with Impact",
    description:
      "We help you debug faster, design better, and keep moving—together. Turn ideas into working apps and students into confident builders.",
    color: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Keep Creating",
    description:
      "A broken build, a messy UI, or a tricky edge case shouldn't derail your project. We'll handle the hard parts so you can focus on what matters.",
    color: "bg-secondary",
  },
];

export function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Pattern todo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        // style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(87,54,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(198,235,247,0.3),transparent_50%)]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/10 mb-6"
          >
            <span className="font-mono text-sm text-primary">
              {"// about us"}
            </span>
          </motion.div>

          <motion.h2
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-balance">
              Where students become{" "}
              <span className="text-gradient-indigo">confident builders</span>
            </span>
          </motion.h2>

          <motion.p
            className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Born from the need for practical, real-world building experience,
            ADC was created around a simple mission: to help students learn by
            shipping. We believe the fastest way to grow as an engineer or
            designer is to build in teams, use modern tools, and work on
            projects that matter.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
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
              className="flex-shrink-0"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
             <img src="/adc-star-white.svg" alt="ADC star logo" className="w-24 h-24 opacity-100 contrast-0" /> 
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
