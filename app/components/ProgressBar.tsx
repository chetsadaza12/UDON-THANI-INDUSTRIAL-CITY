"use client";

import { useScroll, motion } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[9999]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
