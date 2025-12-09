import { Area } from "./Area";

export interface Habit {
  id: number;
  habit_name: string;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
  frequency: string;
  days: string[];
  user_id: string;
  habit_areas: { area_id: number; areas: Area }[];
}
