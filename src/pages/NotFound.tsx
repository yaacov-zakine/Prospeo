
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <Link to="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
