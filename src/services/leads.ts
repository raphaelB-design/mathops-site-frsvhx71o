import { supabase } from '@/lib/supabase/client'

export type LeadInput = {
  contact_name: string
  email: string
  company_name: string
  sector: string
  challenge: string
  maturity_level: string
  strategic_goals: string
}

export const submitLead = async (data: LeadInput, token: string) => {
  const { data: responseData, error } = await supabase.functions.invoke('submit-lead', {
    body: { ...data, token },
  })
  if (error) throw error
  return responseData
}
