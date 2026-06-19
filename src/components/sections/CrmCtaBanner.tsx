import { ArrowUpRight } from 'lucide-react'
import { trackClick } from '@/services/analytics'

export function CrmCtaBanner() {
  const handleClick = () => {
    trackClick('crm_access_click', 'home_banner')
  }

  return null
}
