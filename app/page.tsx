"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Star,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Code,
  Briefcase,
  MessageSquare,
  FileText,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { ParticlesContainer } from "@/components/particles-container"
import { HeroText } from "@/components/hero-text"
import { ProjectCard } from "@/components/project-card"
import { SkillsGrid } from "@/components/skills-grid"
import { ContactForm } from "@/components/contact-form"
import { StatsCard } from "@/components/stats-card"
import { NavMenu } from "@/components/nav-menu"
import { ScrollProgress } from "@/components/scroll-progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { SocialLinks } from "@/components/social-links"
import { Footer } from "@/components/footer"

const technologies = [
  // Frontend Technologies
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Frontend",
    level: 95, // Very strong - fundamental web technology
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Frontend",
    level: 90, // Strong styling skills
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
    level: 88, // Core programming language
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Frontend",
    level: 85, // Advanced JS with types
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
    level: 82, // Main framework you're working with
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
    level: 78, // React framework you're learning
  },

  // Backend Technologies
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
    level: 75, // JavaScript runtime
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Backend",
    level: 70, // Server-side scripting
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Backend",
    level: 65, // General purpose programming
  },

  // Database Technologies
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Database",
    level: 80, // Relational database
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database",
    level: 65, // NoSQL database
  },

  // Mobile Development
  {
    name: "Android",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    category: "Mobile",
    level: 68, // Android app development
  },

  // Hardware/IoT
  {
    name: "Arduino",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    category: "Hardware",
    level: 60, // Microcontroller programming
  },

  // Design Tools
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "Design",
    level: 75, // UI/UX design tool
  },

  // Development Tools
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
    level: 85, // Version control
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "Tools",
    level: 90, // Code editor
  },
]

const projects = [
  {
    title: "Web-based Card Battle Game",
    description:
      "An interactive card battle game with multiplayer features, custom card designs, and real-time gameplay.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    status: "In Progress",
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    title: "Virtual Keyboard in Python",
    description: "A customizable virtual keyboard application with multiple language support and gesture recognition.",
    tech: ["Python", "OpenCV", "TKinter"],
    status: "In Progress",
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Completed",
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects with team collaboration features.",
    tech: ["React", "Firebase", "Tailwind CSS"],
    status: "Completed",
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information with interactive maps and forecasts.",
    tech: ["JavaScript", "Weather API", "Chart.js"],
    status: "Completed",
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    title: "Arduino IoT Project",
    description: "Smart home automation system using Arduino and sensors for environmental monitoring.",
    tech: ["Arduino", "C++", "IoT", "Sensors"],
    status: "Completed",
    github: "#",
    demo: "#",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

const stats = [
  { label: "Total Stars Earned", value: "5", icon: Star },
  { label: "Total Commits (2025)", value: "134", icon: GitCommit },
  { label: "Total PRs", value: "1", icon: GitPullRequest },
  { label: "Total Issues", value: "0", icon: AlertCircle },
]

const experiences = [
  {
    title: "Diploma in Information Technology",
    company: "Ganpat University",
    period: "2022 - 2025",
    description:
      "Completed a comprehensive diploma program in Information Technology, focusing on web development, programming languages, and database management.",
  },
  {
  title: "GUNI SciTech Fest-2025",
  company: "Ganpat University",
  period: "2025",
  description:
     "Won First Prize at GUNI SciTech Fest-2025 for building an Obstacle-Avoiding Fire Extinguisher Car with autonomous navigation and real-time sensor-based obstacle detection."  },
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "2022 - 2023",
    description:
      "Created websites for small businesses and individuals. Focused on responsive design and user experience.",
  },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const sections = ["home", "about", "skills", "projects", "experience", "contact"]
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = sectionRefs.current[section]
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (section: string) => {
    const element = sectionRefs.current[section]
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <ParticlesContainer />

      <div className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            >
              Krish Patel
            </Link>
            <NavMenu activeSection={activeSection} scrollToSection={scrollToSection} />
            <div className="flex items-center gap-2">
              <SocialLinks />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current.home = el)}
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="px-4 py-1 text-sm">
                <Sparkles className="w-3 h-3 mr-2" />
                Full Stack Developer
              </Badge>
              <HeroText />
              <p className="text-lg text-muted-foreground max-w-md">
                A passionate frontend and backend developer from India, crafting beautiful and functional web
                experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection("projects")} size="lg" className="gap-2">
                  View Projects
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button onClick={() => scrollToSection("contact")} variant="outline" size="lg" className="gap-2">
                  Contact Me
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Currently working on</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Virtual Keyboard in Python
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Web-based Card Battle Game
                  </Badge>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full border-2 border-border/50 overflow-hidden bg-background/50 backdrop-blur-sm p-4">
                  <img
                    src="/krish-hero-photo.png"
                    alt="Krish Patel"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-background rounded-full p-3 shadow-lg border border-border">
                  <Code className="w-6 h-6 text-purple-500" />
                </div>
                <div className="absolute -top-4 -left-4 bg-background rounded-full p-3 shadow-lg border border-border">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Button variant="ghost" size="icon" onClick={() => scrollToSection("about")} className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section ref={(el) => (sectionRefs.current.about = el)} id="about" className="py-20 relative">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              About Me
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                <img
                  src="/krish-about.png"
                  alt="Krish Patel - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-lg shadow-lg border border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="text-2xl font-bold">IT Diploma</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold">A passionate full stack developer from India</h3>
              <p className="text-muted-foreground">
                I'm a dedicated full stack developer with expertise in both frontend and backend technologies. I
                recently completed my Diploma in Information Technology from Ganpat University, where I gained
                comprehensive knowledge in web development, programming, and database management.
              </p>
              <p className="text-muted-foreground">
                I believe in continuous learning and staying updated with the latest technologies. Whether it's
                mastering new frameworks, exploring design patterns, or contributing to open-source projects, I'm always
                eager to grow and share knowledge with the community.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Currently working on</p>
                  <p className="font-medium">Virtual Keyboard in Python</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Currently learning</p>
                  <p className="font-medium">React and Android Development</p>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={() => scrollToSection("contact")} variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={(el) => (sectionRefs.current.skills = el)} id="skills" className="py-20 relative bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              My Skills
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Languages & Tools</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Frontend">Frontend</TabsTrigger>
              <TabsTrigger value="Backend">Backend</TabsTrigger>
              <TabsTrigger value="Database">Database</TabsTrigger>
              <TabsTrigger value="Mobile">Mobile</TabsTrigger>
              <TabsTrigger value="Hardware">Hardware</TabsTrigger>
              <TabsTrigger value="Design">Design</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <SkillsGrid technologies={technologies} />
            </TabsContent>
            {["Frontend", "Backend", "Database", "Mobile", "Hardware", "Design", "Tools"].map((category) => (
              <TabsContent key={category} value={category}>
                <SkillsGrid technologies={technologies.filter((tech) => tech.category === category)} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={(el) => (sectionRefs.current.projects = el)} id="projects" className="py-20 relative">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              My Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {projects
                .filter((project) => project.featured)
                .map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-8">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((project) => !project.featured)
                .map((project, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.github} target="_blank">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.demo} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={(el) => (sectionRefs.current.experience = el)}
        id="experience"
        className="py-20 relative bg-muted/30"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              My Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-border pl-8 ml-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-[41px] bg-background border-4 border-border rounded-full w-6 h-6">
                    <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  </div>
                  <div className="bg-card rounded-lg p-6 border border-border/50 shadow-md">
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                    <h3 className="text-xl font-bold mt-1">{exp.title}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    <p className="mt-3 text-muted-foreground">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">GitHub Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={(el) => (sectionRefs.current.contact = el)} id="contact" className="py-20 relative">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold">Let's Connect!</h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-border/50 hover:border-border transition-all duration-300">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">7233kp@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-border transition-all duration-300">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Github className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">@KrishP08</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-border transition-all duration-300">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Krish Patel</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-border transition-all duration-300">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">@krish_7233</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
