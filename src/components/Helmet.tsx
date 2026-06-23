import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function HelmetProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Helmet({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(children, document.head)
}
