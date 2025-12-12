import { useModalContext } from "@/hooks/useModalContext";
import { Habit } from "@/types/Habit";
import { useState } from "react";

export const useHabitsActions = () => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const { openModal, closeModal, modalType, isOpen } = useModalContext();

  const openDeleteHabitModal = (habit: Habit) => {
    setSelectedHabit(habit);
    openModal("delete");
  };

  const openEditHabitModal = (habit: Habit) => {
    setSelectedHabit(habit);
    openModal("edit");
  };

  const openAddHabitModal = () => {
    setSelectedHabit(null);
    openModal("add");
  };
  return {
    openEditHabitModal,
    openDeleteHabitModal,
    openAddHabitModal,
    selectedHabit,
    closeModal,
    modalType,
    isOpen,
  };
};
