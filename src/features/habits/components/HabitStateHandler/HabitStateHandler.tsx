import StateHandler from "@/components/ui/StateHandler/StateHandler";
import { Habit } from "@/types/Habit";
import { ReactNode } from "react";

interface HabitStateHandlerProps {
  habits: Habit[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
  children: ReactNode;
  loadingLabel?: string;
  onRetry?: () => void;
}

const HabitStateHandler = ({
  habits,
  isLoading,
  isError,
  children,
  emptyMessage = "No habits to display",
  onRetry,
  loadingLabel = "Loading habits",
}: HabitStateHandlerProps) => {
  return (
    <StateHandler<Habit>
      isLoading={isLoading}
      isError={isError}
      data={habits}
      emptyMessage={emptyMessage}
      errorMessage="Failed to load habits. Please try again."
      loadingLabel={loadingLabel}
      onRetry={onRetry}
    >
      {children}
    </StateHandler>
  );
};

export default HabitStateHandler;
