
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './hooks/useAuth'
import { Toaster } from './components/ui/toaster'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Index from './pages/Index'
import Auth from './pages/Auth'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            <Navbar />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
