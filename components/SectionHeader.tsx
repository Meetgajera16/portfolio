interface SectionHeaderProps {
  tag: string
  title: string
  highlight: string
}

export default function SectionHeader({ tag, title, highlight }: SectionHeaderProps) {
  return (
    <div className="reveal mb-14">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
        {tag}
      </p>

      <h2 className="font-display text-4xl font-black leading-tight text-[#EDE8DD] md:text-6xl">
        {title}{' '}
        <span className="bg-gradient-to-r from-[#fff6d7] via-[#D4AF37] to-[#8AA0BC] bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px w-14 bg-[#D4AF37]" />
        <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </div>
    </div>
  )
}