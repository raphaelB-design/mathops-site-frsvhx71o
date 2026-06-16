import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LogOut, FileText, UserCircle, Briefcase, Activity } from 'lucide-react'
import { Loader2 } from 'lucide-react'

export default function Dashboard() {
  const { session, loading, signOut, user } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight mb-2">Área do Cliente</h1>
            <p className="text-muted-foreground font-body">Bem-vindo(a), {user?.email}</p>
          </div>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
            <Activity className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl font-bold mb-2">Métricas de Projeto</h3>
            <p className="text-muted-foreground text-sm font-body">
              Acompanhe os KPIs e o ROI das iniciativas em andamento.
            </p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
            <FileText className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl font-bold mb-2">Relatórios Executivos</h3>
            <p className="text-muted-foreground text-sm font-body">
              Acesse os memorandos e relatórios de auditoria de processos.
            </p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
            <Briefcase className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl font-bold mb-2">Casos Concluídos</h3>
            <p className="text-muted-foreground text-sm font-body">
              Histórico de projetos entregues e documentação final.
            </p>
          </div>
        </div>

        <section className="mt-16 bg-white/5 border border-white/10 rounded-lg p-8">
          <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
            <UserCircle className="w-12 h-12 text-muted-foreground" />
            <div>
              <h2 className="font-display text-2xl font-bold">Perfil da Empresa</h2>
              <p className="text-muted-foreground font-body text-sm">
                Informações confidenciais e contratos ativos
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Status
                </p>
                <p className="font-body text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Ativo - Suporte Premium
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Próxima Revisão
                </p>
                <p className="font-body text-sm">15 de Novembro, 2026</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
