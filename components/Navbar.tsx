'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 130 && rect.bottom > 130) {
          setActive(section.id)
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-2xl font-black tracking-wide text-[#D4AF37] transition hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          MG.
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1)

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-[0.22em] transition duration-200 ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#8AA0BC] hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-sm border border-[#D4AF37]/70 bg-[#D4AF37]/90 px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-black transition duration-200 hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.28)] md:inline-flex"
        >
          Hire Me
        </a>

        {/* Mobile button */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-[#D4AF37] transition ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#D4AF37] transition ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#D4AF37] transition ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#050816]/95 px-6 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-[0.22em] text-[#EDE8DD] transition hover:text-[#D4AF37]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              className="mt-2 rounded-sm bg-[#D4AF37] px-5 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-black"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}