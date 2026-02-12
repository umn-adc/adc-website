"use client";

import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";
import DecryptedText from "./decrypted-text";
import { useRef } from "react";

interface SectionChipProps {
  label: string;
  className?: string;
  prefix?: string;
  variant?: "light" | "dark";
}

export default function SectionChip({
  label,
  className,
  prefix = "// ",
  variant = "light",
}: SectionChipProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        variant === "light" && "bg-secondary border border-primary/10",
        variant === "dark" && "bg-primary/30 border border-primary/50",
        className,
      )}
    >
      {isInView && (
        <DecryptedText
          animateOn="view"
          sequential
          parentClassName={cn(
            "font-mono text-sm",
            variant === "light" && "text-primary",
            variant === "dark" && "text-secondary",
          )}
          text={`${prefix}${label}`}
        />
      )}
    </motion.div>
  );
}
