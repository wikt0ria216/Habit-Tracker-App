import AreaItem from "@features/areas/components/AreaItem/AreaItem";

import { Area } from "@/types/Area";

import "./arealist.css";

interface AreaListProps {
  areas: Area[] | undefined;
  onDelete?: (areaId: number) => void;
  onEdit?: (areaId: number) => void;
}

const AreaList = ({ areas, onDelete, onEdit }: AreaListProps) => {
  return (
    <ul className="area-list">
      {areas?.map((area) => (
        <li key={area.id} className="area-list-item">
          <AreaItem
            areaName={area.area_name}
            habitsCount={area.habits_count}
            key={area.id}
            id={area.id}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
};

export default AreaList;
