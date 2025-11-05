import { supabase } from "@/supabase/supabaseClient";
import { User } from "@/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  avatar?: File;
}

const updateUser = async (data: UpdateProfileData): Promise<User | undefined> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw Error("User not authenticated");
  }

  let avatarUrl: string | undefined;

  if (data.avatar) {
    const fileExt = data.avatar.name.split(".").pop();
    const fileName = `${user.id}-avatar.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, data.avatar, {
      cacheControl: "3600",
      upsert: true,
    });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    avatarUrl = `${publicUrl}?t=${Date.now()}`;
  }

  const updateData: Partial<User> = {};

  if (data.firstName !== undefined) updateData.first_name = data.firstName;
  if (data.lastName !== undefined) updateData.last_name = data.lastName;

  if (avatarUrl) {
    updateData.avatar_url = avatarUrl;
  }

  if (Object.keys(updateData).length > 0) {
    updateData.updated_at = new Date().toISOString();

    const { data: editProfileData, error: editProfileError } = await supabase
      .from("users")
      .update(updateData)
      .eq("user_id", user.id)
      .select()
      .single();

    if (editProfileError) {
      throw editProfileError;
    }

    return editProfileData;
  }
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(["user"], data);
        toast.success("Profile updated successfully");
      }
    },
  });
};
