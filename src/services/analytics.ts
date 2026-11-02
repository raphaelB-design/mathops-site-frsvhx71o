import { supabase } from '@/lib/supabase/client'
import { hasAnalyticsConsent } from '@/lib/consent'

export async function trackClick(eventType: string, buttonLocation: string) {
  // Gate LGPD: cliques/eventos analíticos só devem ser gravados sob consentimento analítico
  if (!hasAnalyticsConsent()) {
    return
  }

  try {
    await supabase
      .from('site_analytics')
      .insert([{ event_type: eventType, button_location: buttonLocation }])
  } catch (error) {
    console.error('Failed to track click:', error)
  }
}
