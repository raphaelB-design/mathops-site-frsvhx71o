const words = [
  'Lean Six Sigma',
  'Modelagem Preditiva',
  'Análise Prescritiva',
  'Process Mining',
  'Data Science',
  'Inteligência Artificial',
  'Pesquisa Operacional',
  'Automação RPA',
  'Business Intelligence',
]

export function Marquee() {
  return (
    <div className="w-full py-6 border-y border-white/10 bg-white/5 overflow-hidden flex items-center relative z-20">
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] hover:[animation-play-state:paused] w-max">
        {/* Double the list for infinite scroll illusion */}
        {[...words, ...words].map((word, idx) => (
          <span key={idx} className="flex items-center">
            <span className="font-display text-2xl md:text-3xl font-bold uppercase text-white/40 hover:text-accent transition-colors px-8 cursor-default">
              {word}
            </span>
            <span className="text-accent/50 text-xl">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
