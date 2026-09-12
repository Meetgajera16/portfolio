'use client'

import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { education } from '@/lib/data'

const gradeColor: Record<string, string> = {
  A: '#4ade80',
  'A−': '#86efac',
  'B+': '#D4AF37',
  B: '#facc15',
}

export default function Education() {
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
    <section id="education" ref={ref} className="section-shell">
      <SectionHeader tag="Academic Record" title="My" highlight="Education" />

      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((edu, index) => (
          <article
            key={edu.institution}
            className={`reveal delay-${(index % 5) + 1} blackhole-card blackhole-card-hover overflow-hidden rounded-2xl`}
          >
            <div className="border-b border-white/10 bg-white/[0.025] p-7">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                    Academic Orbit
                  </p>

                  <h3 className="font-display text-3xl font-black leading-tight text-[#EDE8DD]">
                    {edu.degree}
                  </h3>
                </div>

                <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-bold text-[#D4AF37]">
                  {edu.status}
                </span>
              </div>

              <p className="text-sm font-medium text-[#EDE8DD]">
                {edu.institution}
              </p>

              <p className="mt-1 text-sm text-[#8AA0BC]">
                {edu.location} · {edu.period}
              </p>
            </div>

            <div className="p-7">
              {edu.gpa && (
                <div className="mb-6 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                  GPA {edu.gpa}
                </div>
              )}

              {edu.courses.length > 0 && (
                <div>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8AA0BC]">
                    Coursework
                  </p>

                  <div className="space-y-2">
                    {edu.courses.map((course) => (
                      <div
                        key={course.code}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"
                      >
                        <div>
                          <p className="text-xs font-bold tracking-wide text-[#D4AF37]">
                            {course.code}
                          </p>
                          <p className="mt-1 text-sm text-[#8AA0BC]">
                            {course.name}
                          </p>
                        </div>

                        <span
                          className="shrink-0 text-sm font-black"
                          style={{ color: gradeColor[course.grade] ?? '#EDE8DD' }}
                        >
                          {course.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}