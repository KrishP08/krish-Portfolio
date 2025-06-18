"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle, Shield } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [messageType, setMessageType] = useState("")
  const lastSubmissionTime = useRef<number>(0)

  // Rate limiting: Prevent spam submissions
  const RATE_LIMIT_MS = 30000 // 30 seconds between submissions

  // Input validation
  const validateInput = (data: any) => {
    const errors = []

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /https?:\/\//gi, // URLs in name/subject
      /<script/gi, // Script tags
      /javascript:/gi, // JavaScript protocols
      /\b(viagra|casino|lottery|winner)\b/gi, // Common spam words
    ]

    const nameField = data.name.toLowerCase()
    const subjectField = data.subject.toLowerCase()

    if (suspiciousPatterns.some((pattern) => pattern.test(nameField) || pattern.test(subjectField))) {
      errors.push("Suspicious content detected")
    }

    // Length validation
    if (data.name.length < 2 || data.name.length > 100) {
      errors.push("Name must be between 2-100 characters")
    }

    if (data.subject.length > 200) {
      errors.push("Subject must be less than 200 characters")
    }

    if (data.message.length < 10 || data.message.length > 2000) {
      errors.push("Message must be between 10-2000 characters")
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address")
    }

    return errors
  }

  // Get embed color based on message type
  const getEmbedColor = (type: string, subject: string) => {
    const subjectLower = subject.toLowerCase()

    if (type === "urgent" || subjectLower.includes("urgent")) {
      return 0xef4444 // Red
    } else if (type === "job" || subjectLower.includes("job") || subjectLower.includes("hire")) {
      return 0x10b981 // Green
    } else if (type === "collaboration" || subjectLower.includes("collab") || subjectLower.includes("partner")) {
      return 0x3b82f6 // Blue
    } else if (type === "question" || subjectLower.includes("question") || subjectLower.includes("help")) {
      return 0xf59e0b // Yellow
    } else if (type === "feedback" || subjectLower.includes("feedback") || subjectLower.includes("review")) {
      return 0x8b5cf6 // Purple
    }
    return 0x7c3aed // Default purple
  }

  // Get priority level for mentions
  const getPriorityMention = (type: string, subject: string) => {
    const subjectLower = subject.toLowerCase()

    if (type === "urgent" || subjectLower.includes("urgent") || subjectLower.includes("asap")) {
      return "<@785561266927566856>" // Your Discord user ID
    }
    return undefined
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Rate limiting check
    const now = Date.now()
    if (now - lastSubmissionTime.current < RATE_LIMIT_MS) {
      const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - lastSubmissionTime.current)) / 1000)
      setError(`Please wait ${remainingTime} seconds before submitting another message.`)
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      name: (formData.get("name") as string).trim(),
      email: (formData.get("email") as string).trim().toLowerCase(),
      subject: (formData.get("subject") as string).trim(),
      message: (formData.get("message") as string).trim(),
      website: (formData.get("website") as string)?.trim() || "",
      company: (formData.get("company") as string)?.trim() || "",
      phone: (formData.get("phone") as string)?.trim() || "",
      messageType: messageType,
    }

    // Validate input
    const validationErrors = validateInput(data)
    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "))
      setIsSubmitting(false)
      return
    }

    // Your Discord webhook URL
    const DISCORD_WEBHOOK_URL =
      "https://discord.com/api/webhooks/1381154966575517769/v4_OnJKr1RzWoMsDlUfKHyopOpY37iUotGhOCIhhCD1vZxP9TFr9WyOXD2NptEiSWDLt"

    try {
      const embedColor = getEmbedColor(data.messageType, data.subject)
      const priorityMention = getPriorityMention(data.messageType, data.subject)

      // Get user's location and browser info (optional)
      const userAgent = navigator.userAgent
      const language = navigator.language
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: priorityMention,
          embeds: [
            {
              title: `🚀 New Portfolio Contact${data.messageType ? ` - ${data.messageType.charAt(0).toUpperCase() + data.messageType.slice(1)}` : ""}`,
              description: "Someone just contacted you through your portfolio website!",
              color: embedColor,
              fields: [
                {
                  name: "👤 Contact Information",
                  value: `**Name:** ${data.name}\n**Email:** ${data.email}${data.phone ? `\n**Phone:** ${data.phone}` : ""}`,
                  inline: false,
                },
                {
                  name: "🏢 Professional Details",
                  value: `**Company:** ${data.company || "Not provided"}\n**Website:** ${data.website || "Not provided"}`,
                  inline: false,
                },
                {
                  name: "📝 Subject",
                  value: data.subject,
                  inline: false,
                },
                {
                  name: "💬 Message",
                  value: data.message.length > 1000 ? data.message.substring(0, 1000) + "..." : data.message,
                  inline: false,
                },
                {
                  name: "🌐 Technical Info",
                  value: `**Browser:** ${userAgent.split(" ").pop()}\n**Language:** ${language}\n**Timezone:** ${timezone}`,
                  inline: true,
                },
                {
                  name: "⏰ Submitted",
                  value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                  inline: true,
                },
              ],
              footer: {
                text: "Portfolio Contact Form • Krish Patel",
                icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
              },
              timestamp: new Date().toISOString(),
              thumbnail: {
                url:
                  data.messageType === "job"
                    ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                    : data.messageType === "collaboration"
                      ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                      : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
              },
            },
          ],
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        lastSubmissionTime.current = now

        // Store form reference before resetting
        const form = e.currentTarget

        // Safely reset the form if it exists
        if (form) {
          try {
            form.reset()
          } catch (resetError) {
            console.error("Error resetting form:", resetError)
          }
        }

        setMessageType("")

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }
    } catch (error) {
      console.error("Error sending to Discord:", error)
      setError("Failed to send message. Please try again or contact me directly via email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Send Me a Message
          <Shield className="w-4 h-4 text-green-500" title="Secure form with spam protection" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <p className="text-xs text-muted-foreground mt-2">Expected response time: 24-48 hours</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Message Type Selector */}
            <div className="space-y-2">
              <label htmlFor="messageType" className="text-sm font-medium">
                Message Type
              </label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select message type (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">💼 Job Opportunity</SelectItem>
                  <SelectItem value="collaboration">🤝 Collaboration</SelectItem>
                  <SelectItem value="question">❓ Question</SelectItem>
                  <SelectItem value="feedback">💭 Feedback</SelectItem>
                  <SelectItem value="urgent">🚨 Urgent</SelectItem>
                  <SelectItem value="other">📝 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name *
                </label>
                <Input id="name" name="name" placeholder="Your full name" required maxLength={100} minLength={2} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input id="company" name="company" placeholder="Your company (optional)" maxLength={100} />
              </div>
              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Website
                </label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://yourwebsite.com (optional)"
                  maxLength={200}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567 (optional)" maxLength={20} />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </label>
                <Input id="subject" name="subject" placeholder="What's this about?" required maxLength={200} />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me more about your project, question, or how I can help you..."
                rows={5}
                required
                maxLength={2000}
                minLength={10}
              />
              <p className="text-xs text-muted-foreground">Minimum 10 characters, maximum 2000 characters</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending securely...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            {/* Security Notice */}
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Your message is sent securely with spam protection. I typically respond within 24-48 hours.
              </p>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
