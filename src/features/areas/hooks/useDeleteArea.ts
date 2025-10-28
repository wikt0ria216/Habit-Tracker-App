import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

export const deleteArea = async (areaId: number): Promise<void> => {
  const { error } = await supabase.from("areas").delete().eq("id", areaId);

  if (error) {
    throw error;
  }
};

export const useDeleteArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArea,
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      await queryClient.invalidateQueries({ queryKey: ["areas", userId] });
      toast.success("Area Deleted");
    },
  });
};
