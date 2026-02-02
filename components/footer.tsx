"use client";

import { motion } from "motion/react";
import { ADCLogo } from "./ui/adc-logo";

const footerLinks = {
  club: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Workshops", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Brand Kit", href: "https://z.umn.edu/adc-brand-guidelines" },
    { label: "GitHub Org", href: "https://github.com/umn-adc" },
  ],
  legal: [
    { label: "Constitution", href: "https://z.umn.edu/adc-constitution" },
    { label: "Officer Responsibilities", href: "https://z.umn.edu/adc-officer-responsibilities" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <ADCLogo animate={false} size="lg" />
            <p className="font-serif text-sm text-muted-foreground mt-4 leading-relaxed">
              UMN App Developers Club — helping students learn by shipping since
              2023.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans font-semibold text-foreground mb-4">
              Club
            </h4>
            <ul className="space-y-3">
              {footerLinks.club.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} UMN ADC. All Rights Reserved.
          </p>

          {/* Decorative Star */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
           <img src="/adc-star-indigo.svg" className="w-6 h-6" /> 
          </motion.div>

          <a
            href="#"
            className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
