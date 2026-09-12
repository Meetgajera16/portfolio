'use client'

import { skills } from '@/lib/data'

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 min-h-screen px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#D4AF37]">
            Skill Constellations
          </p>
          <h2 className="font-display text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.9] text-[#EDE8DD]">
            Technical <span className="text-[#D4AF37]">Stars</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg font-light leading-8 text-[#8AA0BC]">
            Skills are shown like constellations around the void: each cluster connects to the systems and projects I build.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((cat) => (
            <div key={cat.category} className="rounded-3xl border border-white/10 bg-[#050816]/55 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl">
                  {cat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37]">Cluster</p>
                  <h3 className="text-xl font-bold text-[#EDE8DD]">{cat.category}</h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-[#8AA0BC]">
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
