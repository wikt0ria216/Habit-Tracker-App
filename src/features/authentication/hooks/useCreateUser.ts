import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

interface createUserProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const createUser = async (user: createUserProps) => {
  const { firstname, lastname, email, password } = user;

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: {
      data: { firstname, lastname },
    },
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: async (data) => {
      const { error: insertError } = await supabase.from("users").insert([
        {
          email: data.user?.email,
          first_name: data.user?.user_metadata.firstname,
          last_name: data.user?.user_metadata.lastname,
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      toast.success("Registration successful");
    },
  });
};
