"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, User, Code, Briefcase, MessageSquare, FileText } from "lucide-react"

interface NavMenuProps {
  activeSection: string
  scrollToSection: (section: string) => void
}

export function NavMenu({ activeSection, scrollToSection }: NavMenuProps) {
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: "home", icon: Home },
    { name: "about", icon: User },
    { name: "skills", icon: Code },
    { name: "projects", icon: Briefcase },
    { name: "experience", icon: FileText },
    { name: "contact", icon: MessageSquare },
  ]

  const handleClick = (section: string) => {
    scrollToSection(section)
    setOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.name)}
            className={`capitalize font-medium transition-colors ${
              activeSection === item.name ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative z-50"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] z-[100] fixed">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.name)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                      activeSection === item.name
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="capitalize font-medium">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
