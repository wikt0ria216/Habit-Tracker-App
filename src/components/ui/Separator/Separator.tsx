import classNames from "classnames";
import "./separator.css";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  thickness?: "thin" | "medium" | "thick";
  className?: string;
}

const Separator = ({ orientation = "horizontal", className, thickness = "thin" }: SeparatorProps) => {
  const separatorClasses = classNames("separator", className, {
    [`separator-${orientation}`]: orientation,
    [`separator-${thickness}`]: thickness,
  });

  return <div role="separator" aria-orientation={orientation} className={separatorClasses}></div>;
};

export default Separator;
