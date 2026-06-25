import { supabase } from '@/lib/supabase/client'

export type CandidateInput = {
  full_name: string
  email: string
  area_interest: string
  motivation: string
  cv_url?: string | null
}

export const submitCandidate = async (data: CandidateInput, token: string) => {
  const { data: responseData, error } = await supabase.functions.invoke('submit-candidate', {
    body: { ...data, token },
  })
  if (error) throw error
  return responseData
}

export const uploadCV = async (file: File, path: string) => {
  const { error } = await supabase.storage.from('curriculos').upload(path, file)
  if (error) throw error
  return path
}

export const getSignedCvUrl = async (path: string) => {
  const { data, error } = await supabase.functions.invoke('get-cv-signed-url', {
    body: { path },
  })
  if (error) throw error
  return data.signedUrl
}
