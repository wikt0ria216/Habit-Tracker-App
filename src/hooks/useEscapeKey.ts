import { useEffect } from "react";

interface UseEscapeKey {
  callback: () => void;
  isActive?: boolean;
}

export const useEscapeKey = ({ callback, isActive = true }: UseEscapeKey) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keyup", handleEscKey);

    return () => {
      document.removeEventListener("keyup", handleEscKey);
    };
  }, [callback, isActive]);
};
