import StateHandler from "@/components/ui/StateHandler/StateHandler";
import { Area } from "@/types/Area";
import { ReactNode } from "react";

interface AreaStateHandlerProps {
  isLoading: boolean;
  isError: boolean;
  areas: Area[] | undefined;
  emptyMessage?: string;
  children: ReactNode;
  loadingLoader?: string;
  onRetry?: () => void;
}

const AreaStateHandler = ({
  isLoading,
  isError,
  areas,
  emptyMessage = "No areas to display.",
  loadingLoader = "Loading areas",
  onRetry,
  children,
}: AreaStateHandlerProps) => {
  return (
    <StateHandler<Area>
      isLoading={isLoading}
      isError={isError}
      data={areas}
      emptyMessage={emptyMessage}
      errorMessage="Failed to load areas. Please try again."
      loadingLabel={loadingLoader}
      onRetry={onRetry}
    >
      {children}
    </StateHandler>
  );
};

export default AreaStateHandler;
