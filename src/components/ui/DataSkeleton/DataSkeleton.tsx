import classNames from "classnames";
import "./dataskeleton.css";

interface DataSkeleton {
  times?: number;
  className?: string;
  ariaLabel?: string;
}

const DataSkeleton = ({ times = 2, className, ariaLabel }: DataSkeleton) => {
  const skeletonClasses = classNames("data-skeleton anim-pulse", className);

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return <div key={i} className={skeletonClasses} role="status" aria-busy="true" aria-label={ariaLabel}></div>;
    });

  return boxes;
};

export default DataSkeleton;
