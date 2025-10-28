import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { Habit } from "@/types/Habit";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { useEffect } from "react";
import { getMillisecondsUntilMidnight } from "@/utils/getMillisecondsUntilMidnight";

const fetchHabits = async (userId: string | undefined): Promise<Habit[]> => {
  const { data, error } = await supabase
    .from("habits")
    .select("*, habit_areas(area_id, areas(id, area_name))")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const returnedData = data as Habit[];

  return new Promise((resolve) => {
    setTimeout(() => resolve(returnedData), 400);
  });
};

export function useHabits() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: ["habits", user?.id],
    queryFn: () => fetchHabits(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!user?.id) return;

    const scheduleMidnightRefresh = () => {
      const msUntilMidnight = getMillisecondsUntilMidnight();

      const timeoutId = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["habits", user.id] });
        scheduleMidnightRefresh();
      }, msUntilMidnight);

      return timeoutId;
    };

    const timeoutId = scheduleMidnightRefresh();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [queryClient, user?.id]);

  return queryResult;
}
