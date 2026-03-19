import { personalInfo } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative py-10 px-6 md:px-16 text-center"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="font-display text-xl font-bold"
          style={{ color: 'var(--gold)' }}
        >
          MG.
        </span>

        <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          © {year}{' '}
          <span style={{ color: 'var(--gold)' }}>{personalInfo.name}</span>
          {' '}· New Jersey, USA
        </p>

        <div className="flex items-center gap-6">
          {[
            { label: 'LinkedIn', href: personalInfo.linkedin },
            { label: 'GitHub', href: personalInfo.github },
            { label: 'Email', href: `mailto:${personalInfo.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors hover:text-gold"
              style={{ color: 'var(--muted)' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
