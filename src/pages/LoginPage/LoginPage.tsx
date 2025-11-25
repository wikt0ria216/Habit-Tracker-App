import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthForm from "@features/authentication/components/AuthForm/AuthForm";
import FormInput from "@form/FormInput/FormInput";

import { useLogin } from "@/features/authentication/hooks/useLogin";

import { Eye, EyeOff } from "@/assets/icons";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { mutate: login, isPending: isLoggingPending } = useLogin();
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });
  const { session } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [navigate, session]);

  const handleLogin = (data: LoginFormValues) => {
    const { email, password } = data;
    login(
      { email, password },
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
        title="Log In"
        subtitle="Welcome Back! Please log in to continue."
        buttonText="Log In"
        footerText="Don't have an account yet?"
        footerLink="/signup"
        footerLinkText="Sign Up"
        isButtonLoading={isLoggingPending}
        onSubmit={handleSubmit(handleLogin)}
      >
        <FormInput
          placeholder="yourname@company.com"
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
          isRequired
        />

        <FormInput
          placeholder="Enter your password"
          label="Password"
          id="password"
          autoComplete="current-password"
          onIconClick={handleToggle}
          icon={passwordType === "password" ? <EyeOff /> : <Eye />}
          type={passwordType}
          {...register("password")}
          error={errors.password?.message}
          iconAriaLabel={passwordType === "password" ? "Show password" : "Hide password"}
          isRequired
        />
      </AuthForm>
    </>
  );
};

export default LoginPage;
