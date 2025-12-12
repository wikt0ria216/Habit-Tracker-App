import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

interface EditHabitProps {
  habitName?: string;
  frequency?: string;
  days?: string[];
  areasIds?: number[];
}

interface HabitUpdateData {
  habit_name?: string;
  frequency?: string;
  days?: string[];
  updated_at: string;
}

export const editHabit = async (userId: string, habitId: number, data: EditHabitProps): Promise<boolean> => {
  //fetch current habit data
  const { data: currentHabit, error: fetchCurrentError } = await supabase
    .from("habits")
    .select("habit_name, frequency, days, habit_areas(area_id)")
    .eq("id", habitId)
    .eq("user_id", userId)
    .single();

  //throw error if fetching habit fails
  if (fetchCurrentError) {
    throw fetchCurrentError;
  }

  //check if any data has changed
  const habitChanged =
    (data.habitName !== undefined && currentHabit.habit_name !== data.habitName) ||
    (data.frequency !== undefined && currentHabit.frequency !== data.frequency) ||
    (data.days !== undefined &&
      JSON.stringify([...currentHabit.days].sort()) !== JSON.stringify([...data.days].sort()));

  const currentAreaIds = currentHabit.habit_areas.map((ha) => ha.area_id).sort();
  const areasChanged =
    data.areasIds !== undefined && JSON.stringify([...data.areasIds].sort()) !== JSON.stringify(currentAreaIds);

  if (!habitChanged && !areasChanged) {
    return false;
  }

  if (habitChanged) {
    const updateData: HabitUpdateData = {
      updated_at: new Date().toISOString(),
    };

    if (data.habitName !== undefined) updateData.habit_name = data.habitName;
    if (data.frequency !== undefined) updateData.frequency = data.frequency;
    if (data.days !== undefined) updateData.days = data.days;

    const { error } = await supabase.from("habits").update(updateData).eq("id", habitId).eq("user_id", userId);
    if (error) throw error;
  }

  if (areasChanged) {
    const { error: delErr } = await supabase.from("habit_areas").delete().eq("habit_id", habitId);
    if (delErr) throw delErr;

    if (data.areasIds && data.areasIds.length > 0) {
      const { error: insErr } = await supabase
        .from("habit_areas")
        .insert(data.areasIds.map((id) => ({ habit_id: habitId, area_id: id })));
      if (insErr) throw insErr;
    }
  }

  return true;
};

export const useEditHabit = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: ({ habitId, data }: { habitId: number; data: EditHabitProps }) => {
      if (!user) {
        throw new Error("User not authtenticated or not found");
      }

      return editHabit(user.id, habitId, data);
    },
    onSuccess: (hasChanges) => {
      if (user) {
        if (!hasChanges) {
          return;
        }

        queryClient.invalidateQueries({ queryKey: ["habits", user?.id] });

        toast.success("Habit edited");
      }
    },
  });
};
