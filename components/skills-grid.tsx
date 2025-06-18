"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Technology {
  name: string
  logo: string // Changed from icon to logo
  category: string
  level: number
}

interface SkillsGridProps {
  technologies: Technology[]
}

export function SkillsGrid({ technologies }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <Card className="border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-background rounded-lg border border-border/50 group-hover:border-border transition-all duration-300">
                    <img
                      src={tech.logo || "/placeholder.svg"}
                      alt={tech.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling.style.display = "block"
                      }}
                    />
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold hidden">
                      {tech.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-medium">{tech.name}</h3>
                </div>
                <span className="text-sm text-muted-foreground">{tech.level}%</span>
              </div>
              <Progress value={tech.level} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
