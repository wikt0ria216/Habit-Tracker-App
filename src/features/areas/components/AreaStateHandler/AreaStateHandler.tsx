import StateHandler from "@/components/ui/StateHandler/StateHandler";
import { Area } from "@/types/Area";
import { ReactNode } from "react";

interface AreaStateHandlerProps {
  isLoading: boolean;
  isError: boolean;
  areas: Area[] | undefined;
  emptyMessage?: string;
  errorMessage?: string;
  children: ReactNode;
  loadingLoader?: string;
  retry?: () => void;
}

const AreaStateHandler = ({
  isLoading,
  isError,
  areas,
  emptyMessage,
  errorMessage,
  loadingLoader,
  retry,
  children,
}: AreaStateHandlerProps) => {
  return (
    <StateHandler<Area>
      isLoading={isLoading}
      isError={isError}
      data={areas}
      centered
      emptyMessage={emptyMessage}
      errorMessage={errorMessage ? errorMessage : "Failed to load areas. Try again later."}
      skeletonCount={5}
      loadingLabel={loadingLoader}
      retry={retry}
    >
      {children}
    </StateHandler>
  );
};

export default AreaStateHandler;
