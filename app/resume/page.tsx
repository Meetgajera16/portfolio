export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#02030a] px-6 py-16 text-[#EDE8DD] md:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-12">
        <p className="text-xs font-black uppercase tracking-[0.45em] text-[#D4AF37]">
          Recruiter Snapshot
        </p>
        <h1 className="mt-5 font-display text-5xl font-black leading-none text-[#F4EFE3] md:text-7xl">
          Meet Gajera
        </h1>
        <p className="mt-4 text-lg text-[#C9D6EA] md:text-2xl">
          MS Data Science Candidate · Analytics · Machine Learning · Data Systems
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            ['Core Skills', 'Python, SQL, Pandas, NumPy, Machine Learning, Tableau, Power BI, Excel, PySpark'],
            ['Focus', 'Turning messy data into decisions through analysis, modeling, and clear communication'],
            ['Experience', 'Data Analytics Intern · Course Assistant · Frontend Intern'],
            ['Strengths', 'Problem solving, teamwork, communication, creativity, analytical judgment'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#A8B7D4]">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://www.linkedin.com/in/meet-gajera-415333246/"
            target="_blank"
            rel="noreferrer"
            className="gravity-button"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Meetgajera16?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="gravity-button secondary"
          >
            GitHub
          </a>
          <a href="mailto:meetgajera16@gmail.com" className="gravity-button secondary">
            Email Me
          </a>
          <a href="/" className="gravity-button secondary">
            Back to Portfolio
          </a>
        </div>
      </div>
    </main>
  )
}
