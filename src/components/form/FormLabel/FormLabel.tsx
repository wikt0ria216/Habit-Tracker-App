import classNames from "classnames";
import "./formlabel.css";

interface FormLabelProps {
  htmlFor: string;
  label: string;
  isOptional?: boolean;
  className?: string;
}

const FormLabel = ({ htmlFor, label, isOptional = false, className }: FormLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={classNames("form-label", className)}>
      <span className="form-label-text">{label}</span>
      {isOptional && <span className="form-label-optional">(optional)</span>}
    </label>
  );
};

export default FormLabel;
