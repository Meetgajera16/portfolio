interface SectionHeaderProps {
  tag: string
  title: string
  highlight: string
}

export default function SectionHeader({ tag, title, highlight }: SectionHeaderProps) {
  return (
    <div className="reveal mb-14">
      <p
        className="text-xs font-semibold tracking-[0.22em] uppercase mb-2"
        style={{ color: 'var(--gold)' }}
      >
        {tag}
      </p>
      <h2
        className="font-display text-4xl md:text-5xl font-bold leading-tight"
        style={{ color: 'var(--cream)' }}
      >
        {title}{' '}
        <span className="text-gradient">{highlight}</span>
      </h2>
      <div
        className="mt-4 h-[3px] w-12 rounded-full"
        style={{ background: 'var(--gold)' }}
      />
    </div>
  )
}
