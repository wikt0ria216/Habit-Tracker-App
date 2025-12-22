import HabitItem from "@features/habits/components/HabitItem/HabitItem";

import { Habit } from "@/types/Habit";

import "./habitlist.css";
interface HabitListProps {
  habits: Habit[] | undefined;
  isReadOnly?: boolean;
  ignoreCompletedStyle?: boolean;
  showActions?: boolean;
  showCheckbox?: boolean;
  onDelete?: (habit: Habit) => void;
  onEdit?: (habit: Habit) => void;
}

const HabitList = ({
  habits,
  onEdit,
  onDelete,
  isReadOnly,
  ignoreCompletedStyle,
  showActions,
  showCheckbox,
}: HabitListProps) => {
  return (
    <ul className="habit-list">
      {habits?.map((habit) => (
        <li key={habit.id} className="habit-list-item">
          <HabitItem
            name={habit.habit_name}
            isCompleted={habit.is_completed}
            onEdit={onEdit}
            areas={habit.habit_areas?.map((habit) => habit.areas.area_name)}
            onDelete={onDelete}
            id={habit.id}
            habit={habit}
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
