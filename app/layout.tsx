import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Krish Patel | Full Stack Developer",
  description:
    "A passionate frontend and backend developer from India specializing in React, TypeScript, and modern web technologies.",
  keywords: [
    "frontend developer",
    "backend developer",
    "full stack",
    "web developer",
    "React",
    "TypeScript",
    "Next.js",
    "India",
    "Krish Patel",
  ],
  authors: [{ name: "Krish Patel" }],
  openGraph: {
    title: "Krish Patel | Full Stack Developer",
    description:
      "A passionate frontend and backend developer from India specializing in React, TypeScript, and modern web technologies.",
    url: "https://krishp08.vercel.app",
    siteName: "Krish Patel Portfolio",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
