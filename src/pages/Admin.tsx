import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Navigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Loader2, Trash2, ArrowLeft, ShieldAlert } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type AuthorizedUser = {
  id: string
  email: string
  created_at: string
  is_admin: boolean
}

export default function Admin() {
  const { session, loading: authLoading, user } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [users, setUsers] = useState<AuthorizedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && user?.email) {
      checkAdminStatus()
    } else if (!authLoading && !user) {
      setIsAdmin(false)
      setLoading(false)
    }
  }, [user, authLoading])

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('authorized_users')
        .select('*')
        .eq('email', user?.email || '')
        .single()

      if (error || !(data as any)?.is_admin) {
        setIsAdmin(false)
      } else {
        setIsAdmin(true)
        fetchUsers()
      }
    } catch (err) {
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('authorized_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setUsers(data as AuthorizedUser[])
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail || !/^\S+@\S+\.\S+$/.test(newEmail)) {
      toast({
        title: 'E-mail inválido',
        description: 'Por favor, insira um endereço de e-mail válido.',
        variant: 'destructive',
      })
      return
    }

    setAdding(true)
    const { error } = await supabase
      .from('authorized_users')
      .insert([{ email: newEmail.toLowerCase() }])

    setAdding(false)

    if (error) {
      toast({
        title: 'Erro ao adicionar',
        description: error.message.includes('unique constraint')
          ? 'Este e-mail já está autorizado.'
          : 'Ocorreu um erro ao autorizar o e-mail.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'E-mail autorizado',
        description: `${newEmail} foi adicionado à lista de acesso.`,
      })
      setNewEmail('')
      fetchUsers()
    }
  }

  const handleDeleteUser = async (id: string, email: string) => {
    setDeletingId(id)
    const { error } = await supabase.from('authorized_users').delete().eq('id', id)

    setDeletingId(null)

    if (error) {
      toast({
        title: 'Erro ao remover',
        description: 'Não foi possível remover o acesso deste e-mail.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Acesso removido',
        description: `O e-mail ${email} não tem mais acesso.`,
      })
      fetchUsers()
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white p-6">
        <ShieldAlert className="w-16 h-16 text-destructive mb-6" />
        <h1 className="font-display text-3xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-muted-foreground font-body text-center max-w-md mb-8">
          Você não tem permissão para acessar o painel administrativo. Esta área é restrita a
          gestores autorizados.
        </p>
        <Button asChild>
          <Link to="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-white"
              >
                <Link to="/dashboard">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <h1 className="font-display text-3xl font-bold tracking-tight">Painel de Gestão</h1>
            </div>
            <p className="text-muted-foreground font-body ml-12">
              Gerenciamento de Usuários Autorizados
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
          <form
            onSubmit={handleAddUser}
            className="flex flex-col md:flex-row gap-4 items-end mb-10"
          >
            <div className="space-y-2 flex-1 w-full">
              <label
                htmlFor="email"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Novo e-mail autorizado
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/30 h-12"
              />
            </div>
            <Button
              type="submit"
              disabled={adding || !newEmail}
              className="h-12 px-8 bg-white text-black hover:bg-white/90 font-bold tracking-wide w-full md:w-auto"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Autorizar E-mail
            </Button>
          </form>

          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-mono uppercase text-xs">
                    E-mail
                  </TableHead>
                  <TableHead className="text-muted-foreground font-mono uppercase text-xs hidden md:table-cell">
                    Data de Autorização
                  </TableHead>
                  <TableHead className="text-muted-foreground font-mono uppercase text-xs">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground font-mono uppercase text-xs text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground font-body"
                    >
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <TableRow
                      key={u.id}
                      className="border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="font-body font-medium">{u.email}</TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">
                        {new Date(u.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        {u.is_admin ? (
                          <Badge
                            variant="default"
                            className="bg-accent/20 text-accent hover:bg-accent/30 border-none"
                          >
                            Admin
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-white/20 text-muted-foreground"
                          >
                            User
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={u.is_admin || deletingId === u.id}
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            >
                              {deletingId === u.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#111] border border-white/10 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remover acesso?</AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                O usuário <strong>{u.email}</strong> perderá imediatamente o acesso
                                ao painel. Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(u.id, u.email)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remover Acesso
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
