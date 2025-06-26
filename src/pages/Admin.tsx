import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../integrations/supabase/client'
import { Tables } from '../integrations/supabase/types'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Progress } from '../components/ui/progress'
import { toast } from '../hooks/use-toast'

type Campaign = Tables<'campaigns'>

const Admin = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [internalStatus, setInternalStatus] = useState('')
  const queryClient = useQueryClient()

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_date', { ascending: false })
      
      if (error) throw error
      return data
    },
  })

  const updateCampaignMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number, updates: Partial<Campaign> }) => {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] })
      toast({ title: 'Campagne mise à jour avec succès' })
    },
    onError: (error) => {
      toast({ 
        title: 'Erreur', 
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const getProgressPercentage = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en attente':
        return 0
      case 'en cours de prod':
        return 50  // Fixed: was returning 500
      case 'livré':
        return 100
      default:
        return 0
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'en cours de prod':
        return 'bg-blue-100 text-blue-800'
      case 'livré':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusChange = (campaignId: number, newStatus: string) => {
    updateCampaignMutation.mutate({
      id: campaignId,
      updates: { status: newStatus }
    })
  }

  const handleNotesUpdate = (campaignId: number) => {
    updateCampaignMutation.mutate({
      id: campaignId,
      updates: { 
        admin_notes: adminNotes,
        internal_status: internalStatus
      }
    })
    setSelectedCampaign(null)
    setAdminNotes('')
    setInternalStatus('')
  }

  useEffect(() => {
    if (selectedCampaign) {
      setAdminNotes(selectedCampaign.admin_notes || '')
      setInternalStatus(selectedCampaign.internal_status || '')
    }
  }, [selectedCampaign])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Interface Administrateur
        </h1>
        
        <div className="space-y-6">
          {campaigns?.map((campaign) => (
            <Card key={campaign.id} className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-semibold">
                      {campaign.name}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Volume cible: {campaign.target_volume} prospects
                    </p>
                    <p className="text-gray-600">
                      Secteur: {campaign.sector} | Zone: {campaign.zone}
                    </p>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progression</span>
                    <span className="text-sm text-gray-600">
                      {getProgressPercentage(campaign.status)}%
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(campaign.status)} className="h-2" />
                </div>

                <div className="flex gap-4 items-center">
                  <Select
                    value={campaign.status}
                    onValueChange={(value) => handleStatusChange(campaign.id, value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="En attente">En attente</SelectItem>
                      <SelectItem value="En cours de prod">En cours de prod</SelectItem>
                      <SelectItem value="Livré">Livré</SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        Gérer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Gestion de la campagne</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Statut interne
                          </label>
                          <Select
                            value={internalStatus}
                            onValueChange={setInternalStatus}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="À traiter">À traiter</SelectItem>
                              <SelectItem value="En cours">En cours</SelectItem>
                              <SelectItem value="En attente client">En attente client</SelectItem>
                              <SelectItem value="Terminé">Terminé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Notes administrateur
                          </label>
                          <Textarea
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            placeholder="Ajouter des notes..."
                            rows={4}
                          />
                        </div>
                        
                        <Button 
                          onClick={() => selectedCampaign && handleNotesUpdate(selectedCampaign.id)}
                          className="w-full"
                        >
                          Sauvegarder
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {campaign.admin_notes && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Notes admin:</p>
                    <p className="text-sm text-gray-600">{campaign.admin_notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
