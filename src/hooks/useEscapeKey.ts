import { useEffect } from "react";

interface UseEscapeKey {
  callback: () => void;
}

export const useEscapeKey = ({ callback }: UseEscapeKey) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keyup", handleEscKey);

    return () => {
      document.removeEventListener("keyup", handleEscKey);
    };
  }, [callback]);
};

