import { FadeIn } from '@/components/fade-in'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end pb-24 px-6 md:px-12 w-full overflow-hidden"
    >
      {/* Background Image with Grayscale Filter and Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img
          src="https://img.usecurling.com/p/1920/1080?q=law%20library&color=black"
          alt="Biblioteca Jurídica"
          className="w-full h-full object-cover grayscale opacity-80 scale-105 animate-float"
        />
      </div>

      <div className="relative z-20 max-w-7xl">
        <FadeIn delay={200}>
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground mb-6 md:mb-8">
            Advocacia Criminal · Desde 1991
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <h1 className="font-display text-5xl md:text-8xl lg:text-[9rem] uppercase leading-[0.9] tracking-tight text-white max-w-5xl text-shadow-sm">
            Defendemos quem a lei esquece
          </h1>
        </FadeIn>
      </div>
    </section>
  )
}
