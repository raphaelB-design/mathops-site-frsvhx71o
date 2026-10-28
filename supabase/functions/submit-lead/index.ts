import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    const {
      token,
      contact_name,
      email,
      company_name,
      sector,
      company_size,
      challenge,
      budget_range,
      start_timeline,
      operation_details,
      maturity_level,
      strategic_goals,
    } = payload

    const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY') || Deno.env.get('TURNSTILE_SECRET')

    // Se a chave secreta estiver configurada, valida o token do Turnstile obrigatoriamente.
    // Caso a chave não esteja configurada, a verificação é ignorada (Turnstile desativado temporariamente).
    if (turnstileSecret) {
      if (!token) {
        return new Response(JSON.stringify({ error: 'Turnstile token is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const formData = new FormData()
      formData.append('secret', turnstileSecret)
      formData.append('response', token)

      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: formData,
        },
      )
      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        return new Response(JSON.stringify({ error: 'Invalid Turnstile token' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } else {
      console.info('[MathOps] TURNSTILE_SECRET_KEY não configurada — validação Turnstile ignorada')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    const { error } = await supabaseClient.from('leads').insert({
      contact_name,
      email,
      company_name,
      sector: sector || 'Não informado',
      company_size: company_size || 'Não informado',
      challenge,
      budget_range: budget_range || null,
      start_timeline: start_timeline || null,
      operation_details: operation_details || null,
      maturity_level: maturity_level || null,
      strategic_goals: strategic_goals || null,
      source: 'site',
    })

    if (error) {
      throw error
    }

    console.log('VoC diagnostic submission received:', {
      contact_name,
      email,
      company_name,
      sector,
      maturity_level,
      has_strategic_goals: !!strategic_goals,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
