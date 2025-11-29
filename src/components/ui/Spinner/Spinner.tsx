import classNames from "classnames";
import "./spinner.css";

type SpinnerVariantType = "accent" | "light" | "secondary" | "inverted";
type SpinnerSizeType = "xsm" | "sml" | "med" | "lrg";

interface SpinnerProps {
  variant?: SpinnerVariantType;
  size?: SpinnerSizeType;
  ariaLabel?: string;
  ariaLive?: "polite" | "assertive" | "off";
  ariaHidden?: boolean;
}

const Spinner = ({
  variant = "accent",
  size = "sml",
  ariaLabel = "Loading",
  ariaLive = "polite",
  ariaHidden = false,
}: SpinnerProps) => {
  const spinnerClasses = classNames("spinner", {
    [`spinner-${variant}`]: variant,
    [`spinner-${size}`]: size,
  });

  return (
    <div
      className={spinnerClasses}
      aria-label={!ariaHidden ? ariaLabel : undefined}
      role={!ariaHidden ? "status" : undefined}
      aria-live={!ariaHidden ? ariaLive : undefined}
      aria-hidden={ariaHidden}
    >
      <span className="spinner-circle anim-spin" aria-hidden="true"></span>
    </div>
  );
};

export default Spinner;
