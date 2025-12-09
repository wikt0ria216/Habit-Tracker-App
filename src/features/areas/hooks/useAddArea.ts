import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

export const addArea = async (userId: string, areaName: string): Promise<void> => {
  const { data: existingAreas, error: checkError } = await supabase
    .from("areas")
    .select("area_name")
    .eq("user_id", userId)
    .ilike("area_name", areaName)
    .maybeSingle();

  if (checkError) {
    throw checkError;
  }

  if (existingAreas) {
    throw new Error("Area with this name already exists.");
  }

  const areaData = {
    area_name: areaName,
    user_id: userId,
  };

  const { error } = await supabase.from("areas").insert([areaData]).select().single();

  if (error) {
    throw error;
  }
};

export const useAddArea = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: (areaName: string) => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return addArea(user.id, areaName);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["areas", user?.id] });
        toast.success("New area created");
      }
    },
  });
};
