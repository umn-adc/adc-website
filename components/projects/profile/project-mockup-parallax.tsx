'use client';

import type * as React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

type ProjectMockupParallaxProps = {
  children: React.ReactNode;
};

const ProjectMockupParallax: React.FC<ProjectMockupParallaxProps> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y = useSpring(rawY, {
    damping: 24,
    stiffness: 170,
    mass: 0.25,
  });

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default ProjectMockupParallax;
