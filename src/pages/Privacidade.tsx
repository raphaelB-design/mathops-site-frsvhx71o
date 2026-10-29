import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'
import { Helmet } from '@/components/Helmet'
import { useConsent } from '@/hooks/use-consent'
import { ShieldCheck, EyeOff, SlidersHorizontal, Mail, CheckCircle2 } from 'lucide-react'

export default function Privacidade() {
  const { openPreferences, consent, isAnalyticsAllowed, isMarketingAllowed } = useConsent()

  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24 pt-32">
      <Helmet>
        <title>Privacidade e Cookies | MathOps Strategy</title>
        <meta
          name="description"
          content="Conheça a estrutura de privacidade, uso de cookies e compromisso LGPD da MathOps Strategy."
        />
        <link rel="canonical" href="https://www.mathops.com.br/privacidade" />
      </Helmet>

      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-col space-y-4 mb-12">
            <SlideUpMask>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Privacidade e Cookies
              </h1>
            </SlideUpMask>
            <p className="text-zinc-400 font-sans text-base">
              Transparência integral sobre como tratamos seus dados e respeitamos sua autonomia,
              em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>
            <Separator className="w-24 bg-accent/50 mt-8" />
          </div>

          {/* Card de Gestão Rápida */}
          <div className="mb-12 p-6 rounded-lg bg-zinc-950/80 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Seu status atual de consentimento
                </h2>
                <p className="text-xs text-zinc-400">
                  {consent
                    ? `Decisão salva em ${new Date(consent.timestamp).toLocaleDateString('pt-BR')}`
                    : 'Nenhuma decisão registrada até o momento'}
                </p>
              </div>

              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors self-start sm:self-auto"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Alterar preferências</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-white/5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Essenciais: <strong>Ativo</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isAnalyticsAllowed ? 'text-blue-400' : 'text-zinc-600'
                  }`}
                />
                <span className="text-zinc-300">
                  Analítico:{' '}
                  <strong>{isAnalyticsAllowed ? 'Autorizado' : 'Não autorizado'}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isMarketingAllowed ? 'text-purple-400' : 'text-zinc-600'
                  }`}
                />
                <span className="text-zinc-300">
                  Marketing:{' '}
                  <strong>{isMarketingAllowed ? 'Autorizado' : 'Não autorizado'}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-10 text-zinc-300 font-sans leading-relaxed text-sm">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                1. O que é coletado (apenas com seu consentimento analítico)
              </h2>
              <p>
                Quando você aceita a categoria <strong>Analítico</strong>, nosso site registra
                exclusivamente dados anônimos de navegação:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
                <li>Endereço da página acessada (ex.: /sobre, /metodologia);</li>
                <li>Tipo genérico de dispositivo (desktop ou dispositivo móvel);</li>
                <li>Origem anônima do referenciador externo (quando disponível);</li>
                <li>
                  Um identificador pseudoaleatório gerado no próprio navegador (ex.: UUID local),
                  sem correlação com identidade civil, endereço IP ou dados de cadastro.
                </li>
              </ul>
              <p className="text-xs text-zinc-400">
                Se você recusar ou ainda não tiver respondido ao aviso de cookies,{' '}
                <strong>nenhuma linha ou evento de visita é gravado</strong> em nosso banco de dados.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                2. O que NÃO é coletado sem consentimento de marketing
              </h2>
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-zinc-200 text-sm font-semibold">
                  <EyeOff className="w-4 h-4 text-amber-400" />
                  <span>Ausência de pixels e rastreadores de terceiros</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sem a sua escolha explícita na categoria Marketing, não carregamos ferramentas de
                  remarketing ou pixels de redes sociais (como Meta, Google Ads ou LinkedIn). Seus
                  hábitos de navegação não são compartilhados com empresas de publicidade.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                3. Formulários de contato e seleção
              </h2>
              <p>
                Quando você preenche voluntariamente nossos formulários institucionais (como
                solicitação de diagnóstico executivo ou envio de apresentação curricular), as
                informações fornecidas (nome corporativo, e-mail de contato, mensagem ou arquivo de
                currículo) são utilizadas estritamente para o atendimento da sua solicitação. Não
                comercializamos nem cedemos contatos a terceiros.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                4. Como alterar ou revogar sua escolha a qualquer momento
              </h2>
              <p>
                A sua decisão não é definitiva. A qualquer momento, você pode abrir o painel de
                preferências clicando no botão abaixo ou no link <strong>Privacidade e cookies</strong>{' '}
                sempre presente no rodapé de todas as páginas do site.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Abrir painel de preferências de cookies</span>
                </button>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                5. Seus direitos sob a LGPD
              </h2>
              <p>
                A Lei Geral de Proteção de Dados garante a você a confirmação da existência de
                tratamento, o acesso aos dados, a correção de dados incompletos ou inexatos, a
                eliminação de informações tratadas com consentimento e a revogação facilitada.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">
                6. Canal de contato do encarregado de dados
              </h2>
              <p>
                Para dúvidas, requisições de titulares ou informações adicionais sobre esta
                estrutura de governança, nosso canal direto está à disposição:
              </p>
              <div className="flex items-center gap-2 text-white font-mono text-sm pt-1">
                <Mail className="w-4 h-4 text-blue-400" />
                <a
                  href="mailto:contato@mathops.com.br"
                  className="hover:underline hover:text-blue-400 transition-colors"
                >
                  contato@mathops.com.br
                </a>
              </div>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
