import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

export const deleteHabit = async (habitId: number, userId: string) => {
  const { data: habit, error: checkError } = await supabase
    .from("habits")
    .select("*")
    .eq("id", habitId)
    .eq("user_id", userId)
    .single();

  if (checkError || !habit) {
    throw new Error("Habit not found or you do not have access to it");
  }

  const { error } = await supabase.from("habits").delete().eq("id", habitId).eq("user_id", userId);
  if (error) {
    throw error;
  }
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: (habitId: number) => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return deleteHabit(habitId, user.id);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["habits", user.id] });
        toast.success("Habit Deleted");
      }
    },
  });
};
