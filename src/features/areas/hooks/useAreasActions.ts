import { useModalContext } from "@/hooks/useModalContext";
import { useState } from "react";

export const useAreasActions = () => {
  const { openModal, closeModal, isOpen, modalType } = useModalContext();
  const [selectedAreaId, setSelectedAreaId] = useState<number | undefined>(undefined);

  const openDeleteAreaModal = (areaId: number) => {
    setSelectedAreaId(areaId);
    openModal("delete");
  };

  const openEditAreaModal = (areaId: number) => {
    setSelectedAreaId(areaId);
    openModal("edit");
  };

  const openAddAreaModal = () => {
    openModal("add");
  };

  return {
    openDeleteAreaModal,
    openAddAreaModal,
    isOpen,
    modalType,
    closeModal,
    openEditAreaModal,
    selectedAreaId,
  };
};
