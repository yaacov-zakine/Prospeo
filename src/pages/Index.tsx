
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import Dashboard from '../components/Dashboard'

const Index = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenue, {user?.user_metadata?.full_name || user?.email}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Prospeo - Plateforme de génération de prospects
          </p>
        </div>
        
        <Dashboard />
      </div>
    </div>
  )
}

export default Index
