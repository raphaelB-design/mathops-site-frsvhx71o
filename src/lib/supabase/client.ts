// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

// Import the supabase client like this:
// import { supabase } from "@/lib/supabase/client";

// SEGURANÇA — limitação do armazenamento atual e plano de migração:
// - Os tokens JWT (access/refresh) do Supabase Auth ficam em sessionStorage.
//   sessionStorage não persiste entre sessões do navegador (ao fechar a aba/janela
//   a sessão se encerra), mas continua acessível por qualquer script JavaScript
//   da página. Portanto, NÃO elimina o risco de XSS: um script injetado ainda
//   consegue ler o token.
// - Solução definitiva (NÃO implementada agora): uma Edge Function que emite o
//   token em cookie HttpOnly; Secure; SameSite=Strict, e um storage customizado
//   para o Supabase Auth que não expõe o token ao JavaScript da página.
// - Ponto de atenção: o login é compartilhado com o CRM em portal.mathops.com.br,
//   que usa o mesmo Supabase Auth. A migração para cookies HttpOnly afeta esse
//   login compartilhado e deve ser decidida pelo usuário antes de ser feita.
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: sessionStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
})
