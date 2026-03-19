'use client'
import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { experience } from '@/lib/data'

export default function Experience() {
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
      id="experience"
      ref={ref}
      className="relative py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="section-divider mb-20" />
      <SectionHeader tag="Work History" title="Professional" highlight="Experience" />

      <div className="relative pl-6 md:pl-10">
        {/* Timeline line */}
        <div
          className="absolute left-0 top-2 bottom-2 w-px"
          style={{
            background: 'linear-gradient(to bottom, var(--gold), rgba(180,145,48,0.1))',
          }}
        />

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <div key={exp.company} className={`reveal delay-${i + 1} relative`}>
              {/* Dot */}
              <div
                className="absolute -left-[2.65rem] md:-left-[3.05rem] top-1.5 w-3.5 h-3.5 rounded-full"
                style={{
                  background: 'var(--gold)',
                  border: '3px solid var(--navy)',
                  boxShadow: '0 0 0 3px rgba(180,145,48,0.25)',
                }}
              />

              <div
                className="p-6 md:p-8 rounded-xl transition-all duration-300 hover:border-gold"
                style={{
                  background: 'rgba(22,43,71,0.45)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <h3
                    className="font-display text-2xl font-bold"
                    style={{ color: 'var(--cream)' }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    className="text-xs font-bold tracking-wide px-3 py-1 rounded-sm"
                    style={{
                      background: 'rgba(180,145,48,0.1)',
                      color: 'var(--gold)',
                      border: '1px solid rgba(180,145,48,0.2)',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
                  {exp.company} &nbsp;·&nbsp; {exp.location}
                </p>

                <ul className="space-y-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm leading-7" style={{ color: '#8AA0BC' }}>
                      <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
