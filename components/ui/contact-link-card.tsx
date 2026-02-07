"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ContactLinkCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  className?: string;
};

export function ContactLinkCard({
  icon: Icon,
  label,
  value,
  href,
  className,
}: ContactLinkCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn(
        "group flex items-center gap-4 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 transition-colors hover:border-primary/40 hover:bg-primary-foreground/10",
        "hover:shadow-[0_18px_40px_-26px_rgba(87,54,255,0.55)]",
        className,
      )}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      aria-label={`${label} ${value}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/30 transition-colors group-hover:bg-primary/40">
        <Icon className="h-5 w-5 text-secondary transition-colors group-hover:text-secondary" />
      </div>
      <div>
        <p className="font-sans text-sm text-primary-foreground/60">{label}</p>
        <p className="font-sans font-medium text-primary-foreground">{value}</p>
      </div>
    </motion.a>
  );
}
