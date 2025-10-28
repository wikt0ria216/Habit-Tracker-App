import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

export const addArea = async (areaName: string): Promise<void> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user.id) {
    throw new Error("User not authenticated or not found");
  }

  const userId = userData.user.id;

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
    throw new Error("A habit with this name already exists");
  }

  const data = {
    area_name: areaName,
    user_id: userId,
  };

  const { error } = await supabase.from("areas").insert([data]).select();

  if (error) {
    throw error;
  }
};

export const useAddArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addArea,
    onSuccess: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      await queryClient.invalidateQueries({ queryKey: ["areas", userId] });
      toast.success("New area created");
    },
  });
};
