'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { personalInfo, projects, skills } from '@/lib/data'

type ChapterKey = 'entry' | 'skills' | 'experience' | 'projects' | 'contact'

type SkillCluster = {
  category: string
  icon?: string
  items: string[]
}

type ProjectItem = {
  number: string
  title: string
  period: string
  metric: string
  description: string
  tags: string[]
  github?: string
}

type Signal = {
  id: string
  title: string
  subtitle: string
  description: string
  tags?: string[]
  href?: string
  chapter: ChapterKey
  x: string
  y: string
  size: 'sm' | 'md' | 'lg'
}

type SelectedSignal = {
  title: string
  subtitle: string
  description: string
  tags?: string[]
  href?: string
  chapter: ChapterKey
}

const chapters: ChapterKey[] = ['entry', 'skills', 'experience', 'projects', 'contact']

function sizeClass(size: Signal['size']) {
  if (size === 'lg') return 'h-5 w-5'
  if (size === 'md') return 'h-4 w-4'
  return 'h-3 w-3'
}

export default function BlackHoleExperience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [chapter, setChapter] = useState<ChapterKey>('entry')
  const [selected, setSelected] = useState<SelectedSignal | null>(null)

  const typedSkills = skills as SkillCluster[]
  const typedProjects = projects as ProjectItem[]

  const skillSignals = useMemo<Signal[]>(() => {
    const positions = [
      ['61%', '30%'],
      ['79%', '36%'],
      ['63%', '55%'],
      ['83%', '57%'],
      ['63%', '74%'],
      ['76%', '72%'],
    ]

    return typedSkills.slice(0, 6).map((cluster, index) => ({
      id: `skill-${cluster.category}`,
      title: cluster.category,
      subtitle: 'Skill Signal',
      description: `This signal contains: ${cluster.items.join(', ')}.`,
      tags: cluster.items,
      chapter: 'skills',
      x: positions[index]?.[0] ?? '70%',
      y: positions[index]?.[1] ?? '50%',
      size: index < 2 ? 'lg' : 'md',
    }))
  }, [typedSkills])

  const projectSignals = useMemo<Signal[]>(() => {
    const preferred = [
      'AI Resume + Job Matching Assistant',
      'Employee Attrition Prediction',
      'Diabetes Prediction System',
      'Search Engine',
      'Recommendation System',
      'Black Hole Animated Portfolio',
    ]

    const chosen = preferred
      .map((title) => typedProjects.find((p) => p.title === title))
      .filter(Boolean) as ProjectItem[]

    const fallback = typedProjects
      .filter((p) => !chosen.some((c) => c.title === p.title))
      .slice(0, Math.max(0, 6 - chosen.length))

    const finalProjects = [...chosen, ...fallback].slice(0, 6)

    const positions = [
      ['60%', '29%'],
      ['80%', '35%'],
      ['66%', '51%'],
      ['86%', '57%'],
      ['62%', '73%'],
      ['78%', '75%'],
    ]

    return finalProjects.map((project, index) => ({
      id: `project-${project.number}`,
      title: project.title,
      subtitle: project.metric,
      description: project.description,
      tags: project.tags,
      href: project.github,
      chapter: 'projects',
      x: positions[index]?.[0] ?? '70%',
      y: positions[index]?.[1] ?? '50%',
      size: index < 2 ? 'lg' : 'md',
    }))
  }, [typedProjects])

  const experienceSignals: Signal[] = [
    {
      id: 'experience-01',
      title: 'Data Analytics Intern',
      subtitle: 'Pixbyte Future Tech LLP',
      description:
        'Built analytics pipelines, KPI dashboards, and reporting workflows using Python, SQL, Tableau, and Excel.',
      chapter: 'experience',
      x: '64%',
      y: '36%',
      size: 'lg',
    },
    {
      id: 'experience-02',
      title: 'Analytics Pipelines',
      subtitle: 'Python · SQL · Data Quality',
      description:
        'Designed reusable data workflows and improved reporting reliability across reporting cycles.',
      chapter: 'experience',
      x: '82%',
      y: '55%',
      size: 'md',
    },
    {
      id: 'experience-03',
      title: 'Business Dashboards',
      subtitle: 'BI · KPI Reporting',
      description:
        'Translated operational and financial data into clear dashboard views for technical and non-technical decision-makers.',
      chapter: 'experience',
      x: '67%',
      y: '73%',
      size: 'md',
    },
  ]

  const contactSignals: Signal[] = [
    {
      id: 'contact-email',
      title: 'Email',
      subtitle: personalInfo.email,
      description:
        'Reach out for Data Science, Analytics, Business Intelligence, or AI-focused opportunities.',
      chapter: 'contact',
      x: '65%',
      y: '39%',
      size: 'lg',
    },
    {
      id: 'contact-linkedin',
      title: 'LinkedIn',
      subtitle: 'Professional Profile',
      description: 'Connect with me professionally and view my career updates.',
      href: personalInfo.linkedin,
      chapter: 'contact',
      x: '80%',
      y: '58%',
      size: 'md',
    },
    {
      id: 'contact-github',
      title: 'GitHub',
      subtitle: 'Repositories',
      description: 'View my source code and technical projects.',
      href: personalInfo.github,
      chapter: 'contact',
      x: '68%',
      y: '73%',
      size: 'md',
    },
  ]

  const signals: Signal[] =
    chapter === 'skills'
      ? skillSignals
      : chapter === 'experience'
        ? experienceSignals
        : chapter === 'projects'
          ? projectSignals
          : chapter === 'contact'
            ? contactSignals
            : []

  useEffect(() => {
    const updateChapter = () => {
      const index = Math.min(
        chapters.length - 1,
        Math.max(0, Math.floor((window.scrollY + window.innerHeight * 0.42) / window.innerHeight))
      )

      setChapter(chapters[index])
    }

    updateChapter()
    window.addEventListener('scroll', updateChapter, { passive: true })

    return () => window.removeEventListener('scroll', updateChapter)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = window.devicePixelRatio || 1
    let raf = 0

    const particles = Array.from({ length: 130 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 820 + 280,
      speed: Math.random() * 0.00034 + 0.0001,
      length: Math.random() * 0.22 + 0.12,
      alpha: Math.random() * 0.14 + 0.035,
    }))

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const depth = Math.min(1, window.scrollY / (window.innerHeight * 4))
      const coreX = width * 0.72
      const coreY = height * 0.5
      const coreRadius = 108 + depth * 42
      const maxRadius = Math.max(width, height)

      ctx.fillStyle = 'rgba(2, 3, 10, 0.7)'
      ctx.fillRect(0, 0, width, height)

      const gravity = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, maxRadius * 0.9)
      gravity.addColorStop(0, 'rgba(0,0,0,1)')
      gravity.addColorStop(0.28, 'rgba(0,0,0,0.99)')
      gravity.addColorStop(0.55, 'rgba(7,11,25,0.25)')
      gravity.addColorStop(1, 'rgba(2,3,10,0.94)')

      ctx.fillStyle = gravity
      ctx.fillRect(0, 0, width, height)

      for (const particle of particles) {
        particle.radius -= 0.04 + depth * 0.14
        particle.angle += particle.speed * (1 + depth * 0.9)

        if (particle.radius < coreRadius + 24) {
          particle.radius = maxRadius * (0.72 + Math.random() * 0.38)
          particle.angle = Math.random() * Math.PI * 2
        }

        const x = coreX + Math.cos(particle.angle) * particle.radius
        const y = coreY + Math.sin(particle.angle) * particle.radius * 0.72
        const stretch = 2.2 + depth * 3.2 + (1 - particle.radius / maxRadius) * 4.2
        const alpha = Math.min(0.18, particle.alpha + depth * 0.05)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(particle.angle + Math.PI)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fillRect(-stretch / 2, -0.4, stretch * particle.length, 0.8)
        ctx.restore()
      }

      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath()
        ctx.ellipse(coreX, coreY, 210 + i * 100, (210 + i * 100) * 0.72, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212,175,55,${0.024 - i * 0.006})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      const core = ctx.createRadialGradient(coreX, coreY, coreRadius * 0.2, coreX, coreY, coreRadius * 3.4)
      core.addColorStop(0, 'rgba(0,0,0,1)')
      core.addColorStop(0.45, 'rgba(0,0,0,0.998)')
      core.addColorStop(0.78, 'rgba(0,0,0,0.52)')
      core.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(coreX, coreY, coreRadius * 3.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(coreX, coreY, coreRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#000'
      ctx.fill()

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const chapterText: Record<
    ChapterKey,
    {
      nav: string
      eyebrow: string
      title: ReactNode
      body: string
    }
  > = {
    entry: {
      nav: 'Entry',
      eyebrow: '00 / Outside the event horizon',
      title: (
        <>
          Meet <span className="text-[#D4AF37]">Gajera</span>
        </>
      ),
      body:
        'Aspiring Data Scientist, Data Analyst, and Business Analyst — drawn to the quiet work of turning complex data into clear decisions.',
    },
    skills: {
      nav: 'Signals',
      eyebrow: '01 / First signals',
      title: (
        <>
          What I am <span className="text-[#D4AF37]">made of</span>
        </>
      ),
      body:
        'A few signals begin to appear. Each one represents a skill layer, not a long list.',
    },
    experience: {
      nav: 'Orbit',
      eyebrow: '02 / Practical orbit',
      title: (
        <>
          Where I have <span className="text-[#D4AF37]">practiced</span>
        </>
      ),
      body:
        'This layer holds the work where data became dashboards, pipelines, reports, and business visibility.',
    },
    projects: {
      nav: 'Matter',
      eyebrow: '03 / Core matter',
      title: (
        <>
          What I have <span className="text-[#D4AF37]">built</span>
        </>
      ),
      body:
        'Projects appear as brighter matter near the core. Select a signal to inspect it.',
    },
    contact: {
      nav: 'Signal',
      eyebrow: '04 / Final signal',
      title: (
        <>
          Let’s <span className="text-[#D4AF37]">connect</span>
        </>
      ),
      body:
        'If my way of thinking feels aligned with your team, I would be grateful to connect.',
    },
  }

  const current = chapterText[chapter]

  return (
    <main className="relative min-h-[500vh] overflow-x-hidden bg-[#02030a] text-[#EDE8DD]">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden="true" />

      <nav className="fixed left-0 right-0 top-0 z-50 px-6 py-6 md:px-14">
        <div className="flex items-center justify-between">
          <a href="#entry" className="font-display text-2xl font-black text-[#D4AF37]">
            MG.
          </a>

          <div className="hidden items-center gap-7 text-[10px] font-black uppercase tracking-[0.25em] text-[#8AA0BC] md:flex">
            {chapters.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={chapter === item ? 'text-[#D4AF37]' : 'transition hover:text-white'}
              >
                {chapterText[item].nav}
              </a>
            ))}
          </div>

          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-sm bg-[#D4AF37] px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          >
            Hire Me
          </a>
        </div>
      </nav>

      <section className="fixed inset-0 z-10 flex items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-[#D4AF37]">
            {current.eyebrow}
          </p>

          <h1 className="font-display text-[clamp(4rem,9vw,8rem)] font-black leading-[0.9]">
            {current.title}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#9fb0cc]">
            {current.body}
          </p>

          {chapter === 'entry' && (
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#skills"
                className="rounded-sm bg-[#D4AF37] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:shadow-[0_0_24px_rgba(212,175,55,0.32)]"
              >
                Enter
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#9fb0cc] transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
              >
                Resume
              </a>
            </div>
          )}

          {chapter === 'contact' && (
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="rounded-sm bg-[#D4AF37] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black"
              >
                Send Email
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-[#D4AF37]/70 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#D4AF37]"
              >
                LinkedIn
              </a>
            </div>
          )}
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.35em] text-[#8AA0BC]">
          Scroll deeper
        </p>
      </section>

      <section className="fixed inset-0 z-20 pointer-events-none">
        {signals.map((signal) => {
          const isProject = signal.chapter === 'projects'
          const dotSize = sizeClass(signal.size)

          return (
            <button
              key={signal.id}
              onClick={() =>
                setSelected({
                  title: signal.title,
                  subtitle: signal.subtitle,
                  description: signal.description,
                  tags: signal.tags,
                  href: signal.href,
                  chapter: signal.chapter,
                })
              }
              className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-left transition duration-300 hover:scale-125"
              style={{ left: signal.x, top: signal.y }}
            >
              <span
                className={`${dotSize} block rounded-full ${
                  isProject
                    ? 'bg-[#D4AF37] shadow-[0_0_34px_rgba(212,175,55,0.75)]'
                    : 'bg-white shadow-[0_0_24px_rgba(255,255,255,0.42)]'
                }`}
              />

              <span className="absolute left-7 top-1/2 max-w-[260px] -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#02030a]/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                {signal.title}
              </span>
            </button>
          )
        })}
      </section>

      <div className="relative z-0">
        <section id="entry" className="h-screen" />
        <section id="skills" className="h-screen" />
        <section id="experience" className="h-screen" />
        <section id="projects" className="h-screen" />
        <section id="contact" className="h-screen" />
      </div>

      {selected && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-6">
          <button
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            aria-label="Close detail panel"
          />

          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#050816]/95 p-8 shadow-2xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#D4AF37]">
              {selected.chapter === 'skills'
                ? 'Skill Signal'
                : selected.chapter === 'projects'
                  ? 'Project Matter'
                  : selected.chapter === 'experience'
                    ? 'Experience Orbit'
                    : 'Final Signal'}
            </p>

            <h2 className="font-display text-4xl font-black leading-tight text-white">
              {selected.title}
            </h2>

            <p className="mt-2 text-sm font-bold text-[#D4AF37]">
              {selected.subtitle}
            </p>

            <p className="mt-5 text-sm leading-7 text-[#9fb0cc]">
              {selected.description}
            </p>

            {selected.tags && (
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#9fb0cc]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex gap-3">
              {selected.href && (
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm bg-[#D4AF37] px-5 py-2 text-sm font-black uppercase tracking-[0.16em] text-black"
                >
                  Open
                </a>
              )}

              <button
                onClick={() => setSelected(null)}
                className="rounded-sm border border-white/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}