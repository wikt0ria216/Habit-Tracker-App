import { useQuery } from "@tanstack/react-query";
import { Area } from "@/types/Area";
import { supabase } from "@/supabase/supabaseClient";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

const fetchAreas = async (userId: string): Promise<Area[]> => {
  const { data, error } = await supabase
    .from("areas")
    .select(
      `
      id,
      area_name,
      user_id,
      created_at,
      updated_at,
      habits_count:habit_areas(count)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const returnedData = data.map((area) => ({
    ...area,
    habits_count: area.habits_count?.[0]?.count ?? 0,
  }));

  return new Promise((resolve) => {
    setTimeout(() => resolve(returnedData), 400);
  });
};

export const useAreas = () => {
  const { user } = useAuthContext();

  const queryResult = useQuery({
    queryKey: ["areas", user?.id],
    queryFn: () => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return fetchAreas(user.id);
    },
    enabled: !!user?.id,
  });
  return queryResult;
};
