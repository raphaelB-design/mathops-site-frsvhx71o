import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const { session, loading, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) throw error
        navigate('/dashboard')
      } else {
        // Verify via frontend first (provides better UX, but backend trigger is still enforcing)
        const { data: authorizedUser, error: checkError } = await supabase
          .from('authorized_users')
          .select('email')
          .eq('email', email)
          .maybeSingle()

        if (checkError) throw checkError

        if (!authorizedUser) {
          toast({
            variant: 'destructive',
            title: 'Acesso Negado',
            description:
              'Este e-mail não está pré-autorizado para acesso. Entre em contato com a equipe MathOps.',
          })
          setIsLoading(false)
          return
        }

        const { error } = await signUp(email, password)
        if (error) throw error
        toast({
          title: 'Cadastro realizado',
          description: 'Verifique seu e-mail para confirmar o cadastro.',
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: error.message || 'Ocorreu um erro inesperado.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: error.message,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col justify-center items-center p-6 pt-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl tracking-tight mb-2">
            Área do Cliente<span className="text-accent">.</span>
          </h2>
          <p className="text-muted-foreground font-body">
            {isLogin
              ? 'Faça login para acessar seu dashboard exclusivo.'
              : 'Crie sua conta para acessar a área restrita.'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-white/20 focus:border-accent font-body"
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-white/20 focus:border-accent font-body"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full font-bold bg-white text-black hover:bg-accent hover:text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono tracking-widest">
              <span className="bg-[#0b0b0b] px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent border-white/20 hover:bg-[#2d5fa8]/10 hover:text-[#2d5fa8] hover:border-[#2d5fa8] transition-colors"
            onClick={handleGoogleSignIn}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Entrar com Google
          </Button>

          <p className="text-center text-sm font-body text-muted-foreground mt-4">
            {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white hover:text-accent transition-colors font-bold"
            >
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
