
export interface Campaign {
  id: number
  name: string
  status: string
  status_color: string
  target_volume: number
  amount: number
  created_date: string
  delivery_date: string
  prospects_generated?: number
  sector?: string
  zone?: string
  admin_notes?: string
  internal_status?: string
  user_id?: number
  form_questions?: any
  prospect_files?: any
}

export interface User {
  id: number
  created_at: string
  "Mot de passe"?: number
  "Nom complet"?: string
  "Email professionnel"?: string
  Entreprise?: string
}

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: Campaign
        Insert: Omit<Campaign, 'id' | 'created_date'> & { 
          id?: number
          created_date?: string 
        }
        Update: Partial<Campaign>
      }
      user: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at'> & { 
          id?: number
          created_at?: string 
        }
        Update: Partial<User>
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
