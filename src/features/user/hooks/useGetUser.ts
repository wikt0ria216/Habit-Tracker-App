import { supabase } from "@/supabase/supabaseClient";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

const getUser = async (): Promise<User> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.from("users").select("*").eq("user_id", user.id).single();

  if (error) {
    throw error;
  }

  return data;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
