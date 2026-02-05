"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ADCLogo } from "./ui/adc-logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Magnet from "@/components/ui/Magnet";
import Link from "next/link";
import { useLenis } from "lenis/react";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#events", label: "Events" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const lenis = useLenis();
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only switch to white bg when scrolled past the hero section (90% of viewport height)
      const heroHeight = window.innerHeight * 0.9;
      setIsPastHero(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When at top (not past hero), we're on the indigo hero - use white text
  // When past hero, we're on white background - use dark text
  const textColor = isPastHero ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white";
  const iconColor = isPastHero ? "text-foreground" : "text-white";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isPastHero
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0" onClick={() => {lenis?.scrollTo(0)}}>
              <ADCLogo animate={false} variant={isPastHero ? "full" : "light"} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Magnet key={link.href}>
                  <motion.a
                    href={link.href}
                    className={`font-sans text-sm font-medium transition-colors relative group ${textColor}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isPastHero ? "bg-primary" : "bg-white"}`} />
                  </motion.a>
                </Magnet>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button className={`font-sans font-medium rounded-full px-6 cursor-pointer ${isPastHero ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-white hover:bg-white/90 text-indigo"}`}>
                  Join Us
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`md:hidden p-2 cursor-pointer ${iconColor}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" color="black"/>
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              className="relative flex flex-col items-center justify-center h-full gap-8 pt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-2xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium rounded-full px-8 py-6 text-lg cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Us
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
