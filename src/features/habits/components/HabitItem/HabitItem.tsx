import { forwardRef } from "react";

import MenuDropdown from "@ui/MenuDropdown/MenuDropdown";
import TagList from "@ui/TagList/TagList";

import { ThreeDotsVertical, Edit, Trash } from "@/assets/icons";

import "./habititem.css";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import Spinner from "@/components/ui/Spinner/Spinner";
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
        id: "edit",
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
        id: "delete",
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

    const { mutate: completeHabit, isPending: isCompleting } = useCompleteHabit(id);

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
            {areas.length > 0 && <TagList tags={areas} ariaLabel={`Areas for ${name}`} />}
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
          {areas.length > 0 && <TagList tags={areas} ariaLabel={`Areas for ${name}`} />}
        </div>

        {(showActions || showCheckbox) && (
          <div className="habit-item-right">
            {showCheckbox && (
              <div className="checkbox-container">
                {isCompleting ? (
                  <Spinner variant="secondary" size="sml" ariaLabel={`Loading completion of ${name} habit`} />
                ) : (
                  <CustomCheckbox
                    id={`habit-checkbox-${id}`}
                    checked={isCompleted}
                    onChange={handleToggleComplete}
                    ariaLabel={`Toggle completion for ${name} habit`}
                  />
                )}
              </div>
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
