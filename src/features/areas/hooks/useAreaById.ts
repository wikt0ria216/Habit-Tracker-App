import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { Area } from "@/types/Area";

export const fetchAreaById = async (areaId: number | undefined): Promise<Area> => {
  const { data, error } = await supabase.from("areas").select("*").eq("id", areaId).single();
  if (error) {
    throw error;
  }
  return data as Area;
};

export function useAreaById(areaId: number | undefined) {
  const queryResult = useQuery({
    queryKey: ["area", areaId],
    queryFn: () => fetchAreaById(areaId),
    enabled: !!areaId,
  });

  return queryResult;
}
