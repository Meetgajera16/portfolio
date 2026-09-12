'use client'

import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { personalInfo } from '@/lib/data'

const cards = [
  { icon: '🎓', label: 'Degree', value: 'MS Data Science — Stevens Institute of Technology' },
  { icon: '📊', label: 'GPA', value: '3.451 / 4.0' },
  { icon: '📍', label: 'Location', value: 'New Jersey, USA' },
  { icon: '📅', label: 'Graduation', value: 'Expected May 2027' },
  { icon: '🔍', label: 'Focus', value: 'AI · Analytics · ML Systems' },
  { icon: '🚀', label: 'Status', value: 'Open to Internships & Full-Time' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        }),
      { threshold: 0.08 }
    )

    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="section-shell"
    >
      <SectionHeader tag="Who I Am" title="About" highlight="Me" />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* Main story card */}
        <div className="reveal blackhole-card rounded-2xl p-7 md:p-9">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            Entering the orbit
          </p>

          <div className="space-y-5">
            {personalInfo.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-base font-light leading-8 text-[#8AA0BC]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-sm bg-[#D4AF37] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(212,175,55,0.28)]"
            >
              Email Me
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#EDE8DD] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              LinkedIn
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8AA0BC] transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={card.label}
              className={`reveal delay-${(index % 5) + 1} blackhole-card blackhole-card-hover rounded-2xl p-5`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl">
                {card.icon}
              </div>

              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                {card.label}
              </p>

              <p className="text-sm font-medium leading-6 text-[#EDE8DD]">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}