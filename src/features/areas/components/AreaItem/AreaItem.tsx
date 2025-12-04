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
  const dropdownOptions = [
    {
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
    <div className="area-item">
      <div className="area-item-left">
        <div className="area-item-details">
          <span className="area-item-name">{areaName}</span>
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
