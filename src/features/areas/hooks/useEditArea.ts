import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

interface AreaUpdateData {
  area_name?: string;
  updated_at: string;
}

export const editArea = async (userId: string, areaId: number, areaName?: string): Promise<boolean> => {
  const { data: current, error: fetchCurrentError } = await supabase
    .from("areas")
    .select("area_name")
    .eq("id", areaId)
    .eq("user_id", userId)
    .single();

  if (fetchCurrentError) {
    throw fetchCurrentError;
  }

  if (!current) {
    throw new Error("Area not found");
  }

  const areaNameChanged = areaName !== undefined && current.area_name !== areaName;

  if (!areaNameChanged) {
    return false;
  }

  const updateData: AreaUpdateData = {
    area_name: areaName,
    updated_at: new Date().toISOString(),
  };

  const { error: editError } = await supabase.from("areas").update(updateData).eq("id", areaId).eq("user_id", userId);

  if (editError) {
    throw editError;
  }

  return true;
};

export const useEditArea = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: ({ areaId, areaName }: { areaId: number; areaName?: string }) => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return editArea(user.id, areaId, areaName);
    },
    onSuccess: (hasChanges) => {
      if (user) {
        if (!hasChanges) {
          return;
        }

        queryClient.invalidateQueries({ queryKey: ["areas", user.id] });
        toast.success("Area updated");
      }
    },
  });
};
