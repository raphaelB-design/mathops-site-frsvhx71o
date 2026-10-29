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
  const { consent, isPreferencesOpen, closePreferences, savePreferences } = useConsent()

  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // Sincroniza estado com o consentimento atual quando abrir
  useEffect(() => {
    if (isPreferencesOpen) {
      setAnalytics(Boolean(consent?.preferences?.analytics))
      setMarketing(Boolean(consent?.preferences?.marketing))
    }
  }, [isPreferencesOpen, consent])

  const handleSave = () => {
    savePreferences({ analytics, marketing })
  }

  return (
    <Dialog open={isPreferencesOpen} onOpenChange={(open) => !open && closePreferences()}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-xl p-6 sm:p-7">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2.5 text-blue-400">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
              Preferências de Privacidade
            </span>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-white font-sans">
            Gerenciar cookies e privacidade
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400 leading-relaxed font-sans">
            Você tem total controle sobre como seus dados anônimos de navegação são tratados.
            Defina abaixo suas escolhas de acordo com suas preferências.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2 max-h-[60vh] overflow-y-auto pr-1">
          {/* Categoria 1: Necessários */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cookies Necessários</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Sempre ativos
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fundamentais para navegação segura, integridade do site e memorização das suas
              opções de consentimento. Não realizam rastreamento comercial nem coletam dados pessoais.
            </p>
          </div>

          {/* Categoria 2: Analíticos */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Analítico</span>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                aria-label="Ativar cookies analíticos"
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Métricas estritamente internas e anônimas sobre páginas acessadas, dispositivo e tempo de navegação.
              Geram identificadores aleatórios sem qualquer associação com seu nome, IP ou dados pessoais.
            </p>
          </div>

          {/* Categoria 3: Marketing */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm text-zinc-200">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Marketing (remarketing)</span>
              </div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Ativar cookies de marketing"
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Permite a exibição eventual de comunicações relevantes em redes e canais externos.
              Atualmente a MathOps não carrega scripts de terceiros nem parceiros de mídia sem a sua
              autorização.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-white/5">
          <button
            type="button"
            onClick={closePreferences}
            className="w-full sm:w-auto px-4 py-2.5 rounded-sm border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors shadow-sm"
          >
            Salvar preferências
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
