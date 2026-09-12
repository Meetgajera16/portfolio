'use client'

import { useState } from 'react'
import { projects } from '@/lib/data'

export default function Projects() {
  const [active, setActive] = useState(0)
  const project = projects[active]

  return (
    <section id="projects" className="relative z-10 min-h-screen px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#D4AF37]">
            Major Stars
          </p>
          <h2 className="font-display text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.9] text-[#EDE8DD]">
            Featured <span className="text-[#D4AF37]">Projects</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg font-light leading-8 text-[#8AA0BC]">
            Select a star to reveal the project details. The strongest data science and AI projects are placed first.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {projects.map((p, index) => (
              <button
                key={p.number}
                onClick={() => setActive(index)}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                  active === index
                    ? 'border-[#D4AF37]/55 bg-[#D4AF37]/10'
                    : 'border-white/10 bg-[#050816]/45 hover:border-white/25'
                }`}
              >
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.24em] text-[#D4AF37]">
                  Star {p.number}
                </p>
                <h3 className="text-base font-bold text-[#EDE8DD]">{p.title}</h3>
              </button>
            ))}
          </div>

          <article className="rounded-3xl border border-white/10 bg-[#050816]/65 p-7 backdrop-blur-md">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4AF37]">
                Project Star {project.number}
              </p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-[#8AA0BC]">
                {project.period}
              </span>
            </div>

            <h3 className="font-display text-4xl font-black leading-tight text-[#EDE8DD] md:text-5xl">
              {project.title}
            </h3>

            <div className="my-6 inline-flex rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#D4AF37]">
              ✦ {project.metric}
            </div>

            <p className="text-sm font-light leading-7 text-[#8AA0BC] md:text-base">
              {project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#8AA0BC]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6">
              {'github' in project && project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-[#D4AF37] px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-black">
                  GitHub
                </a>
              )}
              <a href="#contact" className="rounded-sm border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#EDE8DD] hover:border-[#D4AF37]/60 hover:text-[#D4AF37]">
                Discuss
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
