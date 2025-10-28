import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

interface HabitData {
  habitName: string;
  frequency: string;
  days: string[];
  areasIds: number[];
}

const addHabit = async ({ habitName, frequency, days, areasIds }: HabitData): Promise<void> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user.id) {
    throw new Error("User not authenticated or not found");
  }

  const userId = userData.user.id;

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
    throw new Error("A habit with this name already exists");
  }

  const data = {
    habit_name: habitName,
    is_completed: false,
    frequency: frequency,
    days: days,
    user_id: userId,
  };

  const { data: newHabit, error: newHabitError } = await supabase.from("habits").insert([data]).select().single();
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

  return useMutation({
    mutationFn: addHabit,
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      await queryClient.invalidateQueries({ queryKey: ["habits", userId] });
      toast.success("New Habit Created");
    },
  });
};
