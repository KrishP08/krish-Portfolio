"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Project {
  title: string
  description: string
  tech: string[]
  status: string
  github: string
  demo: string
  image: string
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 z-20">
            <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="default" size="sm" asChild>
                <Link href={project.demo} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={project.github} target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
