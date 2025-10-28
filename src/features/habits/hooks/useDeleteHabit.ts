import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

export const deleteHabit = async (habitId: number) => {
  const { error } = await supabase.from("habits").delete().eq("id", habitId);
  if (error) {
    throw error;
  }
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      await queryClient.invalidateQueries({ queryKey: ["habits", userId] });

      toast.success("Habit Deleted");
    },
  });
};
