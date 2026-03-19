'use client'
import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { education } from '@/lib/data'

const gradeColor: Record<string, string> = {
  A: '#4ade80',
  'A−': '#86efac',
  'B+': '#D4AE52',
  B: '#facc15',
}

export default function Education() {
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
      id="education"
      ref={ref}
      className="relative py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="section-divider mb-20" />
      <SectionHeader tag="Academic Record" title="My" highlight="Education" />

      <div className="grid md:grid-cols-2 gap-8">
        {education.map((edu, i) => (
          <div
            key={edu.institution}
            className={`reveal delay-${i + 1} rounded-xl overflow-hidden`}
            style={{
              background: 'rgba(22,43,71,0.45)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Card header strip */}
            <div
              className="px-6 py-4"
              style={{ background: 'rgba(180,145,48,0.08)', borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-1"
                    style={{ color: 'var(--gold)' }}
                  >
                    {edu.period}
                  </p>
                  <h3
                    className="font-display text-xl font-bold leading-tight"
                    style={{ color: 'var(--cream)' }}
                  >
                    {edu.degree}
                  </h3>
                </div>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm flex-shrink-0 mt-1"
                  style={{
                    background: edu.status === 'Active' ? 'rgba(74,222,128,0.12)' : 'rgba(180,145,48,0.12)',
                    color: edu.status === 'Active' ? '#4ade80' : 'var(--gold)',
                    border: edu.status === 'Active' ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(180,145,48,0.25)',
                  }}
                >
                  {edu.status}
                </span>
              </div>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--cream)' }}>
                {edu.institution}
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                📍 {edu.location}
              </p>

              {edu.gpa && (
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="px-3 py-1.5 rounded-sm"
                    style={{
                      background: 'rgba(74,222,128,0.08)',
                      border: '1px solid rgba(74,222,128,0.2)',
                    }}
                  >
                    <span className="text-xs font-bold tracking-wide" style={{ color: '#4ade80' }}>
                      GPA {edu.gpa}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    Fall 2025 Semester
                  </span>
                </div>
              )}

              {/* Transcript courses */}
              {edu.courses.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3"
                    style={{ color: 'var(--muted)' }}
                  >
                    Fall 2025 Coursework
                  </p>
                  <div className="space-y-2">
                    {edu.courses.map((course) => (
                      <div
                        key={course.code}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-sm"
                        style={{ background: 'rgba(8,19,31,0.5)' }}
                      >
                        <div>
                          <span
                            className="text-[10px] font-bold tracking-wide mr-2"
                            style={{ color: 'var(--gold)' }}
                          >
                            {course.code}
                          </span>
                          <span className="text-xs" style={{ color: '#8AA0BC' }}>
                            {course.name}
                          </span>
                        </div>
                        <span
                          className="text-xs font-bold flex-shrink-0"
                          style={{ color: gradeColor[course.grade] ?? 'var(--cream)' }}
                        >
                          {course.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
