import { Habit } from "@/types/Habit";
import { useMemo } from "react";
import { jsWeekDays } from "@/utils/daysUtils";

interface useFilteredHabitsByDateProps {
  habits: Habit[] | undefined;
  dateOption: "today" | "tomorrow";
}

export const useFilteredHabitsByDate = ({ habits, dateOption }: useFilteredHabitsByDateProps) => {
  const filteredHabits = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const date = dateOption === "today" ? today : tomorrow;
    const dayOfWeek = jsWeekDays[date.getDay()];
    const dayOfMonth = String(date.getDate());

    return habits?.filter((habit) => {
      const { frequency, days } = habit;

      if (!frequency || !days) return false;

      if (frequency === "daily") {
        return true;
      } else if (frequency === "weekly") {
        return days?.includes(dayOfWeek);
      } else if (frequency === "monthly") {
        return days?.includes(dayOfMonth);
      } else {
        return false;
      }
    });
  }, [dateOption, habits]);

  return { filteredHabits };
};
