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
  const { consent, isPreferencesOpen, closePreferences, savePreferences, acceptAll, rejectAll } =
    useConsent()

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

  return (
    <Dialog open={isPreferencesOpen} onOpenChange={(open) => !open && closePreferences()}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-xl p-5 sm:p-7">
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
          {/* Categoria (a): Essencial */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Essencial (Necessários)</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                Sempre ativo
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Necessários para o funcionamento seguro e estável do site, incluindo memorização das
              suas preferências de privacidade e proteção contra ataques. Não podem ser desligados e
              não armazenam dados pessoais identificáveis.
            </p>
          </div>

          {/* Categoria (b): Estatística / medição anônima */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <BarChart3 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Estatística e medição anônima</span>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                aria-label="Ativar estatística e medição anônima"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coleta interna própria e anônima de métricas de navegação (páginas acessadas,
              dispositivo móvel/desktop, tempo). Se desativado, novas visitas do seu navegador não
              serão contabilizadas nas estatísticas do site.
            </p>
          </div>

          {/* Categoria (c): Marketing / remarketing */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <Target className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Marketing e remarketing</span>
              </div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Ativar marketing e remarketing"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reservado para futuras campanhas em canais parceiros. Hoje, o site não carrega nenhum
              pixel ou rastreador de terceiros; ativar esta opção apenas registra sua autorização
              para quando tags forem implementadas.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-2 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 sm:flex-none px-3 py-2 rounded-sm border border-white/10 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Recusar todos
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 sm:flex-none px-3 py-2 rounded-sm border border-white/10 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Aceitar todos
            </button>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={closePreferences}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-sm border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors shadow-sm"
            >
              Salvar preferências
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
