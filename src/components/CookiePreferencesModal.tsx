import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useConsent } from '@/hooks/use-consent'
import { ShieldCheck, BarChart3, Target } from 'lucide-react'

export function CookiePreferencesModal() {
  const {
    consent,
    isUndecided,
    isPreferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useConsent()

  // Default para categorias opcionais quando o usuário abre para fazer escolha explícita: OFF
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // Sincroniza estado com o consentimento atual quando abrir
  useEffect(() => {
    if (isPreferencesOpen) {
      if (consent) {
        setAnalytics(Boolean(consent.preferences?.analytics))
        setMarketing(Boolean(consent.preferences?.marketing))
      } else {
        // Se ainda não havia escolha prévia (undecided), defaults explícitos das opcionais são OFF
        setAnalytics(false)
        setMarketing(false)
      }
    }
  }, [isPreferencesOpen, consent])

  const handleSave = () => {
    savePreferences({ analytics, marketing })
  }

  // Quando o visitante é indeciso, o modal não pode ser fechado por Escape nem clique fora se não gravar decisão.
  // Mas se for reaberto via rodapé (já com consentimento prévio), pode ser fechado livremente.
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (!isUndecided) {
        closePreferences()
      } else {
        // Se indeciso, fechar o painel de preferências retorna para a tela bloqueadora principal
        closePreferences()
      }
    }
  }

  return (
    <Dialog open={isPreferencesOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="bg-zinc-950/95 backdrop-blur-2xl border-white/10 text-white max-w-xl p-5 sm:p-7 z-[110]"
        onEscapeKeyDown={(e) => {
          if (isUndecided) {
            // Se indeciso, Escape volta para o banner principal em vez de fechar tudo e liberar o site sem decisão
            e.preventDefault()
            closePreferences()
          }
        }}
        onPointerDownOutside={(e) => {
          if (isUndecided) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2.5 text-blue-400">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
              Preferências de Privacidade
            </span>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-white font-sans">
            Gerenciar cookies e consentimento
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400 leading-relaxed font-sans">
            Abaixo você pode habilitar ou desabilitar cada categoria de consentimento. Suas escolhas
            são salvas no seu navegador e registradas de forma anônima para comprovação de
            conformidade com a LGPD.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3.5 my-2 max-h-[60vh] overflow-y-auto pr-1">
          {/* Categoria (a): Essencial - Padrão oficial ANPD / gov.br (badge 'Sempre ativo', sem toggle) */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cookies estritamente necessários (Essenciais)</span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                Sempre ativo
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Estes cookies são indispensáveis ao funcionamento do site e ativam recursos
              fundamentais, como segurança da infraestrutura, gerenciamento de rede, identificador
              anônimo de navegação e a gravação de suas preferências de privacidade (como esta
              própria escolha). Eles não podem ser desativados em nossos sistemas, embora você possa
              configurá-los ou bloqueá-los diretamente nas configurações do seu navegador — ciente
              de que isso poderá prejudicar ou impedir o correto funcionamento de partes do site.
            </p>
          </div>

          {/* Categoria (b): Estatística / medição anônima */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <BarChart3 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Cookies de estatística (Medição anônima)</span>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                aria-label="Ativar cookies de estatística"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coletam dados sobre o uso do site de forma agregada e anônima (páginas visitadas,
              tempo de navegação e categoria de dispositivo), permitindo compreender a audiência e
              melhorar a experiência de navegação. Caso você desative esta categoria, suas visitas
              não serão contabilizadas em nossas métricas estatísticas internas.
            </p>
          </div>

          {/* Categoria (c): Marketing / remarketing */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <Target className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Cookies de marketing</span>
              </div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Ativar cookies de marketing"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Utilizados para registrar a interação do visitante e possibilitar a exibição de
              anúncios ou conteúdos relevantes por parceiros em campanhas futuras. No momento, o
              site não carrega nenhum pixel ou rastreador de terceiros; a ativação serve
              exclusivamente para registrar seu consentimento prévio caso tais campanhas sejam
              iniciadas.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-2.5 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-sm border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-300 hover:text-red-200 transition-colors min-h-[36px]"
            >
              Recusar opcionais
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-sm border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors min-h-[36px]"
            >
              Aceitar todos
            </button>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={closePreferences}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-sm border border-white/10 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors min-h-[36px]"
            >
              {isUndecided ? 'Voltar' : 'Cancelar'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors shadow-sm min-h-[36px]"
            >
              Salvar preferências
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
