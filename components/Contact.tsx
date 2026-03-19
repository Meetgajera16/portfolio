'use client'
import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { personalInfo } from '@/lib/data'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3500)
  }

  const contactLinks = [
    { icon: '✉️', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: '📞', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\D/g, '')}` },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/meetgajera', href: personalInfo.linkedin },
    { icon: '📍', label: 'Location', value: personalInfo.location, href: '#' },
  ]

  const inputStyle = {
    background: 'rgba(22,43,71,0.5)',
    border: '1px solid var(--border)',
    color: 'var(--cream)',
    outline: 'none',
    backdropFilter: 'blur(8px)',
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="section-divider mb-20" />
      <SectionHeader tag="Let's Talk" title="Get In" highlight="Touch" />

      <div className="grid md:grid-cols-5 gap-12 items-start">
        {/* Left — info */}
        <div className="md:col-span-2 space-y-8 reveal">
          <p className="text-base leading-8 font-light" style={{ color: '#8AA0BC' }}>
            I'm actively looking for Data Science, Analytics, and BI internship opportunities for
            Summer / Fall 2026. If you have a project or opening that aligns with my background,
            I'd love to connect.
          </p>

          <div className="space-y-3">
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                style={{
                  background: 'rgba(22,43,71,0.45)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="text-xl">{c.icon}</span>
                <div>
                  <div
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: 'var(--muted)' }}
                  >
                    {c.label}
                  </div>
                  <div
                    className="text-sm font-medium transition-colors group-hover:text-gold"
                    style={{ color: 'var(--cream)' }}
                  >
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form
          className="md:col-span-3 space-y-5 reveal delay-2"
          onSubmit={handleSubmit}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { key: 'name', label: 'Full Name', placeholder: 'Jane Smith', type: 'text' },
              { key: 'email', label: 'Email Address', placeholder: 'jane@company.com', type: 'email' },
            ].map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'var(--muted)' }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="px-4 py-3 rounded-sm text-sm font-light focus:border-gold transition-colors"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-[10px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Subject
            </label>
            <input
              type="text"
              placeholder="Internship Opportunity / Collaboration"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="px-4 py-3 rounded-sm text-sm font-light focus:border-gold transition-colors"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-[10px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Tell me about the role or project..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="px-4 py-3 rounded-sm text-sm font-light focus:border-gold transition-colors resize-y"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: sent ? 'rgba(74,222,128,0.2)' : 'var(--gold)',
              color: sent ? '#4ade80' : 'var(--navy)',
              border: sent ? '1px solid rgba(74,222,128,0.4)' : 'none',
            }}
          >
            {sent ? '✓ Message Sent!' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  )
}
