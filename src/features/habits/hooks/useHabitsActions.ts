import { useModalContext } from "@/hooks/useModalContext";
import { useState } from "react";

export const useHabitsActions = () => {
  const [selectedHabitId, setSelectedHabitId] = useState<number | undefined>(undefined);
  const { openModal, closeModal, modalType, isOpen } = useModalContext();

  const openDeleteHabitModal = (habitId: number) => {
    setSelectedHabitId(habitId);
    openModal("delete");
  };

  const openEditHabitModal = (habitId: number) => {
    setSelectedHabitId(habitId);
    openModal("edit");
  };

  const openAddHabitModal = () => {
    openModal("add");
  };
  return {
    openEditHabitModal,
    openDeleteHabitModal,
    openAddHabitModal,
    selectedHabitId,
    closeModal,
    modalType,
    isOpen,
    setSelectedHabitId,
  };
};
