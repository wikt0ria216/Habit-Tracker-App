import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

const getUser = async (userId: string): Promise<User> => {
  const { data, error } = await supabase.from("users").select("*").eq("user_id", userId).single();

  if (error) {
    throw error;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 400);
  });
};

export const useGetUser = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return getUser(user.id);
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id,
  });
};
