'use client'

import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { experience } from '@/lib/data'

export default function Experience() {
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
    <section id="experience" ref={ref} className="section-shell">
      <SectionHeader tag="Work History" title="Professional" highlight="Experience" />

      <div className="relative">
        {/* vertical orbit line */}
        <div className="absolute left-4 top-2 hidden h-full w-px bg-gradient-to-b from-[#D4AF37] via-white/10 to-transparent md:block" />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <article
              key={`${exp.company}-${exp.role}`}
              className={`reveal delay-${(index % 5) + 1} relative md:pl-14`}
            >
              {/* orbit node */}
              <div className="absolute left-[10px] top-7 hidden h-3 w-3 rounded-full bg-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.55)] md:block" />

              <div className="blackhole-card blackhole-card-hover rounded-2xl p-7 md:p-8">
                <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                      Experience Node
                    </p>

                    <h3 className="font-display text-3xl font-black leading-tight text-[#EDE8DD]">
                      {exp.role}
                    </h3>

                    <p className="mt-2 text-sm text-[#8AA0BC]">
                      {exp.company} · {exp.location}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-[#8AA0BC]">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex gap-3 text-sm font-light leading-7 text-[#8AA0BC]"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}