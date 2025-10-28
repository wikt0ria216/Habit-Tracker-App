import "./customcheckbox.css";

interface CustomCheckboxProps {
  id: string;
  onChange: () => void;
  checked?: boolean;
  ariaLabel?: string;
  label?: string;
}

const CustomCheckbox = ({ id, onChange, checked, ariaLabel, label }: CustomCheckboxProps) => {
  return (
    <>
      <label htmlFor={id} className="custom-checkbox">
        <input
          type="checkbox"
          id={id}
          className="hidden-checkbox"
          onChange={onChange}
          checked={checked}
          aria-label={ariaLabel || label}
        />
        <span className="checkbox-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 16.2l-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>

        {label && <span className="checkbox-label">{label}</span>}
      </label>
    </>
  );
};


export default CustomCheckbox;
