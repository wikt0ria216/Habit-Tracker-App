import HabitItem from "@features/habits/components/HabitItem/HabitItem";

import { Habit } from "@/types/Habit";

import "./HabitList.css";
interface HabitListProps {
  habits: Habit[] | undefined;
  isReadOnly?: boolean;
  ignoreCompletedStyle?: boolean;
  showActions?: boolean;
  showCheckbox?: boolean;
  onDelete?: (habitId: number) => void;
  onEdit?: (habitId: number) => void;
  ariaLabel?: string;
}

const HabitList = ({
  habits,
  onEdit,
  onDelete,
  isReadOnly,
  ignoreCompletedStyle,
  showActions,
  ariaLabel,
  showCheckbox,
}: HabitListProps) => {
  return (
    <ul className="habit-list" aria-label={ariaLabel}>
      {habits?.map((habit) => (
        <li key={habit.id} className="habit-list-item">
          <HabitItem
            name={habit.habit_name}
            isCompleted={habit.is_completed}
            onEdit={onEdit}
            areas={habit.habit_areas?.map((habit) => habit.areas.area_name)}
            onDelete={onDelete}
            id={habit.id}
            isReadOnly={isReadOnly}
            ignoreCompletedStyle={ignoreCompletedStyle}
            showActions={showActions}
            showCheckbox={showCheckbox}
          />
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
