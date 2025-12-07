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

    const errorId = `${id}-error`;

    return (
      <div className="form-input-container">
        {label && <FormLabel htmlFor={id} label={label} isOptional={isOptional} />}
        <div className="form-input-wrapper">
          {icon && onIconClick && (
            <button className="form-input-icon" aria-label={iconAriaLabel} onClick={onIconClick} type="button">
              {icon}
            </button>
          )}
          {icon && !onIconClick && (
            <span className="form-input-icon" aria-hidden="true">
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
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            required={isRequired}
            aria-required={isRequired}
            {...rest}
          />
        </div>
        {error && <FormFieldError id={errorId} error={error} />}
      </div>
    );
  }
);

export default FormInput;
