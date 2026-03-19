'use client'
import { useEffect, useRef } from 'react'
import { personalInfo, stats } from '@/lib/data'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll('[data-anim]')
    items?.forEach((el, i) => {
      ;(el as HTMLElement).style.animationDelay = `${0.2 + i * 0.18}s`
      el.classList.add('anim-ready')
    })
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24 pt-24 pb-16"
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(180,145,48,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 9s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[5%] left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22,43,71,0.9) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'pulse 12s ease-in-out infinite reverse',
        }}
      />

      {/* Grid accent lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl">
        <p
          data-anim
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 opacity-0"
          style={{ color: 'var(--gold)', animation: 'fadeUp 0.7s ease forwards' }}
        >
          Data Science · Analytics · Machine Learning
        </p>

        <h1
          data-anim
          className="font-display font-black leading-[0.95] mb-6 opacity-0"
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            color: 'var(--cream)',
            animation: 'fadeUp 0.7s ease forwards',
          }}
        >
          Meet<br />
          <span className="text-gradient">Gajera</span>
        </h1>

        <p
          data-anim
          className="text-base md:text-xl font-light max-w-xl mb-10 leading-relaxed opacity-0"
          style={{ color: 'var(--muted)', animation: 'fadeUp 0.7s ease forwards' }}
        >
          Graduate student at{' '}
          <span style={{ color: 'var(--cream)' }}>Stevens Institute of Technology</span>
          {' '}— turning data into decisions through analytics, ML pipelines, and strategic dashboards.
        </p>

        <div
          data-anim
          className="flex flex-wrap gap-4 mb-16 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease forwards' }}
        >
          <a
            href="#projects"
            className="px-7 py-3 text-sm font-semibold tracking-wide uppercase rounded-sm transition-all duration-200 hover:-translate-y-1"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-7 py-3 text-sm font-semibold tracking-wide uppercase rounded-sm transition-all duration-200 hover:-translate-y-1"
            style={{
              border: '1.5px solid var(--gold)',
              color: 'var(--gold)',
            }}
          >
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-7 py-3 text-sm font-semibold tracking-wide uppercase rounded-sm transition-all duration-200 hover:-translate-y-1"
            style={{
              border: '1.5px solid rgba(90,114,144,0.4)',
              color: 'var(--muted)',
            }}
          >
            Download CV
          </a>
        </div>

        {/* Stats */}
        <div
          data-anim
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 opacity-0"
          style={{
            borderTop: '1px solid var(--border)',
            animation: 'fadeUp 0.7s ease forwards',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-display text-4xl font-bold"
                style={{ color: 'var(--gold-light)' }}
              >
                {s.value}
              </div>
              <div
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: 'var(--muted)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          Scroll
        </span>
        <div
          className="w-[1px] h-12 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
        />
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </section>
  )
}
