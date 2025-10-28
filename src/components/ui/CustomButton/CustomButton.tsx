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
  textAlign?: TextAlignType;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaHasPopup?: boolean | "dialog" | "grid" | "listbox" | "menu" | "tree" | "true" | "false";
  spinnerAriaLabel?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      icon = false,
      variant = "accent",
      size = "md",
      isDisabled = false,
      isLoading,
      className,
      ariaLabel,
      ariaControls,
      ariaExpanded,
      ariaHasPopup,
      spinnerAriaLabel,
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

    return (
      <button
        {...rest}
        disabled={isDisabled || isLoading}
        className={buttonClasses}
        onClick={onClick}
        ref={ref}
        aria-disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
      >
        {isLoading ? (
          <Spinner size="xsm" variant={variant === "secondary" ? "inverted" : "light"} ariaLabel={spinnerAriaLabel} />
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
