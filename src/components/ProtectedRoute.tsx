import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

interface ProtectedRouteProps {
  children: ReactNode
}

// Marcador secreto de acesso via hash. A página /estatisticas mostra o
// formulário de login quando aberta com este hash (ex.: /estatisticas#acesso).
// Não referencie este valor em nenhuma outra parte do site.
const SECRET_ACCESS_HASH = '#acesso'

// Enquanto a sessão do Supabase é restaurada, não redireciona (evita falso negativo).
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen w-full bg-background" />
  }

  // Com o marcador secreto na URL, renderiza a página mesmo sem sessão:
  // a própria página /estatisticas exibe o formulário de login embutido.
  if (!user && window.location.hash === SECRET_ACCESS_HASH) {
    return <>{children}</>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
