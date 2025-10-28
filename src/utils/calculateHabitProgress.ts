import { Habit } from "@/types/Habit";

export const calculateHabitProgress = (habits: Habit[] | undefined) => {
  if (!habits || habits.length === 0) return 0;

  const completedHabits = habits.filter((habit) => habit.is_completed).length;
  const totalHabits = habits.length;

  return Math.round((completedHabits / totalHabits) * 100);
};
