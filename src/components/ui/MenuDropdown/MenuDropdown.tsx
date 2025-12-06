import { ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import CustomButton, { SizeType, TextAlignType, VariantType } from "@ui/CustomButton/CustomButton";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import "./menudropdown.css";
import { useMountTransition } from "@/hooks/useMountTransition";

interface DropdownOptionProps {
  label: string;
  icon?: ReactNode;
  action: () => void;
  ariaLabel?: string;
}

interface MenuDropdownProps {
  openerLabel?: string;
  openerIcon?: ReactNode;
  openerVariant?: VariantType;
  openerSize?: SizeType;
  openerTextAlign?: TextAlignType;
  openerAriaLabel?: string;
  options: DropdownOptionProps[];
  dropdownAriaLabel?: string;
}

const MenuDropdown = ({
  openerLabel,
  openerIcon,
  options,
  openerVariant,
  openerAriaLabel,
  dropdownAriaLabel,
  openerSize,
  openerTextAlign,
}: MenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const id = useId();
  const menuId = `${id}-menu`;

  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasDropdownTransitionedIn = useMountTransition({ isMounted: isOpen });

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const getDropdownPosition = useCallback(() => {
    if (!buttonRef.current || !dropdownRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const dropdownHeight = dropdownRef.current.offsetHeight;
    const dropdownWidth = dropdownRef.current.offsetWidth;

    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    let top = buttonRect.bottom + 4;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      top = buttonRect.top - dropdownHeight - 4;
    }

    const left = buttonRect.right - dropdownWidth;

    setPosition({
      top,
      left,
    });
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(null);
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex !== null && prevIndex < options.length - 1 ? prevIndex + 1 : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : options.length - 1));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      options[index].action();
      setIsOpen(false);
      setFocusedIndex(null);
      buttonRef.current?.focus();
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(null);
      buttonRef.current?.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    getDropdownPosition();

    const handleResize = () => getDropdownPosition();
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, getDropdownPosition]);

  useEffect(() => {
    if (isOpen && focusedIndex !== -1) {
      const focusedItem = document.getElementById(`${id}-option-${focusedIndex}`);
      focusedItem?.focus();
    }
  }, [focusedIndex, isOpen, id]);

  return (
    <div className="dropdown-menu-container">
      <CustomButton
        icon={openerIcon}
        ref={buttonRef}
        variant={openerVariant}
        onClick={handleToggle}
        size={openerSize}
        textAlign={openerTextAlign}
        className="dropdown-menu-btn"
        ariaHasPopup="true"
        ariaExpanded={isOpen}
        ariaLabel={openerAriaLabel}
        ariaControls={menuId}
        onKeyDown={handleKeyDown}
      >
        {openerLabel}
      </CustomButton>

      {createPortal(
        <>
          {(hasDropdownTransitionedIn || isOpen) && (
            <ul
              className={`dropdown-menu ${hasDropdownTransitionedIn && "in"} ${isOpen && "visible"}`}
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
              }}
              id={menuId}
              role="menu"
              aria-label={dropdownAriaLabel || "Menu Options"}
            >
              {options.map((option, index) => (
                <li className={`dropdown-menu-item`} key={`${id}-option-${index}`}>
                  <CustomButton
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                    icon={option.icon}
                    variant="ghost"
                    textAlign="left"
                    role="menuitem"
                    className="dropdown-menu-btn"
                    id={`${id}-option-${index}`}
                    onKeyDown={(event) => handleItemKeyDown(event, index)}
                    tabIndex={focusedIndex === index ? 0 : -1}
                  >
                    {option.label}
                  </CustomButton>
                </li>
              ))}
            </ul>
          )}
        </>,

        document.body
      )}
    </div>
  );
};

export default MenuDropdown;
