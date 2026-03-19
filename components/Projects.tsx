'use client'
import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { projects } from '@/lib/data'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="section-divider mb-20" />
      <SectionHeader tag="What I've Built" title="Featured" highlight="Projects" />

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj, i) => (
          <div
            key={proj.number}
            className={`reveal delay-${i + 1} group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2`}
            style={{
              background: 'rgba(22,43,71,0.45)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-[3px] w-full"
              style={{
                background: 'linear-gradient(90deg, var(--gold), transparent)',
              }}
            />

            <div className="p-8 relative">
              {/* Ghost number */}
              <span
                className="absolute top-4 right-6 font-display font-black text-7xl pointer-events-none select-none leading-none transition-all duration-300 group-hover:opacity-15"
                style={{ color: 'var(--gold)', opacity: 0.06 }}
              >
                {proj.number}
              </span>

              {/* Metric badge */}
              <div className="mb-4">
                <span
                  className="text-xs font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-sm"
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    color: '#4ade80',
                    border: '1px solid rgba(74,222,128,0.2)',
                  }}
                >
                  ✦ {proj.metric}
                </span>
              </div>

              <h3
                className="font-display text-2xl font-bold mb-1 leading-tight"
                style={{ color: 'var(--cream)' }}
              >
                {proj.title}
              </h3>
              <p
                className="text-xs font-semibold tracking-wide mb-4"
                style={{ color: 'var(--gold)' }}
              >
                {proj.period}
              </p>

              <p className="text-sm leading-7 mb-6" style={{ color: '#8AA0BC' }}>
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-sm"
                    style={{
                      background: 'rgba(180,145,48,0.08)',
                      border: '1px solid rgba(180,145,48,0.2)',
                      color: 'var(--gold)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
