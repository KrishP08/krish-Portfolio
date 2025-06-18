"use client"

import { motion } from "framer-motion"

export function HeroText() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hi 👋, I'm{" "}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          Krish Patel
        </motion.span>
      </motion.h1>
    </div>
  )
}
