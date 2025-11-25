import { FormHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

import CustomButton from "@ui/CustomButton/CustomButton";

import "./authform.css";

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  subtitle?: string;
  buttonText: string;
  isButtonLoading?: boolean;
  footerText: string;
  footerLink: string;
  children: ReactNode;
  footerLinkText: string;
  onSubmit: () => void;
}

const AuthForm = ({
  title,
  subtitle,
  buttonText,
  footerText,
  children,
  isButtonLoading,
  footerLink,
  footerLinkText,
  onSubmit,
  ...rest
}: AuthFormProps) => {
  return (
    <div className="auth-form-container">
      <div className="auth-form-content">
        <div className="auth-form-title">
          <h1 className="auth-form-title-text">{title}</h1>
          {subtitle && <p className="auth-form-subtitle-text">{subtitle}</p>}
        </div>
        <form onSubmit={onSubmit} className="auth-form" {...rest}>
          {children}
          <div className="auth-form-actions">
            <CustomButton isLoading={isButtonLoading} type="submit">
              {buttonText}
            </CustomButton>
          </div>
        </form>
        <div className="auth-form-footer">
          <span className="auth-form-footer-text">{footerText}</span>
          <Link to={footerLink} className="auth-form-footer-link">
            {footerLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
