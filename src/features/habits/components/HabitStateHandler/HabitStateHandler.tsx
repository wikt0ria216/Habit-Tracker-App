import StateHandler from "@/components/ui/StateHandler/StateHandler";
import { Habit } from "@/types/Habit";
import { ReactNode } from "react";

interface HabitStateHandlerProps {
  habits: Habit[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  children: ReactNode;
  loadingLabel?: string;
  onRetry: () => void;
}

const HabitStateHandler = ({
  habits,
  isLoading,
  isError,
  children,
  emptyMessage,
  onRetry,
  loadingLabel,
  errorMessage,
}: HabitStateHandlerProps) => {
  return (
    <StateHandler<Habit>
      isLoading={isLoading}
      isError={isError}
      data={habits}
      emptyMessage={emptyMessage}
      errorMessage={errorMessage ? errorMessage : "Failed to load habits. Try again later."}
      centered
      loadingLabel={loadingLabel}
      onRetry={onRetry}
    >
      {children}
    </StateHandler>
  );
};

export default HabitStateHandler;
