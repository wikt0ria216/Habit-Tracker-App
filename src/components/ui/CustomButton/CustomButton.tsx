import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import classNames from "classnames";

import "./custombutton.css";
import Spinner from "../Spinner/Spinner";

//Types exported to DropdownMenu to control the appearance of the dropdown menu opener button
export type VariantType = "accent" | "danger" | "secondary" | "ghost" | "transparent";

export type SizeType = "sm" | "md" | "lg";
export type TextAlignType = "left" | "center" | "right";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: VariantType;
  size?: SizeType;
  type?: "submit" | "reset" | "button";
  textAlign?: TextAlignType;
  isLoading?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaHasPopup?: boolean | "dialog" | "grid" | "listbox" | "menu" | "tree" | "true" | "false";
  loadingMessage?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      icon = false,
      variant = "accent",
      size = "md",
      isLoading,
      className,
      loadingMessage,
      ariaLabel,
      type = "button",
      ariaControls,
      ariaExpanded,
      ariaHasPopup,
      textAlign = "center",
      onClick,
      ...rest
    },
    ref
  ) => {
    const buttonClasses = classNames("btn", className, `btn-${size}`, {
      "btn-icon-only": icon && !children,
      [`btn-content-align-${textAlign}`]: textAlign,
      [`btn-${variant}`]: variant,
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      //Prevent button from being clicked when disabled
      if (isLoading) {
        e.preventDefault();
        return;
      }

      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Prevent button from being clicked via keyboard when disabled
      if (isLoading && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        return;
      }
    };

    return (
      <button
        {...rest}
        className={buttonClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        type={type}
        aria-disabled={isLoading}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
      >
        {isLoading ? (
          <>
            <Spinner size="xsm" variant={variant === "secondary" ? "inverted" : "light"} ariaHidden />
            <span>{loadingMessage}</span>
          </>
        ) : (
          <>
            {icon && (
              <span className="btn-icon" aria-hidden="true">
                {icon}
              </span>
            )}
            {children}
          </>
        )}
      </button>
    );
  }
);

export default CustomButton;
