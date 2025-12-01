import "./customcheckbox.css";

interface CustomCheckboxProps {
  id: string;
  onChange: () => void;
  checked?: boolean;
  ariaLabel?: string;
}

const CustomCheckbox = ({ id, onChange, checked, ariaLabel }: CustomCheckboxProps) => {
  return (
    <>
      <label htmlFor={id} className="custom-checkbox">
        <input type="checkbox" id={id} className="hidden-checkbox" onChange={onChange} checked={checked} />
        <span className="checkbox-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 16.2l-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>

        <span className="sr-only">{ariaLabel || "Mark as completed"}</span>
      </label>
    </>
  );
};
export default CustomCheckbox;
