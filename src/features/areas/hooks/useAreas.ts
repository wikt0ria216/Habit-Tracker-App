import { useQuery } from "@tanstack/react-query";
import { Area } from "@/types/Area";
import { supabase } from "@/supabase/supabaseClient";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

const fetchAreas = async (userId: string | undefined): Promise<Area[]> => {
  const { data, error } = await supabase
    .from("areas")
    .select("id, area_name, user_id, habits_count:habit_areas(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const mappedData = data.map((area) => ({
    id: area.id,
    area_name: area.area_name,
    user_id: area.user_id,
    habits_count: area.habits_count[0]?.count || 0,
  })) as Area[];

  return new Promise((resolve) => {
    setTimeout(() => resolve(mappedData), 400);
  });
};

export const useAreas = () => {
  const { user } = useAuthContext();

  const queryResult = useQuery({
    queryKey: ["areas", user?.id],
    queryFn: () => fetchAreas(user?.id),
    enabled: !!user?.id,
  });
  return queryResult;
};
