import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthForm from "@features/authentication/components/AuthForm/AuthForm";
import FormInput from "@form/FormInput/FormInput";

import { useCreateUser } from "@/features/authentication/hooks/useCreateUser";
import { useNavigate } from "react-router";

import { Eye, EyeOff } from "@/assets/icons";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const registerSchema = yup.object().shape({
  firstName: yup.string().trim().required("Frist name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[a-z]/, "Password requires at least one lowercase letter")
    .matches(/[A-Z]/, "Password requires at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .required("Password is required"),
});

const SignupPage = () => {
  const { mutate: signUpNewUser, isPending: signUpNewUserIsPending } = useCreateUser();
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });
  const { session } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [navigate, session]);

  const handleRegister = (data: RegisterFormValues) => {
    const { email, firstName, lastName, password } = data;
    signUpNewUser(
      { email: email, firstname: firstName, lastname: lastName, password: password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const handleToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <>
      <AuthForm
        title="Sign Up Account"
        subtitle="Enter your personal data to create your account."
        onSubmit={handleSubmit(handleRegister)}
        footerText="Alreade have an account?"
        footerLinkText="Log In"
        footerLink="/login"
        buttonText="Sign Up"
        isButtonLoading={signUpNewUserIsPending}
      >
        <FormInput
          label="First Name"
          autoComplete="given-name"
          id="first-name"
          placeholder="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
          isRequired
        />

        <FormInput
          label="Last Name"
          autoComplete="family-name"
          id="last-name"
          placeholder="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
          isRequired
        />

        <FormInput
          label="Email"
          id="email"
          autoComplete="email"
          type="email"
          placeholder="youremail@company.com"
          {...register("email")}
          error={errors.email?.message}
          isRequired
        />

        <FormInput
          label="Password"
          id="password"
          autoComplete="new-password"
          type={passwordType}
          icon={passwordType === "password" ? <EyeOff /> : <Eye />}
          onIconClick={handleToggle}
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
          iconAriaLabel={passwordType === "password" ? "Show password" : "Hide password"}
          isRequired
        />
      </AuthForm>
    </>
  );
};

export default SignupPage;
