"use client";

import { motion } from "motion/react";

interface ADCLogoProps {
  className?: string;
  variant?: "icon" | "wordmark" | "full" | "light";
  animate?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ADCLogo({
  className = "",
  variant = "full",
  animate = true,
  size = "md",
}: ADCLogoProps) {
  // Size configurations
  const sizeConfig = {
    sm: { star: 32, wordmarkHeight: 24 },
    md: { star: 40, wordmarkHeight: 32 },
    lg: { star: 56, wordmarkHeight: 44 },
  };
  
  const { star: starSize, wordmarkHeight } = sizeConfig[size];
  const wordmarkWidth = Math.round(wordmarkHeight * 3.37); // Aspect ratio from SVG (749/222)

  // Use white assets for light variant (on indigo bg), indigo assets otherwise
  const isLight = variant === "light";
  const wordmarkSrc = isLight ? "/adc-wordmark-white.svg" : "/adc-wordmark-indigo.svg";

  if (variant === "icon") {
    return (
      <motion.div
        className={className}
        initial={animate ? { opacity: 0, scale: 0.8 } : false}
        animate={animate ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src="/adc-star-indigo.svg"
          alt="ADC Star"
          width={starSize}
          height={starSize}
        />
      </motion.div>
    );
  }

  if (variant === "wordmark") {
    return (
      <motion.div
        className={className}
        initial={animate ? { opacity: 0, x: -10 } : false}
        animate={animate ? { opacity: 1, x: 0 } : false}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src="/adc-wordmark-indigo.svg"
          alt="ADC - App Developers Club"
          width={wordmarkWidth}
          height={wordmarkHeight}
        />
      </motion.div>
    );
  }

  // Light variant for indigo background or full variant for white background
  return (
    <motion.div
      className={`flex items-center ${className}`}
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : false}
      transition={{ duration: 0.4 }}
    >
      <img
        src={wordmarkSrc}
        alt="ADC wordmark"
        width={wordmarkWidth}
        height={wordmarkHeight}
      />
    </motion.div>
  );
}
