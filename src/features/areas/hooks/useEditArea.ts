import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

interface editAreaProps {
  areaId: number;
  areaName: string;
}

export const editArea = async ({ areaId, areaName }: editAreaProps): Promise<void> => {
  const { data: currentArea, error: fetchError } = await supabase
    .from("areas")
    .select("area_name")
    .eq("id", areaId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  if (currentArea.area_name === areaName) {
    throw new Error("No changes were made")
  }

  const { error: editError } = await supabase.from("areas").update({ area_name: areaName }).eq("id", areaId).select().single();

  if (editError) {
    throw editError;
  }
};

export const useEditArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editArea,
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      await queryClient.invalidateQueries({ queryKey: ["areas", userId] });
      toast.success("Area edited");
    },
  });
};
