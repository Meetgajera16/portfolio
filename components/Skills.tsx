'use client'
import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { skills } from '@/lib/data'

export default function Skills() {
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
      id="skills"
      ref={ref}
      className="relative py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="section-divider mb-20" />
      <SectionHeader tag="What I Know" title="Technical" highlight="Skills" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((cat, i) => (
          <div
            key={cat.category}
            className={`reveal delay-${(i % 5) + 1} group p-6 rounded-lg transition-all duration-300 hover:-translate-y-1`}
            style={{
              background: 'rgba(22,43,71,0.45)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 mb-4 pb-4 text-xs font-bold tracking-[0.16em] uppercase"
              style={{
                color: 'var(--gold)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.category}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-sm font-medium transition-all duration-150 cursor-default hover:scale-105"
                  style={{
                    background: 'rgba(180,145,48,0.08)',
                    border: '1px solid rgba(180,145,48,0.18)',
                    color: '#A0B8D0',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
