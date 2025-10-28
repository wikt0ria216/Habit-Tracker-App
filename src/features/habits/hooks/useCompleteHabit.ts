import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

interface CompleteHabitProps {
  habitId: number;
  isCompleted: boolean;
}

export const completeHabit = async ({ habitId, isCompleted }: CompleteHabitProps): Promise<void> => {
  const { error } = await supabase.from("habits").update({ is_completed: isCompleted }).eq("id", habitId).single();
  if (error) {
    throw error;
  }
};

export const useCompleteHabit = (habitId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeHabit,
    mutationKey: ["updateHabit", habitId],
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      await queryClient.invalidateQueries({ queryKey: ["habits", userId] });
    },
  });
};
