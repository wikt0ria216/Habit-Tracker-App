import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

export const deleteArea = async (areaId: number, userId: string): Promise<void> => {
  const { data: area, error: checkError } = await supabase
    .from("areas")
    .select("*")
    .eq("id", areaId)
    .eq("user_id", userId)
    .single();

  if (checkError || !area) {
    throw new Error("Area not found or you do not have access to it");
  }

  const { error } = await supabase.from("areas").delete().eq("id", areaId).eq("user_id", userId);

  if (error) {
    throw error;
  }
};

export const useDeleteArea = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: (areaId: number) => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return deleteArea(areaId, user.id);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["areas", user?.id] });
        toast.success("Area deleted");
      }
    },
  });
};
