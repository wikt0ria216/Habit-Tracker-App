import PageHeader from "@/components/layout/PageHeader/PageHeader";
import Card from "@/components/ui/Card/Card";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "@/components/ui/CustomButton/CustomButton";
import FormInput from "@/components/form/FormInput/FormInput";
import { useGetUser } from "@/features/user/hooks/useGetUser";
import { useUpdateUser } from "@/features/user/hooks/useUpdateUser";
import ProfileSkeleton from "@/features/user/components/ProfileSkeleton/ProfileSkeleton";
import ProfileError from "@/features/user/components/ProfileError/ProfileError";

import "./profilepage.css";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const FILE_SIZE = 2000000;

const schema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  avatar: yup
    .mixed<File>()
    .optional()
    .nullable()
    .test("fileSize", "The file is too large (max 2MB)", (value) => {
      if (!value) return true;
      return value.size <= FILE_SIZE;
    })
    .test("fileType", "Invalid file format (allowed: JPG, PNG, JPEG)", (value) => {
      if (!value) return true;
      return SUPPORTED_FORMATS.includes(value.type);
    }),
});

type ProfileFormValues = yup.InferType<typeof schema>;

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  avatar?: File;
}

const ProfilePage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const {
    formState: { errors, dirtyFields, isDirty },
    control,
    watch,
    handleSubmit,
    register,
    reset,
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data: userProfile, refetch, isError, isLoading } = useGetUser();

  const updateProfileMutation = useUpdateUser();

  const avatarWatch = watch("avatar");

  useEffect(() => {
    if (userProfile) {
      reset({
        firstName: userProfile.first_name ?? "",
        lastName: userProfile.last_name ?? "",
        avatar: null,
      });
    }
  }, [reset, userProfile]);

  useEffect(() => {
    if (avatarWatch instanceof File) {
      const url = URL.createObjectURL(avatarWatch);

      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [avatarWatch]);

  const handleFormSubmit = async (data: ProfileFormValues) => {
    try {
      const changedData: UpdateProfileData = {};

      if (dirtyFields.firstName) changedData.firstName = data.firstName;
      if (dirtyFields.lastName) changedData.lastName = data.lastName;

      if (dirtyFields.avatar && data.avatar) {
        changedData.avatar = data.avatar;
      }

      if (Object.keys(changedData).length > 0) {
        await updateProfileMutation.mutateAsync(changedData);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Something went wrong: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      setPreviewUrl(null);
    }

    if (userProfile) {
      reset({
        firstName: userProfile.first_name ?? "",
        lastName: userProfile.last_name ?? "",
        avatar: null,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="profile">
        <PageHeader title="User Profile" />
        <Card title="Profile Information">
          <ProfileSkeleton />
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="profile">
        <PageHeader title="My Profile" />
        <Card title="Personal Information">
          <ProfileError onRetry={refetch} />
        </Card>
      </div>
    );
  }

  return (
    <div className="profile">
      <PageHeader title="My Profile" />
      <Card title="Personal Information">
        <form className="profile-form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <div className="profile-avatar">
                <img
                  className="profile-avatar-preview"
                  src={previewUrl ?? userProfile?.avatar_url ?? "/user-img.png"}
                  alt={
                    previewUrl
                      ? "Selected avatar preview"
                      : userProfile?.avatar_url
                      ? `${userProfile.first_name}'s avatar`
                      : "Default avatar"
                  }
                />
                <div className="profile-avatar-content">
                  <div className="profile-avatar-controls">
                    <CustomButton variant="secondary" onClick={() => avatarInputRef.current?.click()}>
                      Upload
                    </CustomButton>
                    <p id="profile-avatar-hint" className="profile-avatar-hint">
                      JPG, JPEG or PNG (max 2MB)
                    </p>
                  </div>
                  {errors.avatar && (
                    <span id="profile-avatar-error" className="profile-avatar-error" role="alert">
                      {errors.avatar.message}
                    </span>
                  )}
                </div>
                <label htmlFor="image" className="sr-only">
                  Upload avatar file
                </label>
                <input
                  type="file"
                  id="image"
                  ref={avatarInputRef}
                  className="sr-only"
                  accept="image/jpeg, image/png, image/jpg"
                  aria-describedby={`profile-avatar-hint ${errors.avatar ? "profile-avatar-error" : ""}`}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    field.onChange(selectedFile);
                  }}
                  aria-invalid={!!errors.avatar}
                />
              </div>
            )}
          />
          <div className="profile-form-inputs">
            <FormInput
              placeholder="First Name"
              label="First Name"
              id="firstName"
              autoComplete="off"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <FormInput
              placeholder="Last Name"
              label="Last Name"
              id="lastName"
              autoComplete="off"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
            <FormInput
              placeholder="Email"
              label="Email"
              id="email"
              type="email"
              autoComplete="off"
              isDisabled
              readOnly
              value={userProfile?.email ?? ""}
            />
          </div>

          <div className="profile-form-actions">
            <CustomButton variant="secondary" onClick={handleCancel} isDisabled={!isDirty}>
              Cancel
            </CustomButton>
            <CustomButton type="submit" isDisabled={!isDirty || updateProfileMutation.isPending}>
              Save
            </CustomButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
