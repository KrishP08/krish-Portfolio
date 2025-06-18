"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  stat: {
    label: string
    value: string
    icon: LucideIcon
  }
  index: number
}

export function StatsCard({ stat, index }: StatCardProps) {
  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
