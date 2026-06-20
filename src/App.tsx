import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Layout } from '@/components/Layout'
import { IndexSkeleton } from '@/components/skeletons/IndexSkeleton'

const retryLazy = (componentImport: () => Promise<any>) =>
  lazy(async () => {
    try {
      const component = await componentImport()
      sessionStorage.removeItem('lazy-reload')
      return component
    } catch (error) {
      if (sessionStorage.getItem('lazy-reload') !== 'true') {
        sessionStorage.setItem('lazy-reload', 'true')
        window.location.reload()
        return new Promise(() => {}) // wait for reload
      }
      throw error
    }
  })

const Index = retryLazy(() => import('@/pages/Index'))
const NotFound = retryLazy(() => import('@/pages/NotFound'))
const ServiceLayer = retryLazy(() => import('@/pages/ServiceLayer'))
const Sobre = retryLazy(() => import('@/pages/Sobre'))
const Carreiras = retryLazy(() => import('@/pages/Carreiras'))
const Metodologia = retryLazy(() => import('@/pages/Metodologia'))

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center w-full bg-background">
    <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-accent/80 w-1/3 rounded-full animate-pulse" />
    </div>
  </div>
)

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<IndexSkeleton />}>
                  <Index />
                </Suspense>
              }
            />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/servicos/:slug" element={<ServiceLayer />} />
            <Route path="/carreiras" element={<Carreiras />} />
            <Route path="/metodologia" element={<Metodologia />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
