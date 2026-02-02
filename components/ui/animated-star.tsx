"use client";

import { motion } from "motion/react";

interface AnimatedStarProps {
  delay?: number;
  size?: number;
  variant?: "white" | "indigo";
}

export function AnimatedStar({ delay = 0, size = 4, variant = "white" }: AnimatedStarProps) {
  const src = variant === "white" ? "/adc-star-white.svg" : "/adc-star-indigo.svg";
  
  return (
    <motion.div
      className="absolute"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
      }}
    >
      <img
        src={src}
        alt="ADC star logo"
        width={size * 8}
        height={size * 8}
        className="object-contain"
      />
    </motion.div>
  );
}
