import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

interface editHabitProps {
  habitName: string;
  frequency: string;
  days: string[];
  areasIds: number[];
  habitId: number;
}

export const editHabit = async ({ habitName, frequency, days, areasIds, habitId }: editHabitProps): Promise<void> => {
  //fetch current habit data
  const { data: currentHabit, error: fetchHabitError } = await supabase
    .from("habits")
    .select("habit_name, frequency, days")
    .eq("id", habitId)
    .single();

  //throw error if fetching habit fails
  if (fetchHabitError) {
    throw fetchHabitError;
  }

  //Fetch current area-habits associations
  const { data: currentHabitAreas, error: fetchAreasError } = await supabase
    .from("habit_areas")
    .select("area_id")
    .eq("habit_id", habitId);

  //throw error if fetching areas fails
  if (fetchAreasError) {
    throw fetchAreasError;
  }

  //extract current area IDs and sort them
  const currentAreasIds = currentHabitAreas ? currentHabitAreas.map((area) => area.area_id).sort() : [];

  //Sort provided area IDs
  const sortedAreasIds = areasIds ? [...areasIds].sort() : [];

  //check if any data has changed
  const isHabitUnchanged =
    currentHabit.habit_name === habitName &&
    currentHabit.frequency === frequency &&
    JSON.stringify(currentHabit.days.sort()) === JSON.stringify(days.sort()) && // Compare sorted arrays
    JSON.stringify(currentAreasIds) === JSON.stringify(sortedAreasIds);

  // throw error if no changes are detected
  if (isHabitUnchanged) {
    throw new Error("No changes detected");
  }

  //Update habit data in the habits table
  const { error: editError } = await supabase
    .from("habits")
    .update({
      habit_name: habitName,
      frequency,
      days,
    })
    .eq("id", habitId)
    .select()
    .single();

  //throw error if editing habit fails

  if (editError) {
    throw editError;
  }

  //Delete existing relations
  const { error: deleteError } = await supabase.from("habit_areas").delete().eq("habit_id", habitId);

  //Throw error if deletion fails
  if (deleteError) {
    throw deleteError;
  }

  //add new habt-areas associations if they exist
  if (areasIds && areasIds.length > 0) {
    const habitAreasData = areasIds.map((areaId) => ({
      habit_id: habitId,
      area_id: areaId,
    }));

    //Insert new habit-area associations
    const { error: areasError } = await supabase.from("habit_areas").insert(habitAreasData);

    //Throw error if insertion fails
    if (areasError) {
      throw areasError;
    }
  }
};

export const useEditHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editHabit,
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      await queryClient.invalidateQueries({ queryKey: ["habits", userId]});
      toast.success("Habit Edited");
    },
  });
};
