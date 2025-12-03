import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { Habit } from "@/types/Habit";

interface CompleteHabitProps {
  habitId: number;
  isCompleted: boolean;
}

export const completeHabit = async ({ habitId, isCompleted }: CompleteHabitProps): Promise<void> => {
  const { error } = await supabase.from("habits").update({ is_completed: isCompleted }).eq("id", habitId);
  if (error) {
    throw error;
  }
};

export const useCompleteHabit = (habitId: number) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: completeHabit,

    onMutate: async ({ isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: ["habits", user?.id] });

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits", user?.id]);

      queryClient.setQueryData<Habit[]>(["habits", user?.id], (old) => {
        if (!old) return [];
        return old.map((habit) => (habit.id === habitId ? { ...habit, is_completed: isCompleted } : habit));
      });

      return { previousHabits };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits", user?.id], context.previousHabits);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits", user?.id] });
    },
  });
};
