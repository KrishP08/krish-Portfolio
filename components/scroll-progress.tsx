"use client"

import { motion, type MotionValue } from "framer-motion"

interface ScrollProgressProps {
  scrollYProgress: MotionValue<number>
}

export function ScrollProgress({ scrollYProgress }: ScrollProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
