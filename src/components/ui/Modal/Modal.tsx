import { ReactNode, useId, useRef } from "react";
import { createPortal } from "react-dom";

import CustomButton from "@ui//CustomButton/CustomButton";

import { Close } from "@assets/icons/index";

import "./modal.css";
import { useMountTransition } from "@/hooks/useMountTransition";
import useFocusTrap from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useEscapeKey } from "@/hooks/useEscapeKey";

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isModalOpen: boolean;
  actions?: ReactNode;
}

const Modal = ({ children, title, onClose, isModalOpen, actions }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const hasModalTransitionedIn = useMountTransition({ isMounted: isModalOpen });
  useFocusTrap(modalRef, isModalOpen, { initialFocus: "first" });
  useLockBodyScroll(isModalOpen);
  useEscapeKey({ callback: onClose });

  const id = useId();

  const titleId = `${id}-modal-title`;

  return createPortal(
    <>
      {(hasModalTransitionedIn || isModalOpen) && (
        <>
          <div
            ref={modalRef}
            className={`modal ${isModalOpen ? "visible" : ""} ${hasModalTransitionedIn ? "in" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="modal-top">
              <h2 className="modal-title" id={titleId}>
                {title}
              </h2>
              <CustomButton
                icon={<Close size={24} />}
                onClick={onClose}
                variant="ghost"
                size="sm"
                ariaLabel="Close dialog"
              />
            </div>
            <div className="modal-body">{children}</div>
            {actions && <div className="modal-actions">{actions}</div>}
          </div>
          <div
            className={`modal-backdrop ${isModalOpen ? "visible" : ""} ${hasModalTransitionedIn ? "in" : ""}`}
            onClick={onClose}
            aria-hidden="true"
          ></div>
        </>
      )}
    </>,

    document.body
  );
};

export default Modal;
