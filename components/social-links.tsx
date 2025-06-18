"use client"

import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function SocialLinks() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/KrishP08", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/krishp08", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/krish_7233", label: "Instagram" },
    { icon: Mail, href: "mailto:7233kp@gmail.com", label: "Email" },
  ]

  return (
    <div className="flex items-center gap-1">
      {socialLinks.map((link, index) => {
        const Icon = link.icon
        return (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button variant="ghost" size="icon" asChild>
              <Link href={link.href} target="_blank" aria-label={link.label}>
                <Icon className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}
