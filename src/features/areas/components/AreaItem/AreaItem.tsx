import { Edit, Trash, ThreeDotsVertical } from "@assets/icons/index";
import MenuDropdown from "@ui/MenuDropdown/MenuDropdown";

import "./areaitem.css";
import { Area } from "@/types/Area";

interface AreaItemProps {
  areaName: string;
  onDelete?: (area: Area) => void;
  onEdit?: (area: Area) => void;
  habitsCount?: number;
  area?: Area;
}

const AreaItem = ({ areaName, habitsCount, onDelete, onEdit, area }: AreaItemProps) => {
  const dropdownOptions = [
    {
      label: "Edit",
      icon: <Edit />,
      action: () => {
        if (onEdit && area) {
          onEdit(area);
        }
      },
      ariaLabel: `Edit area ${areaName}`,
    },
    {
      label: "Delete",
      icon: <Trash />,
      action: () => {
        if (onDelete && area) {
          onDelete(area);
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
