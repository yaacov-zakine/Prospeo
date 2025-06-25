
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Plateforme B2B Prospects
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gestion de campagnes de génération de prospects
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              Créer une campagne
            </Button>
            <Button variant="outline" size="lg">
              Voir mes campagnes
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Création simple</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Créez vos campagnes en quelques clics avec notre interface intuitive.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suivi en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Suivez l'avancement de vos campagnes avec des métriques détaillées.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résultats garantis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Obtenez des prospects qualifiés pour développer votre business.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index
