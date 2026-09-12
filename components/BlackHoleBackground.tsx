'use client'

import { useEffect, useRef, useState } from 'react'

type StarType = 'skill' | 'project'

type Star = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  speed: number
  type: StarType
  label: string
  description: string
  drift: number
}

type SelectedStar = {
  type: StarType
  label: string
  description: string
}

const skills = [
  { label: 'Machine Learning', description: 'Models, classification, regression, and intelligent decision-making.' },
  { label: 'Python', description: 'Data analysis, automation, ML workflows, and backend logic.' },
  { label: 'SQL', description: 'Querying, cleaning, and analyzing structured relational data.' },
  { label: 'Power BI / Tableau', description: 'Dashboards, KPI reporting, and business intelligence storytelling.' },
  { label: 'Data Engineering', description: 'ETL pipelines, validation, data quality, and workflow automation.' },
]

const projects = [
  { label: 'AI Resume Matcher', description: 'RAG-based resume and job matching assistant with match score and missing skills.' },
  { label: 'Employee Attrition Prediction', description: 'HR analytics classification system for predicting employee attrition risk.' },
  { label: 'Diabetes Prediction', description: 'Machine learning classification system using medical indicators.' },
  { label: 'Search Engine', description: 'Python search engine using crawling, inverted index, and ranking.' },
  { label: 'Recommendation System', description: 'Collaborative filtering recommendation system using Spark ALS.' },
  { label: 'Black Hole Portfolio', description: 'This interactive portfolio system built with Next.js, TypeScript, Tailwind, and Canvas.' },
]

export default function BlackHoleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedStar, setSelectedStar] = useState<SelectedStar | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = window.devicePixelRatio || 1
    let raf = 0

    const mouse = { x: -9999, y: -9999 }
    let hoveredStar: (Star & { px: number; py: number }) | null = null

    const center = () => ({
      // core stays on the right side on desktop, centered on mobile
      x: width >= 900 ? width * 0.68 : width * 0.5,
      y: height * 0.48,
    })

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createStar = (): Star => {
      const c = center()
      const angle = Math.random() * Math.PI * 2
      const radius = Math.max(width, height) * (0.55 + Math.random() * 0.75)
      const isProject = Math.random() < 0.25
      const source = isProject ? projects : skills
      const item = source[Math.floor(Math.random() * source.length)]

      return {
        x: c.x + Math.cos(angle) * radius,
        y: c.y + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        size: isProject ? 1.8 + Math.random() * 1.6 : 0.8 + Math.random() * 1.2,
        speed: 0.55 + Math.random() * 1.15,
        type: isProject ? 'project' : 'skill',
        label: item.label,
        description: item.description,
        drift: Math.random() * Math.PI * 2,
      }
    }

    const stars: Star[] = Array.from({ length: 520 }, createStar)

    const resetStar = (star: Star) => {
      const fresh = createStar()
      Object.assign(star, fresh)
    }

    const drawCore = (cx: number, cy: number, depth: number) => {
      // dark gravitational well, not a glowing ring
      const wellRadius = 180 + depth * 90
      const gradient = ctx.createRadialGradient(cx, cy, 25, cx, cy, wellRadius)
      gradient.addColorStop(0, 'rgba(0,0,0,1)')
      gradient.addColorStop(0.28, 'rgba(0,0,0,0.98)')
      gradient.addColorStop(0.68, 'rgba(0,0,0,0.48)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.beginPath()
      ctx.arc(cx, cy, wellRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, 58 + depth * 14, 0, Math.PI * 2)
      ctx.fillStyle = '#000'
      ctx.fill()
    }

    const drawHoverLabel = () => {
      if (!hoveredStar) return

      ctx.save()
      const boxWidth = Math.min(300, Math.max(178, ctx.measureText(hoveredStar.label).width + 54))
      const boxHeight = 62
      let x = hoveredStar.px + 18
      let y = hoveredStar.py - 36

      if (x + boxWidth > width - 20) x = hoveredStar.px - boxWidth - 18
      if (y < 90) y = hoveredStar.py + 20

      ctx.beginPath()
      ctx.arc(hoveredStar.px, hoveredStar.py, 7, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()

      ctx.fillStyle = 'rgba(2,3,10,0.88)'
      ctx.strokeStyle = 'rgba(212,175,55,0.32)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(x, y, boxWidth, boxHeight, 14)
      ctx.fill()
      ctx.stroke()

      ctx.font = '700 10px Outfit, Arial, sans-serif'
      ctx.fillStyle = '#D4AF37'
      ctx.fillText(hoveredStar.type === 'project' ? 'PROJECT STAR' : 'SKILL STAR', x + 16, y + 22)

      ctx.font = '600 14px Outfit, Arial, sans-serif'
      ctx.fillStyle = '#EDE8DD'
      ctx.fillText(hoveredStar.label, x + 16, y + 45)
      ctx.restore()
    }

    const animate = () => {
      const c = center()
      const depth = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - height))

      // less fade = visible trails; more fade = cleaner. This is balanced.
      ctx.fillStyle = `rgba(2,3,10,${0.38 + depth * 0.18})`
      ctx.fillRect(0, 0, width, height)

      hoveredStar = null
      let nearest = 34

      // dark well behind stars
      drawCore(c.x, c.y, depth)

      for (const star of stars) {
        const dx = c.x - star.x
        const dy = c.y - star.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1

        // non-linear gravity: slow far away, strong near core
        const pull = (0.0022 + 18 / (dist * dist)) * star.speed * (1 + depth * 1.8)

        // tiny swirl only, so it does not become a donut/ring
        const tangentX = -dy / dist
        const tangentY = dx / dist
        const swirl = 0.028 * star.speed * (1 - Math.min(1, dist / 700))

        star.vx = star.vx * 0.88 + dx * pull + tangentX * swirl
        star.vy = star.vy * 0.88 + dy * pull + tangentY * swirl

        star.x += star.vx
        star.y += star.vy
        star.drift += 0.02

        const near = Math.max(0, 1 - dist / 720)
        const alpha = Math.min(0.95, 0.18 + near * 1.15 + depth * 0.12)
        const size = star.size * (1 + near * 2.1)
        const stretch = 1 + near * 5.2
        const angle = Math.atan2(star.vy, star.vx)

        ctx.save()
        ctx.translate(star.x, star.y)
        ctx.rotate(angle)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fillRect(-size / 2, -size / 2, size * stretch, size)
        ctx.restore()

        const mdx = mouse.x - star.x
        const mdy = mouse.y - star.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < nearest && dist > 110) {
          nearest = mDist
          hoveredStar = { ...star, px: star.x, py: star.y }
        }

        if (dist < 72 || star.x < -240 || star.x > width + 240 || star.y < -240 || star.y > height + 240) {
          resetStar(star)
        }
      }

      // void must be on top so stars are swallowed, not drawn over it
      drawCore(c.x, c.y, depth)
      drawHoverLabel()

      raf = requestAnimationFrame(animate)
    }

    const move = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      canvas.style.cursor = hoveredStar ? 'pointer' : 'default'
    }

    const leave = () => {
      mouse.x = -9999
      mouse.y = -9999
      canvas.style.cursor = 'default'
    }

    const click = () => {
      if (!hoveredStar) return
      setSelectedStar({
        type: hoveredStar.type,
        label: hoveredStar.label,
        description: hoveredStar.description,
      })
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseleave', leave)
    canvas.addEventListener('click', click)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseleave', leave)
      canvas.removeEventListener('click', click)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden="true" />

      {selectedStar && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-6">
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedStar(null)}
            aria-label="Close star panel"
          />

          <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#02030a]/95 p-8 shadow-2xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#D4AF37]">
              {selectedStar.type === 'project' ? 'Project Star' : 'Skill Star'}
            </p>

            <h2 className="font-display mb-4 text-4xl font-black text-[#EDE8DD]">
              {selectedStar.label}
            </h2>

            <p className="mb-7 text-sm leading-7 text-[#8AA0BC]">
              {selectedStar.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {selectedStar.type === 'project' && (
                <a
                  href="#projects"
                  onClick={() => setSelectedStar(null)}
                  className="rounded-sm bg-[#D4AF37] px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5"
                >
                  Open Project Section
                </a>
              )}

              <button
                onClick={() => setSelectedStar(null)}
                className="rounded-sm border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
