import { trackClick } from '@/services/analytics'

export function CrmCtaBanner() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackClick('crm_access_click', 'home_banner')

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Fallback navigation if contact section is on another page
      window.location.href = '/#contact'
    }
  }

  return null
}
