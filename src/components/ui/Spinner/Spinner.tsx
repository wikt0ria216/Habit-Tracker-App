import classNames from "classnames";
import "./spinner.css";

type SpinnerVariantType = "accent" | "light" | "secondary" | "inverted";
type SpinnerSizeType = "xsm" | "sml" | "med" | "lrg";

interface SpinnerProps {
  variant?: SpinnerVariantType;
  size?: SpinnerSizeType;
  ariaLabel?: string;
  ariaLive?: "polite" | "assertive" | "off";
}

const Spinner = ({ variant = "accent", size = "sml", ariaLabel = "Loading", ariaLive = "polite" }: SpinnerProps) => {
  const spinnerClasses = classNames("spinner", {
    [`spinner-${variant}`]: variant,
    [`spinner-${size}`]: size,
  });

  return (
    <div className={spinnerClasses} aria-label={ariaLabel} role="status" aria-live={ariaLive}>
      <span className="spinner-circle anim-spin" aria-hidden="true"></span>
    </div>
  );
};

export default Spinner;
