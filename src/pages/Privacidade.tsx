import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'
import { Helmet } from '@/components/Helmet'
import { useConsent } from '@/hooks/use-consent'
import {
  ShieldCheck,
  EyeOff,
  SlidersHorizontal,
  Mail,
  CheckCircle2,
  Clock,
  Lock,
} from 'lucide-react'

export default function Privacidade() {
  const { openPreferences, consent, isAnalyticsAllowed, isMarketingAllowed } = useConsent()

  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24 pt-32">
      <Helmet>
        <title>Privacidade e Gestão de Cookies | MathOps Strategy</title>
        <meta
          name="description"
          content="Diretrizes de privacidade, política de cookies, conformidade com a LGPD e gestão transparente de consentimento da MathOps Strategy."
        />
        <link rel="canonical" href="https://www.mathops.com.br/privacidade" />
      </Helmet>

      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-col space-y-4 mb-12">
            <SlideUpMask>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Privacidade e Gestão de Cookies
              </h1>
            </SlideUpMask>
            <p className="text-zinc-400 font-sans text-base">
              Transparência completa sobre o tratamento de informações, medição anônima e autonomia
              do visitante, em estrita conformidade com a LGPD (Lei Geral de Proteção de Dados
              Pessoais — Lei nº 13.709/2018).
            </p>
            <Separator className="w-24 bg-accent/50 mt-8" />
          </div>

          {/* Painel do status atual de consentimento */}
          <div className="mb-12 p-6 rounded-lg bg-zinc-950/80 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Seu status atual de consentimento
                </h2>
                <p className="text-xs text-zinc-400">
                  {consent
                    ? `Opção registrada em ${new Date(consent.timestamp).toLocaleDateString('pt-BR')} às ${new Date(consent.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
                    : 'Nenhuma escolha formal registrada (medição anônima padrão ativa)'}
                </p>
              </div>

              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors self-start sm:self-auto shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Alterar preferências</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs border-t border-white/5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">
                  Essenciais: <strong className="text-white">Ativo</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isAnalyticsAllowed ? 'text-blue-400' : 'text-zinc-600'
                  }`}
                />
                <span className="text-zinc-300">
                  Estatística:{' '}
                  <strong className={isAnalyticsAllowed ? 'text-blue-400' : 'text-zinc-400'}>
                    {isAnalyticsAllowed ? 'Autorizado' : 'Não autorizado'}
                  </strong>
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
                  <strong className={isMarketingAllowed ? 'text-purple-400' : 'text-zinc-400'}>
                    {isMarketingAllowed ? 'Autorizado' : 'Não autorizado'}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-10 text-zinc-300 font-sans leading-relaxed text-sm">
            {/* Seção 1: Dados Coletados */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                1. Quais dados são coletados e finalidade
              </h2>
              <p>
                O site da MathOps Strategy opera com princípios de minimização estrita e privacidade
                por padrão. A coleta de navegação resume-se a parâmetros puramente técnicos e
                estatísticos:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
                <li>Endereço das páginas visitadas (ex.: /metodologia, /sobre);</li>
                <li>Categoria genérica do dispositivo (desktop ou dispositivo móvel);</li>
                <li>
                  Domínio de origem do referenciador externo (quando informado pelo navegador);
                </li>
                <li>
                  Identificador pseudoaleatório local gerado no navegador (UUID anônimo), sem
                  qualquer associação com nome, CPF, endereço IP de origem ou dados cadastrais.
                </li>
              </ul>
              <p className="text-zinc-400">
                <strong>Finalidade:</strong> Aprimorar o desempenho, a usabilidade e a arquitetura
                de conteúdo do site, medindo volume de acessos e padrões agregados de navegação.
              </p>
            </section>

            {/* Seção 2: Base Legal */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                2. Bases legais de tratamento (LGPD)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Cookies Essenciais</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Tratados sob a base do legítimo interesse e necessidade técnica para prover a
                    navegação segura, proteger a infraestrutura contra requisições maliciosas e
                    memorizar suas opções de consentimento.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Categorias Opcionais (Estatística e Marketing)</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Tratadas sob a base legal do{' '}
                    <strong>consentimento livre, informado e inequívoco</strong> (Art. 7º, I da
                    LGPD). Caso o usuário recuse a categoria Estatística, novas visitas não são
                    registradas.
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 3: Ausência de Pixels Atuais */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                3. Estrutura para pixels futuros e ausência de rastreamento de terceiros
              </h2>
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-zinc-200 text-sm font-semibold">
                  <EyeOff className="w-4 h-4 text-amber-400" />
                  <span>Sem pixels de terceiros ativos atualmente</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  O site da MathOps não possui nenhum pixel de marketing ou remarketing ativo no
                  momento. A categoria Marketing existe como estrutura de conformidade antecipada:
                  caso campanhas venham a ser adotadas no futuro, os respectivos scripts só serão
                  carregados para visitantes que tiverem fornecido consentimento explícito prévio.
                </p>
              </div>
            </section>

            {/* Seção 4: Formulários Institucionais */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                4. Dados fornecidos em formulários institucionais
              </h2>
              <p>
                Ao preencher formulários voluntariamente (solicitação de diagnóstico executivo ou
                envio de apresentação curricular), as informações compartilhadas (nome corporativo,
                e-mail institucional, descrição do desafio ou currículo anexado) destinam-se
                exclusivamente à análise da demanda e ao retorno institucional. Não comercializamos,
                não cedemos e não compartilhamos listas de contatos com terceiros.
              </p>
            </section>

            {/* Seção 5: Período de Retenção */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                5. Período de retenção e registros de consentimento
              </h2>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-zinc-400">
                  <p>
                    Os eventos estatísticos de visita são mantidos de forma agregada e anônima para
                    análise histórica de tráfego.
                  </p>
                  <p>
                    As escolhas de consentimento são gravadas com timestamp e versão de política em
                    nosso banco de dados para comprovação de conformidade perante os órgãos
                    reguladores, sem vínculo com identidades civis.
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 6: Como Revogar */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                6. Como revogar ou alterar sua escolha a qualquer momento
              </h2>
              <p>
                Você pode revisar ou revogar seu consentimento a qualquer instante, sem qualquer
                prejuízo à navegação no site. Para isso, basta utilizar o botão abaixo ou clicar no
                link <strong>Cookies e Privacidade</strong> localizado no rodapé de todas as
                páginas:
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Abrir painel de preferências de cookies</span>
                </button>
              </div>
            </section>

            {/* Seção 7: Contato do Responsável */}
            <section className="space-y-3 pt-4 border-t border-white/10">
              <h2 className="text-xl font-bold text-white tracking-tight">
                7. Contato do responsável pelo tratamento
              </h2>
              <p>
                Para exercer seus direitos de titular previstos na LGPD (confirmação, acesso,
                correção ou esclarecimentos), entre em contato com o canal institucional da MathOps:
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
              <p className="text-xs text-zinc-500 pt-1">
                Avenida Brigadeiro Faria Lima, 1811 — São Paulo/SP
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
