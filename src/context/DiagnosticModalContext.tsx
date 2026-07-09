import { createContext, useContext, useState, ReactNode } from 'react'
import { VocDiagnosticModal } from '@/components/VocDiagnosticModal'

interface DiagnosticModalContextValue {
  open: boolean
  openDiagnostic: () => void
  closeDiagnostic: () => void
}

const DiagnosticModalContext = createContext<DiagnosticModalContextValue | undefined>(undefined)

export function DiagnosticModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openDiagnostic = () => setOpen(true)
  const closeDiagnostic = () => setOpen(false)

  return (
    <DiagnosticModalContext.Provider value={{ open, openDiagnostic, closeDiagnostic }}>
      {children}
      <VocDiagnosticModal open={open} onOpenChange={setOpen} />
    </DiagnosticModalContext.Provider>
  )
}

export function useDiagnosticModal() {
  const context = useContext(DiagnosticModalContext)
  if (!context) {
    throw new Error('useDiagnosticModal must be used within a DiagnosticModalProvider')
  }
  return context
}
