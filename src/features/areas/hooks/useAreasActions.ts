import { useModalContext } from "@/hooks/useModalContext";
import { Area } from "@/types/Area";
import { useState } from "react";

export const useAreasActions = () => {
  const { openModal, closeModal, isOpen, modalType } = useModalContext();
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const openDeleteAreaModal = (area: Area) => {
    setSelectedArea(area);
    openModal("delete");
  };

  const openEditAreaModal = (area: Area) => {
    setSelectedArea(area);
    openModal("edit");
  };

  const openAddAreaModal = () => {
    openModal("add");
    setSelectedArea(null);
  };

  return {
    openDeleteAreaModal,
    openAddAreaModal,
    isOpen,
    modalType,
    closeModal,
    selectedArea,
    openEditAreaModal,
  };
};
