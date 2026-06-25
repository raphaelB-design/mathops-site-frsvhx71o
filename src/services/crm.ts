import { supabase } from '@/lib/supabase/client'

export type CandidateInput = {
  full_name: string
  email: string
  area_interest: string
  motivation: string
  cv_url?: string | null
}

export const submitCandidate = async (candidate: CandidateInput) => {
  const { data, error } = await supabase.from('candidates' as any).insert([candidate])
  if (error) throw error
  return data
}

export const uploadCV = async (file: File, path: string) => {
  const { data, error } = await supabase.storage.from('curriculos').upload(path, file)
  if (error) throw error
  return data
}

export const getSignedCvUrl = async (path: string) => {
  const { data, error } = await supabase.functions.invoke('get-cv-signed-url', {
    body: { path },
  })
  if (error) throw error
  return data?.signedUrl
}
