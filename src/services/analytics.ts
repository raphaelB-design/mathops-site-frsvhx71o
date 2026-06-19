import { supabase } from '@/lib/supabase/client'

export async function trackClick(eventType: string, buttonLocation: string) {
  try {
    // We cast supabase to any to bypass strict type checking for the dynamically created table
    // that won't be in the auto-generated types yet.
    await (supabase as any)
      .from('site_analytics')
      .insert([{ event_type: eventType, button_location: buttonLocation }])
  } catch (error) {
    console.error('Failed to track click:', error)
  }
}
