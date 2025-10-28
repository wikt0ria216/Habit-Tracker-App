import { Habit } from "@/types/Habit";
interface useHabitFilterByTabProps {
  habits: Habit[] | undefined;
  activeTab: string;
}

interface UseHabitsFiltersResult {
  completedHabits: Habit[] | undefined;
  notCompletedHabits: Habit[] | undefined;
  allAreas: string[];
}

export const useHabitsFilterByTab = ({ habits, activeTab }: useHabitFilterByTabProps): UseHabitsFiltersResult => {
  const allAreas = Array.from(
    new Set(habits?.flatMap((habit) => habit.habit_areas?.map((habit_area) => habit_area.areas.area_name)))
  );

  const filteredHabits =
    activeTab === "All"
      ? habits
      : habits?.filter((habit) =>
          habit.habit_areas?.map((habit_area) => habit_area.areas.area_name).includes(activeTab)
        );

  const completedHabits = filteredHabits?.filter((habit) => habit.is_completed);
  const notCompletedHabits = filteredHabits?.filter((habit) => !habit.is_completed);

  return { completedHabits, notCompletedHabits, allAreas };
};
