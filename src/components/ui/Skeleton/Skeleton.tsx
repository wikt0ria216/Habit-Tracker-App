import classNames from "classnames";
import "./skeleton.css";
export interface SkeletonProps {
  className?: string;
  variant?: "circular" | "rectangular" | "rounded" | "text";
  width?: string | number;
  height?: string | number;
  loadingMessage?: string;
  isSingle?: boolean;
}

const Skeleton = ({
  className,
  variant = "text",
  width,
  height,
  isSingle = false,
  loadingMessage = "Loading",
}: SkeletonProps) => {
  const style: React.CSSProperties = {
    width: width || (variant === "circular" ? 40 : "100%"),
    height: height || (variant === "text" ? "1rem" : variant === "circular" ? 40 : 100),
  };
  const skeletonClasses = classNames("skeleton anim-pulse", className, {
    [`skeleton-${variant}`]: variant,
  });

  if (isSingle) {
    return (
      <div
        className={skeletonClasses}
        style={style}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="sr-only">{loadingMessage}</span>
      </div>
    );
  }

  return <div className={skeletonClasses} style={style} aria-hidden="true"></div>;
};

export default Skeleton;
