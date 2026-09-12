'use client'

import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { personalInfo } from '@/lib/data'

export default function Contact() {
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

  const contactLinks = [
    {
      icon: '✉️',
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect professionally',
      href: personalInfo.linkedin,
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'View my repositories',
      href: personalInfo.github,
    },
    {
      icon: '📍',
      label: 'Location',
      value: personalInfo.location,
      href: '#',
    },
  ]

  return (
    <section id="contact" ref={ref} className="section-shell">
      <SectionHeader tag="Let’s Connect" title="Get In" highlight="Touch" />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal blackhole-card rounded-2xl p-7 md:p-9">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            Final Signal
          </p>

          <h3 className="font-display text-4xl font-black leading-tight text-[#EDE8DD]">
            Interested in working together?
          </h3>

          <p className="mt-5 text-base font-light leading-8 text-[#8AA0BC]">
            I am actively looking for Data Science, Machine Learning, Analytics,
            and AI-focused internship opportunities. If my projects align with
            your team or role, I would be happy to connect.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-sm bg-[#D4AF37] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(212,175,55,0.28)]"
            >
              Send Email
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#EDE8DD] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactLinks.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`reveal delay-${(index % 5) + 1} blackhole-card blackhole-card-hover rounded-2xl p-6`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl">
                {item.icon}
              </div>

              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                {item.label}
              </p>

              <p className="text-sm font-medium leading-6 text-[#EDE8DD]">
                {item.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}