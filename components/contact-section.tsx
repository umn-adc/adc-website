"use client";

import React from "react"

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MessageSquare,
  Send,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2,
} from "lucide-react";
import { ContactLinkCard } from "@/components/ui/contact-link-card";

const socialLinks = [
  { icon: Github, href: "https://github.com/umn-adc", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/app-developers-club", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/adc_umn/", label: "Instagram" },
];

const contactLinks = [
  {
    icon: Mail,
    label: "Email us at",
    value: "appdevel@umn.edu",
    href: "mailto:appdevel@umn.edu",
  },
  {
    icon: MessageSquare,
    label: "Join our Discord",
    value: "discord.gg/XCqJEbv",
    href: "https://discord.gg/XCqJEbv",
  },
];

export function ContactSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-navy overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(87,54,255,0.2),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(198,235,247,0.1),transparent_40%)]" />

        {/* Animated Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
           <img src="/adc-star-white.svg" className="w-6 h-6"/> 
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
            >
              <span className="font-mono text-sm text-primary">
                {"// get in touch"}
              </span>
            </motion.div>

            <motion.h2
              className="font-sans text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-balance">
                Ready to start{" "}
                <span className="text-primary">building?</span>
              </span>
            </motion.h2>

            <motion.p
              className="font-serif text-lg text-primary-foreground/70 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Whether you have a question, want to join a project, or just want
              to say hi—we would love to hear from you. Drop us a message and we will
              get back to you soon.
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div
              className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {contactLinks.map((link) => (
                <ContactLinkCard
                  key={link.href}
                  icon={link.icon}
                  label={link.label}
                  value={link.value}
                  href={link.href}
                />
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="font-sans text-sm text-primary-foreground/60 mb-4">
                Connect with us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-background rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-sans text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="rounded-xl font-serif h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-sans text-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@umn.edu"
                      className="rounded-xl font-serif h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="font-sans text-foreground"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="rounded-xl font-serif h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="font-sans text-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    className="rounded-xl font-serif min-h-[150px] resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold rounded-full h-12 group"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="mr-2 w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
