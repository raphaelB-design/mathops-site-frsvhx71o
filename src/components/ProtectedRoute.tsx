import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

interface ProtectedRouteProps {
  children: ReactNode
}

// Enquanto a sessão do Supabase é restaurada, não redireciona (evita falso negativo).
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen w-full bg-background" />
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
