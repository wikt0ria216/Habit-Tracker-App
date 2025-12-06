import Select, {
  ActionMeta,
  ClearIndicatorProps,
  ContainerProps,
  GroupBase,
  MultiValue,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";

import FormFieldError from "@form/FormFieldError/FormFieldError";

import { SelectOption } from "@/types/SelectOption";

import "./customselector.css";
import { useRef } from "react";

interface CustomSelectorProps<IsMulti extends boolean = false> {
  isMulti?: IsMulti;
  isSearchable?: boolean;
  value: IsMulti extends true ? MultiValue<SelectOption> : SingleValue<SelectOption>;
  onChange: (newValue: IsMulti extends true ? MultiValue<SelectOption> : SingleValue<SelectOption>) => void;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  className?: string;
  closeMenuOnSelect?: boolean;
  inputId?: string;
  ariaLabel?: string;
  name?: string;
  isRequired?: boolean;
}

/**
 * Prevents escape key from closing parent modal when menu is open
 */
const CustomSelectContainer = (props: ContainerProps<SelectOption, boolean, GroupBase<SelectOption>>) => {
  const shouldStopEscKeyUpRef = useRef<boolean>(false);

  const innerProps = {
    ...props.innerProps,
    onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (props.selectProps.menuIsOpen && event.key === "Escape") {
        shouldStopEscKeyUpRef.current = true;
      }
      props.innerProps.onKeyDown?.(event);
    },
    onKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
      if (shouldStopEscKeyUpRef.current && event.key === "Escape") {
        event.stopPropagation();
        shouldStopEscKeyUpRef.current = false;
      }
    },
  };

  return <components.SelectContainer {...props} innerProps={innerProps} />;
};

const CustomSelector = <IsMulti extends boolean = false>({
  isMulti = false as IsMulti,
  value,
  onChange,
  options,
  className,
  name,
  error,
  isRequired = false,
  ariaLabel,
  placeholder = "Select...",
  isSearchable = false,
  closeMenuOnSelect = !isMulti,
  inputId,
}: CustomSelectorProps<IsMulti>) => {
  const customStyles: StylesConfig<SelectOption, boolean> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "var(--radius-med)",
      padding: "2px",
      color: "var(--text-primary)",
      fontSize: "var(--text-sml)",
      boxShadow: "none",
      backgroundColor: "transparent",
      border: state.isFocused
        ? "var(--border-thin-accent)"
        : error
        ? "var(--border-thin-danger)"
        : "var(--border-thin-default)",
      "&:hover": {
        cursor: "pointer",
      },
      transition:
        "border-color var(--transition-default), color var(--transition-default), background-color var(--transition-default)",
      minHeight: "42px",
    }),

    input: (provided) => ({
      ...provided,
      color: "var(--text-primary)",
      fontSize: "var(--text-sml)",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "var(--text-sml)",
      backgroundColor: state.isSelected
        ? "var(--bg-secondary-medium)"
        : state.isFocused
        ? "var(--bg-secondary-subtle)"
        : "var(--bg-popover)",
      color: "var(--text-primary)",
      padding: "var(--spacing-med) var(--spacing-lrg)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "var(--bg-secondary-medium)",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "var(--bg-secondary-subtle)",
      borderRadius: "var(--radius-sml)",
      overflow: "hidden",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "var(--text-primary)",
      fontSize: "var(--text-sml)",
      padding: "var(--spacing-xsm) var(--spacing-sml)",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "var(--icon-secondary)",
      cursor: "pointer",
      padding: "var(--spacing-xsm)",
      "&:hover": {
        backgroundColor: "var(--bg-secondary-strong)",
        color: "var(--icon-inverted)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-primary)",
      fontSize: "var(--text-sml)",
    }),
    menu: (provided) => ({
      ...provided,
      border: "var(--border-thin-default)",
      borderRadius: "var(--radius-sml)",
      boxShadow: "var(--box-shadow-med);",
      marginTop: "var(--spacing-xsm)",
      backgroundColor: "var(--bg-popover)",
      overflow: "hidden",
      zIndex: 9999,
      transition: "border var(--transition-default)",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "var(--icon-secondary)",
      "&:hover": {
        color: "var(--icon-inverted)",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--icon-secondary)",
      "&:hover": {
        color: "var(--icon-inverted)",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: error ? "var(--text-danger)" : "var(--text-secondary)",
      fontSize: "var(--text-sml)",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "140px",
      overflowY: "auto",
      padding: "0",
    }),
  };

  /**
   * Prevents the modal from closing after clearing values in multi select mode
   */
  const CustomClearIndicator = (props: ClearIndicatorProps<SelectOption, boolean, GroupBase<SelectOption>>) => {
    const clearValue = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      props.clearValue();
    };

    const innerProps = {
      ...props.innerProps,
      onMouseDown: clearValue,
      onTouchEnd: clearValue,
    };

    return <components.ClearIndicator {...props} innerProps={innerProps} />;
  };

  /**
   * Adapter to ignore actionMeta parameter that we don't use
   */
  const handleChange = (
    newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
    _actionMeta: ActionMeta<SelectOption>
  ) => {
    onChange(newValue as IsMulti extends true ? MultiValue<SelectOption> : SingleValue<SelectOption>);
  };

  return (
    <>
      <Select
        options={options}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isMulti}
        onChange={handleChange}
        inputId={inputId}
        value={value}
        name={name}
        className={className}
        closeMenuOnSelect={closeMenuOnSelect}
        components={{
          IndicatorSeparator: () => null,
          SelectContainer: CustomSelectContainer,
          ...(isMulti && { ClearIndicator: CustomClearIndicator }),
        }}
        placeholder={placeholder}
        styles={customStyles}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        aria-label={ariaLabel}
        required={isRequired}
      />

      {error && <FormFieldError id={inputId} error={error} />}
    </>
  );
};

export default CustomSelector;
