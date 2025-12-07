import classNames from "classnames";

import FormFieldError from "@form/FormFieldError/FormFieldError";

import { dayFullNames } from "@/utils/daysUtils";

import "./daypicker.css";

interface DayPickerProps {
  days: string[];
  selectedDays: string[];
  className?: string;
  onDayChange: (day: string) => void;
  isOptionDisabled?: boolean;
  error?: string;
  isMonthly?: boolean;
}

const DayPicker = ({
  days,
  selectedDays,
  onDayChange,
  isMonthly,
  isOptionDisabled,
  className,
  error,
}: DayPickerProps) => {
  const daypickerClasses = classNames("daypicker", className, { "daypicker-center": isMonthly });

  return (
    <div
      className={daypickerClasses}
      role="group"
      aria-label={isMonthly ? "Select days of the month" : "Select days of the week"}
      aria-describedby={error ? "days-error" : undefined}
    >
      <ul className="daypicker-days-list">
        {days.map((day) => (
          <li key={`day-${day}`} className="daypicker-day-item">
            <label className={`daypicker-day-label`} htmlFor={`day-${day}`}>
              <input
                type="checkbox"
                className="day-checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => onDayChange(day)}
                name="days"
                disabled={isOptionDisabled}
                id={`day-${day}`}
                aria-label={dayFullNames[day] || day}
              />
              <span
                className={`daypicker-custom-checkbox ${selectedDays.includes(day) ? "checked" : ""} ${
                  isOptionDisabled ? "disabled" : ""
                }`}
                aria-hidden="true"
              >
                {day}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {error && <FormFieldError id="days-error" error={error} />}
    </div>
  );
};

export default DayPicker;
