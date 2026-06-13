import { FadeIn } from '@/components/fade-in'

const team = [
  {
    name: 'Roberto Vargas',
    role: 'Sócio Fundador',
    image: 'https://img.usecurling.com/ppl/large?gender=male&seed=81',
    bio: 'Mais de 30 anos de atuação exclusiva perante a Suprema Corte brasileira, reconhecido pela precisão técnica em litígios complexos.',
  },
  {
    name: 'Helena Parentoni',
    role: 'Sócia Diretora',
    image: 'https://img.usecurling.com/ppl/large?gender=female&seed=42',
    bio: 'Especialista em penal econômico, com formação pela Sorbonne. Lidera a estruturação de teses defensivas corporativas.',
  },
]

export function Team() {
  return (
    <section id="team" className="py-[120px] px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16">
          003 · Sócios
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {team.map((person, index) => (
          <FadeIn key={person.name} delay={index * 200}>
            <div className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-smooth"
                />
              </div>

              <div className="mt-8 flex flex-col">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {person.role}
                </p>
                <h3 className="font-display text-4xl md:text-5xl text-white mb-4">{person.name}</h3>
                <p className="font-body text-xl text-muted leading-relaxed max-w-md">
                  {person.bio}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
