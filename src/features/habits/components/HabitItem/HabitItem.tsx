import { forwardRef } from "react";

import MenuDropdown from "@ui/MenuDropdown/MenuDropdown";
import TagList from "@ui/TagList/TagList";

import { ThreeDotsVertical, Edit, Trash } from "@/assets/icons";

import "./habititem.css";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import { useCompleteHabit } from "../../hooks/useCompleteHabit";

interface HabitItemProps {
  id: number;
  name: string;
  isCompleted?: boolean;
  areas: string[];
  onEdit?: (habitId: number) => void;
  onDelete?: (habitId: number) => void;
  isReadOnly?: boolean;
  ignoreCompletedStyle?: boolean;
  showActions?: boolean;
  showCheckbox?: boolean;
}
const HabitItem = forwardRef<HTMLDivElement, HabitItemProps>(
  (
    {
      id,
      name,
      isCompleted = false,
      areas,
      onEdit,
      onDelete,
      ignoreCompletedStyle = false,
      isReadOnly = false,
      showActions = true,
      showCheckbox = true,
    },
    ref
  ) => {
    const dropdownOptions = [
      {
        label: "Edit",
        icon: <Edit />,
        action: () => {
          if (onEdit) {
            onEdit(id);
          }
        },
        ariaLabel: `Edit habit ${name}`,
      },
      {
        label: "Delete",
        icon: <Trash />,
        action: () => {
          if (onDelete) {
            onDelete(id);
          }
        },
        ariaLabel: `Delete habit ${name}`,
      },
    ];

    const { mutate: completeHabit } = useCompleteHabit(id);

    const handleToggleComplete = () => {
      completeHabit({ habitId: id, isCompleted: !isCompleted });
    };

    if (isReadOnly) {
      return (
        <div className="habit-item" ref={ref}>
          <div className="habit-item-left">
            <div className={`habit-item-header ${areas.length === 0 ? "no-areas" : ""}`}>
              <h3 className="habit-item-name">{name}</h3>
            </div>
            {areas.length > 0 && <TagList tags={areas} />}
          </div>
        </div>
      );
    }

    return (
      <div className={`habit-item ${!isReadOnly && isCompleted && !ignoreCompletedStyle ? "completed" : ""}`} ref={ref}>
        <div className="habit-item-left">
          <div className={`habit-item-header ${areas.length === 0 ? "no-areas" : ""}`}>
            <h3 className="habit-item-name">{name}</h3>
          </div>
          {areas.length > 0 && <TagList tags={areas} />}
        </div>

        {(showActions || showCheckbox) && (
          <div className="habit-item-right">
            {showCheckbox && (
              <CustomCheckbox
                id={`habit-checkbox-${id}`}
                checked={isCompleted}
                onChange={handleToggleComplete}
                ariaLabel={`Complete ${name}`}
              />
            )}

            {showActions && (
              <MenuDropdown
                openerIcon={<ThreeDotsVertical size={20} />}
                openerVariant="ghost"
                options={dropdownOptions}
                dropdownAriaLabel={`Menu for ${name} habit`}
                openerAriaLabel={`Open menu for ${name} habit`}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

export default HabitItem;
