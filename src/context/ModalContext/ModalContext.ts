import { createContext } from "react";
export type ModalType = "add" | "edit" | "delete" | null;

export interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  animationDuration?: number;
  openModal: (type: ModalType, animationDuration?: number) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
