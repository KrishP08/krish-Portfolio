# Krish Patel - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases my skills, projects, and experience as a Full Stack Developer.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive Animations**: Smooth animations using Framer Motion
- **Contact Form**: Functional contact form with Discord webhook integration
- **Skills Showcase**: Interactive skills grid with technology logos
- **Project Gallery**: Featured and additional projects with live demos
- **Performance Optimized**: Fast loading with Next.js optimization
- **SEO Friendly**: Proper meta tags and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & Integrations
- **Discord Webhook** - Contact form submissions
- **Vercel** - Deployment and hosting

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/KrishP08/portfolio.git
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your_discord_webhook_url
   NEXT_PUBLIC_DISCORD_USER_ID=your_discord_user_id
   \`\`\`

4. **Add your photos**
   Place your photos in the \`public/images/\` directory:
   - \`krish-hero-photo.jpg\` - Square photo for hero section
   - \`krish-about-photo.jpg\` - Wide photo for about section

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information
Update your personal information in \`app/page.tsx\`:
- Name and title
- Bio and description
- Social media links
- Contact information

### Skills & Technologies
Modify the \`technologies\` array in \`app/page.tsx\` to reflect your skills:
\`\`\`typescript
const technologies = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
    level: 85,
  },
  // Add more technologies...
]
\`\`\`

### Projects
Update the \`projects\` array in \`app/page.tsx\` with your projects:
\`\`\`typescript
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    tech: ["React", "Node.js"],
    status: "Completed",
    github: "https://github.com/username/repo",
    demo: "https://your-demo-url.com",
    image: "/path/to/image.jpg",
    featured: true,
  },
  // Add more projects...
]
\`\`\`

### Experience
Modify the \`experiences\` array to include your work experience and education.

### Contact Form
The contact form uses Discord webhooks. To set it up:
1. Create a Discord server
2. Create a webhook in your desired channel
3. Add the webhook URL to your environment variables

## 📱 Sections

- **Hero**: Introduction with call-to-action buttons
- **About**: Personal story and background
- **Skills**: Interactive technology showcase
- **Projects**: Featured and additional projects
- **Experience**: Education and work history
- **Contact**: Contact form and social links

## 🚀 Deployment

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy on Netlify
1. Build the project: \`npm run build\`
2. Upload the \`out\` folder to Netlify
3. Configure environment variables

### Deploy on Other Platforms
1. Build the project: \`npm run build\`
2. Upload the generated files to your hosting provider

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads

## 🔧 Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/KrishP08/portfolio/issues).

## 📞 Contact

- **Email**: 7233kp@gmail.com
- **LinkedIn**: [Krish Patel](https://linkedin.com/in/krish)
- **GitHub**: [@KrishP08](https://github.com/KrishP08)
- **Instagram**: [@krishp08](https://instagram.com/krish_7233)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

⭐ Star this repository if you found it helpful!
