"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const offset = 40;

function variants(dir: Direction, reduce: boolean): Variants {
  if (reduce) {
    return { hidden: { opacity: 0 }, show: { opacity: 1 } };
  }
  const map: Record<Direction, Record<string, number>> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    scale: { scale: 0.92 },
    none: {},
  };
  return {
    hidden: { opacity: 0, ...map[dir] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/** Blendet Inhalt beim Hereinscrollen ein. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants(direction, reduce)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Container, der Kinder gestaffelt einblendet (Stagger). */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
