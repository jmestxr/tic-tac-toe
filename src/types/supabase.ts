export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string | null
          game_id: number
          player1_id: number | null
          player2_id: number | null
        }
        Insert: {
          created_at?: string | null
          game_id?: number
          player1_id?: number | null
          player2_id?: number | null
        }
        Update: {
          created_at?: string | null
          game_id?: number
          player1_id?: number | null
          player2_id?: number | null
        }
      }
      games_moves: {
        Row: {
          col_position: number
          created_at: string | null
          game_id: number
          player_id: number | null
          row_position: number
        }
        Insert: {
          col_position: number
          created_at?: string | null
          game_id?: number
          player_id?: number | null
          row_position: number
        }
        Update: {
          col_position?: number
          created_at?: string | null
          game_id?: number
          player_id?: number | null
          row_position?: number
        }
      }
      players: {
        Row: {
          created_at: string | null
          player_id: number
        }
        Insert: {
          created_at?: string | null
          player_id?: number
        }
        Update: {
          created_at?: string | null
          player_id?: number
        }
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_game: {
        Args: {
          pid: number
        }
        Returns: number
      }
      create_player: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      delete_game: {
        Args: {
          gid: number
        }
        Returns: undefined
      }
      get_last_move: {
        Args: {
          gid: number
        }
        Returns: Record<string, unknown>
      }
      get_moves: {
        Args: {
          gid: number
        }
        Returns: {
          row_pos: number
          col_pos: number
        }[]
      }
      get_players: {
        Args: {
          gid: number
        }
        Returns: Record<string, unknown>
      }
      is_waiting_game: {
        Args: {
          gid: number
        }
        Returns: boolean
      }
      is_waiting_move: {
        Args: {
          gid: number
          pid: number
        }
        Returns: boolean
      }
      join_game: {
        Args: {
          pid: number
        }
        Returns: number
      }
      make_move: {
        Args: {
          gid: number
          pid: number
          row_pos: number
          col_pos: number
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
