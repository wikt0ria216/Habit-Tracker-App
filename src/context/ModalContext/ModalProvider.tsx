import { ReactNode, useState } from "react";
import { ModalContext, ModalContextType, ModalType } from "./ModalContext";
import { getCSSVariable } from "@/utils/getCSSVariable";

interface ModalProviderProps {
  children: ReactNode;
}

const DEAFULT_DURATION = getCSSVariable("--transition-duration-default") || 300;

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    if (isOpen) return;
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModalType(null), DEAFULT_DURATION);
  };

  const value: ModalContextType = { isOpen, modalType, openModal, closeModal };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
