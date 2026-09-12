import { personalInfo } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { label: 'LinkedIn', href: personalInfo.linkedin },
    { label: 'GitHub', href: personalInfo.github },
    { label: 'Email', href: `mailto:${personalInfo.email}` },
  ]

  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <a
          href="#hero"
          className="font-display text-2xl font-black tracking-wide text-[#D4AF37] transition hover:text-white"
        >
          MG.
        </a>

        <p className="text-center text-xs uppercase tracking-[0.22em] text-[#8AA0BC]">
          © {year}{' '}
          <span className="text-[#EDE8DD]">{personalInfo.name}</span>
          {' '}· Built inside a black-hole inspired interface
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#8AA0BC] transition hover:text-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}