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
          created_at: string
          html: string
          id: string
          json: Json | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          html: string
          id?: string
          json?: Json | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          html?: string
          id?: string
          json?: Json | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_company_id: string | null
          created_at: string
          email: string | null
          id: string
          linkedin: string | null
          name: string | null
          phone: string | null
          role: string | null
          stage: string | null
          tags: Json | null
          user_id: string | null
        }
        Insert: {
          client_company_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          linkedin?: string | null
          name?: string | null
          phone?: string | null
          role?: string | null
          stage?: string | null
          tags?: Json | null
          user_id?: string | null
        }
        Update: {
          client_company_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          linkedin?: string | null
          name?: string | null
          phone?: string | null
          role?: string | null
          stage?: string | null
          tags?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "clients_company"
            referencedColumns: ["id"]
          },
        ]
      }
      clients_company: {
        Row: {
          created_at: string
          id: string
          linkedin: string | null
          name: string | null
          segment: Json | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          linkedin?: string | null
          name?: string | null
          segment?: Json | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          linkedin?: string | null
          name?: string | null
          segment?: Json | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_company_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company: {
        Row: {
          address: string | null
          created_at: string
          id: string
          name: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          name?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          name?: string | null
          website?: string | null
        }
        Relationships: []
      }
      customers_campaigns: {
        Row: {
          campaign_id: string | null
          created_at: string
          customer_id: string | null
          email_ext_id: string | null
          id: number
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          customer_id?: string | null
          email_ext_id?: string | null
          id?: number
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          customer_id?: string | null
          email_ext_id?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "customers_campaigns_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_campaigns_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          photo_url: string | null
          price: number
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          price?: number
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          admin: boolean
          avatar_url: string | null
          company_id: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          admin?: boolean
          avatar_url?: string | null
          company_id?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          admin?: boolean
          avatar_url?: string | null
          company_id?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          amount: number | null
          client_id: string | null
          created_at: string
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
