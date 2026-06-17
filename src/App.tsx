import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import { AuthProvider } from './hooks/use-auth'
import { IndexSkeleton } from './components/skeletons/IndexSkeleton'

const Index = lazy(() => import('./pages/Index'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ServiceLayer = lazy(() => import('./pages/ServiceLayer'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Admin = lazy(() => import('./pages/Admin'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Carreiras = lazy(() => import('./pages/Carreiras'))

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center w-full bg-background">
    <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-accent/80 w-1/3 rounded-full animate-pulse" />
    </div>
  </div>
)

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/servicos/:slug" element={<ServiceLayer />} />
              <Route path="/carreiras" element={<Carreiras />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
