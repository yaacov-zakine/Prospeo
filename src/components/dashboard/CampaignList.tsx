
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Plus, BarChart3 } from 'lucide-react'

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target: '',
    budget: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCampaign = {
      id: Date.now(),
      ...formData,
      status: 'En préparation',
      prospects: 0,
      createdAt: new Date().toLocaleDateString()
    }
    setCampaigns([...campaigns, newCampaign])
    setFormData({ name: '', description: '', target: '', budget: '' })
    setIsOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Vos campagnes ({campaigns.length})
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle campagne
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une nouvelle campagne</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom de la campagne</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Campagne leads B2B Tech"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Décrivez votre campagne..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="target">Cible</Label>
                  <Input
                    id="target"
                    value={formData.target}
                    onChange={(e) => handleInputChange('target', e.target.value)}
                    placeholder="Ex: Directeurs IT, PME 50-200 salariés"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="1000"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Créer la campagne
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune campagne créée</h3>
            <p className="text-gray-600 mb-6">Commencez par créer votre première campagne de génération de prospects</p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer ma première campagne
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{campaign.name}</h4>
                      <p className="text-gray-600 mt-1">{campaign.description}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>Cible: {campaign.target}</span>
                        <span>Budget: {campaign.budget}€</span>
                        <span>Créée: {campaign.createdAt}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{campaign.prospects}</div>
                      <div className="text-sm text-gray-500">prospects</div>
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CampaignList
