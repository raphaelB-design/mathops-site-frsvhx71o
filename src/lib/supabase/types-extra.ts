import type { Database as GeneratedDatabase, Json } from './types'

export type ExtraTables = {
  site_analytics: {
    Row: {
      id: string
      event_type: string
      button_location: string
      created_at: string
    }
    Insert: {
      id?: string
      event_type: string
      button_location: string
      created_at?: string
    }
    Update: {
      id?: string
      event_type?: string
      button_location?: string
      created_at?: string
    }
    Relationships: []
  }
  consent_log: {
    Row: {
      id: string
      created_at: string
      visitor_id: string
      necessary: boolean
      analytics: boolean
      marketing: boolean
      action: string
      policy_version: string
      user_agent_category: string | null
    }
    Insert: {
      id?: string
      created_at?: string
      visitor_id: string
      necessary?: boolean
      analytics?: boolean
      marketing?: boolean
      action?: string
      policy_version?: string
      user_agent_category?: string | null
    }
    Update: {
      id?: string
      created_at?: string
      visitor_id?: string
      necessary?: boolean
      analytics?: boolean
      marketing?: boolean
      action?: string
      policy_version?: string
      user_agent_category?: string | null
    }
    Relationships: []
  }
}

export type ExtraFunctions = {
  log_visit: {
    Args: {
      p_path: string
      p_referrer_host?: string | null
      p_device?: 'mobile' | 'desktop' | string
      p_viewport_width?: number | null
      p_visitor_id?: string
      p_country?: string | null
    }
    Returns: string | null
  }
  get_visit_stats: {
    Args: {
      p_days?: number
    }
    Returns: Json
  }
  get_visitor_stats: {
    Args: {
      p_days?: number
      p_limit?: number
      p_offset?: number
    }
    Returns: Json
  }
  get_visitor_journey: {
    Args: {
      p_visitor_id: string
      p_days?: number
    }
    Returns: Json
  }
}

export type AppDatabase = Omit<GeneratedDatabase, 'public'> & {
  public: Omit<GeneratedDatabase['public'], 'Tables' | 'Functions'> & {
    Tables: GeneratedDatabase['public']['Tables'] & ExtraTables
    Functions: GeneratedDatabase['public']['Functions'] & ExtraFunctions
  }
}
