import { trackClick } from '@/services/analytics'

export function CrmCtaBanner() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackClick('crm_access_click', 'home_banner')

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Fallback navigation if contact section is on another page
      window.location.href = '/#contact'
    }
  }

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-accent/10 border-y border-accent/20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            Próximo Passo
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Pronto para substituir o feeling por evidência?
          </h2>
        </div>
        <a
          href="#contact"
          onClick={handleClick}
          className="bg-white text-black px-8 py-4 font-display font-bold whitespace-nowrap transition-colors duration-300 hover:bg-accent hover:text-white inline-flex items-center gap-2"
        >
          Agendar Diagnóstico &rarr;
        </a>
      </div>
    </section>
  )
}
