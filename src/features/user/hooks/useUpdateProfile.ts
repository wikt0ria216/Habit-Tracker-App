import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  avatar?: File;
}

const updateProfile = async (userId: string, data: UpdateProfileData): Promise<{ user: User; hasChanges: boolean }> => {
  const { data: currentUser, error: fetchError } = await supabase.from("users").select().eq("user_id", userId).single();

  if (fetchError) throw fetchError;

  let avatarUrl: string | undefined;
  let avatarChanged = false;

  if (data.avatar) {
    const fileExt = data.avatar.name.split(".").pop();
    const fileName = `${userId}-avatar.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

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
    avatarChanged = true;
  }

  const firstNameChanged = data.firstName !== undefined && data.firstName !== currentUser.first_name;
  const lastNameChanged = data.lastName !== undefined && data.lastName !== currentUser.last_name;

  const hasChanges = firstNameChanged || lastNameChanged || avatarChanged;

  if (!hasChanges) {
    return { user: currentUser, hasChanges: false };
  }

  const updateData: Partial<User> = {
    updated_at: new Date().toISOString(),
  };

  if (firstNameChanged) updateData.first_name = data.firstName;
  if (lastNameChanged) updateData.last_name = data.lastName;
  if (avatarChanged && avatarUrl) {
    updateData.avatar_url = avatarUrl;
  }

  const { data: updatedUser, error: updateError } = await supabase
    .from("users")
    .update(updateData)
    .eq("user_id", userId)
    .select()
    .single();

  if (updateError) {
    throw updateError;
  }

  return { user: updatedUser, hasChanges: true };
};

export const useUpdateProfile = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdateProfileData) => {
      if (!user) {
        throw new Error("User not authenticated or not found");
      }

      return updateProfile(user.id, updates);
    },
    onSuccess: (data) => {
      if (user) {
        if (!data.hasChanges) {
          return;
        }

        queryClient.setQueryData(["user"], data.user);
        toast.success("Profile updated successfully");
      }
    },
  });
};
