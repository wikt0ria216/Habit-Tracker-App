import "./customcheckbox.css";

interface CustomCheckboxProps {
  id: string;
  onChange: () => void;
  checked?: boolean;
  ariaLabel?: string;
}

const CustomCheckbox = ({ id, onChange, checked, ariaLabel }: CustomCheckboxProps) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
        aria-label={ariaLabel}
      />
      <label htmlFor={id} className="checkbox-label"></label>
    </div>
  );
};
export default CustomCheckbox;
