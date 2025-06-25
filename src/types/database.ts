
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: number
          name: string
          status: string
          status_color: string
          user_id: number | null
          created_date: string
          delivery_date: string
          prospects_generated: number | null
          target_volume: number
          amount: number
          form_questions: Json | null
          prospect_files: Json | null
          internal_status: string | null
          sector: string | null
          zone: string | null
          admin_notes: string | null
        }
        Insert: {
          id?: number
          name: string
          status: string
          status_color: string
          user_id?: number | null
          created_date?: string
          delivery_date: string
          prospects_generated?: number | null
          target_volume: number
          amount: number
          form_questions?: Json | null
          prospect_files?: Json | null
          internal_status?: string | null
          sector?: string | null
          zone?: string | null
          admin_notes?: string | null
        }
        Update: {
          id?: number
          name?: string
          status?: string
          status_color?: string
          user_id?: number | null
          created_date?: string
          delivery_date?: string
          prospects_generated?: number | null
          target_volume?: number
          amount?: number
          form_questions?: Json | null
          prospect_files?: Json | null
          internal_status?: string | null
          sector?: string | null
          zone?: string | null
          admin_notes?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          id: number
          created_at: string
          "Mot de passe": number | null
          "Nom complet": string | null
          "Email professionnel": string | null
          Entreprise: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          "Mot de passe"?: number | null
          "Nom complet"?: string | null
          "Email professionnel"?: string | null
          Entreprise?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          "Mot de passe"?: number | null
          "Nom complet"?: string | null
          "Email professionnel"?: string | null
          Entreprise?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
