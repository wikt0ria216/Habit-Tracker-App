import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

import FormLabel from "@form/FormLabel/FormLabel";
import FormFieldError from "@form/FormFieldError/FormFieldError";

import "./forminput.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "file";
  className?: string;
  placeholder?: string;
  label?: string;
  id: string;
  error?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  isOptional?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  iconAriaLabel?: string;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className,
      placeholder,
      icon,
      label,
      error,
      onIconClick,
      iconAriaLabel,
      isRequired = false,
      isOptional = false,
      isDisabled = false,
      id,
      ...rest
    },
    ref
  ) => {
    const inputClass = classNames(
      "form-input",
      {
        "form-input-error": error,
      },
      className
    );

    return (
      <div className="form-input-container">
        {label && <FormLabel htmlFor={id} label={label} isOptional={isOptional} />}
        <div className="form-input-wrapper">
          {icon && (
            <span
              className="form-input-icon"
              onClick={onIconClick}
              role="button"
              tabIndex={0}
              aria-label={iconAriaLabel}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onIconClick?.();
                }
              }}
            >
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className={inputClass}
            id={id}
            disabled={isDisabled}
            placeholder={placeholder}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={error ? "true" : "false"}
            aria-required={isRequired}
            {...rest}
          />
        </div>
        {error && <FormFieldError id={id} error={error} />}
      </div>
    );
  }
);

export default FormInput;
