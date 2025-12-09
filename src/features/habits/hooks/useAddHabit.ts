import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

interface HabitData {
  habitName: string;
  frequency: string;
  days: string[];
  areasIds: number[];
}

const addHabit = async (data: HabitData, userId: string): Promise<void> => {
  const { habitName, frequency, days, areasIds } = data;

  const { data: existingHabit, error: checkError } = await supabase
    .from("habits")
    .select("habit_name")
    .eq("user_id", userId)
    .ilike("habit_name", habitName)
    .maybeSingle();

  if (checkError) {
    throw checkError;
  }

  if (existingHabit) {
    throw new Error("Habit with this name already exists");
  }

  const habitData = {
    habit_name: habitName,
    is_completed: false,
    frequency: frequency,
    days: days,
    user_id: userId,
  };

  const { data: newHabit, error: newHabitError } = await supabase.from("habits").insert([habitData]).select().single();
  if (newHabitError) {
    throw newHabitError;
  }

  if (areasIds && areasIds.length > 0) {
    const habitAreasData = areasIds.map((areaId) => ({
      habit_id: newHabit.id,
      area_id: areaId,
    }));

    const { error: habitAreasError } = await supabase.from("habit_areas").insert(habitAreasData);

    if (habitAreasError) {
      throw habitAreasError;
    }
  }
};

export const useAddHabit = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: (data: HabitData) => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return addHabit(data, user.id);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["habits", user.id] });
        toast.success("New Habit Created");
      }
    },
  });
};
