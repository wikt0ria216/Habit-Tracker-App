import { Edit, Trash, ThreeDotsVertical } from "@assets/icons/index";
import MenuDropdown from "@ui/MenuDropdown/MenuDropdown";

import "./areaitem.css";

interface AreaItemProps {
  id: number;
  areaName: string;
  onDelete?: (areaId: number) => void;
  onEdit?: (areaId: number) => void;
  habitsCount?: number;
}

const AreaItem = ({ areaName, habitsCount, onDelete, onEdit, id }: AreaItemProps) => {
  const areaItemId = `area-item-${id}-${areaName.replace(/\s+/g, "-").toLowerCase()}`;
  const habitsCountId = `habits-count-${id}-${areaName.replace(/\s+/g, "-").toLowerCase()}`;

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
      ariaLabel: `Edit area ${areaName}`,
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
      ariaLabel: `Delete area ${areaName}`,
    },
  ];

  return (
    <div className="area-item" tabIndex={0} aria-labelledby={`${areaItemId} ${habitsCountId}`} role="region">
      <div className="area-item-left">
        <div className="area-item-details">
          <span className="area-item-name" id={areaItemId}>
            {areaName}
          </span>
          <span className="area-item-count">{habitsCount} habits</span>
        </div>
      </div>
      <MenuDropdown
        options={dropdownOptions}
        openerIcon={<ThreeDotsVertical size={20} />}
        openerVariant="ghost"
        openerAriaLabel={`Open menu for ${areaName} area`}
        dropdownAriaLabel={`Menu for ${areaName} area`}
      />
    </div>
  );
};

export default AreaItem;
