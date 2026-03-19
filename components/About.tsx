'use client'
import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { personalInfo } from '@/lib/data'

const cards = [
  { icon: '🎓', label: 'Degree', value: 'MS Data Science — Stevens Institute of Technology' },
  { icon: '📊', label: 'GPA', value: '3.727 / 4.0 (Fall 2025)' },
  { icon: '📍', label: 'Location', value: 'New Jersey, USA' },
  { icon: '📅', label: 'Graduation', value: 'Expected May 2027' },
  { icon: '📧', label: 'Email', value: 'meetgajera16@gmail.com' },
  { icon: '🔍', label: 'Status', value: 'Open to Internships & Full-Time' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="section-divider mb-20" />
      <SectionHeader tag="Who I Am" title="About" highlight="Me" />

      <div className="grid md:grid-cols-2 gap-14 items-start">
        {/* Text */}
        <div className="space-y-5 reveal">
          {personalInfo.bio.map((p, i) => (
            <p key={i} className="text-base leading-8 font-light" style={{ color: '#8AA0BC' }}>
              {p}
            </p>
          ))}

          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="mailto:meetgajera16@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--gold)', color: 'var(--navy)' }}
            >
              📬 Email Me
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all hover:-translate-y-0.5"
              style={{ border: '1.5px solid var(--border)', color: 'var(--muted)' }}
            >
              💼 LinkedIn
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className={`reveal delay-${i + 1} flex items-start gap-3 p-4 rounded-md transition-all duration-200 hover:translate-x-1 cursor-default`}
              style={{
                background: 'rgba(22,43,71,0.45)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-xl mt-0.5 flex-shrink-0">{c.icon}</span>
              <div>
                <div
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-0.5"
                  style={{ color: 'var(--muted)' }}
                >
                  {c.label}
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--cream)' }}>
                  {c.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
