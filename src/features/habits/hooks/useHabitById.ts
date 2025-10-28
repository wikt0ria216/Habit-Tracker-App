import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { Habit } from "@/types/Habit";

export const fetchHabitById = async (habitId: number | undefined): Promise<Habit> => {
  const { data, error } = await supabase
    .from("habits")
    .select("*, habit_areas(area_id, areas(id, area_name))")
    .eq("id", habitId)
    .single();

  if (error) {
    throw error;
  }
  return data as Habit;
};

export function useHabitById(habitId: number | undefined) {
  const queryResult = useQuery({
    queryKey: ["habit", habitId],
    queryFn: () => fetchHabitById(habitId),
    enabled: !!habitId,
  });

  return queryResult;
}
