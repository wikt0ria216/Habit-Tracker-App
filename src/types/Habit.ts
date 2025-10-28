import { Area } from "./Area";

export interface Habit {
  id: number; // bigint w Supabase, ale number wystarczy w TS
  habit_name: string; // Zamiast "name"
  is_completed: boolean; // Zamiast "completed"
  created_at?: string;
  updated_at?: string; // Opcjonalne, jeśli chcesz śledzić datę
  frequency?: string; // Opcjonalne
  days: string[]; // Zakładam, że "days" w jsonb to tablica dni
  user_id?: string; // uuid w Supabase to string w TS
  habit_areas: { area_id: number; areas: Area }[];
}
