'use client'

import { personalInfo, stats } from '@/lib/data'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-6 pt-28 md:px-16 lg:px-24">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#02030a] via-[#02030a]/85 to-transparent" />

      <div className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-[#D4AF37]">
            Data Science · Analytics · Machine Learning
          </p>

          <h1 className="font-display text-[clamp(5rem,11vw,10rem)] font-black leading-[0.86] text-[#EDE8DD]">
            Meet
            <br />
            <span className="text-[#D4AF37]">Gajera</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base font-light leading-8 text-[#8AA0BC] md:text-xl">
            Graduate student at{' '}
            <span className="font-semibold text-[#EDE8DD]">Stevens Institute of Technology</span>{' '}
            building data-driven systems, machine learning pipelines, and analytics dashboards that turn information into action.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-sm bg-[#D4AF37] px-7 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:-translate-y-1 hover:shadow-[0_0_26px_rgba(212,175,55,0.28)]">
              View My Work
            </a>
            <a href="#contact" className="rounded-sm border border-[#D4AF37]/80 px-7 py-3 text-sm font-black uppercase tracking-wide text-[#D4AF37] transition hover:-translate-y-1 hover:bg-[#D4AF37]/10">
              Get In Touch
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded-sm border border-white/15 px-7 py-3 text-sm font-black uppercase tracking-wide text-[#8AA0BC] transition hover:-translate-y-1 hover:border-white/40 hover:text-white">
              Download CV
            </a>
          </div>

          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-black text-[#D4AF37]">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#8AA0BC]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8AA0BC]/75">Scroll deeper</p>
        <div className="mx-auto mt-3 h-14 w-px bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </section>
  )
}
