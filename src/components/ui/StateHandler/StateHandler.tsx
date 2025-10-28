import { ReactNode } from "react";

import DataSkeleton from "@/components/ui/DataSkeleton/DataSkeleton";

import "./statehandler.css";
import CustomButton from "../CustomButton/CustomButton";

interface StateHandler<T> {
  isLoading: boolean;
  isError: boolean;
  data: T[] | T | undefined;
  emptyMessage?: string | JSX.Element | null;
  errorMessage?: string | JSX.Element;
  skeletonCount?: number;
  children: ReactNode;
  centered?: boolean;
  loadingLabel?: string;
  retry?: () => void;
}

const StateHandler = <T,>({
  isLoading,
  isError,
  data,
  emptyMessage,
  errorMessage,
  skeletonCount,
  retry,
  children,
  loadingLabel = "Loading",
  centered = false,
}: StateHandler<T>) => {
  if (isLoading) {
    //if the state is loading then display skeleton
    return <>{<DataSkeleton times={skeletonCount} ariaLabel={loadingLabel} />}</>;
  }
  if (isError) {
    //any error with the API - render error message
    return (
      <div
        className={`state-handler-error-container ${centered ? "state-handler-centered" : ""}`}
        role="alert"
        aria-live="assertive"
      >
        <p className="state-handler-error">{errorMessage}</p>

        {retry && (
          <CustomButton onClick={retry} variant="accent">
            Try again
          </CustomButton>
        )}
      </div>
    );
  }

  if (!Array.isArray(data) && (data === null || data === undefined)) {
    //if an object is not an array and is null or undefined - render error message
    return (
      <div
        className={`state-handler-error-container ${centered ? "state-handler-centered" : ""}`}
        role="alert"
        aria-live="assertive"
      >
        <p className="state-handler-error">{errorMessage}</p>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0 && emptyMessage !== null) {
    //if an object is an array and is empty and has an empty message - render empty message
    return (
      <div className={centered ? "state-handler-centered" : ""} role="status" aria-live="polite">
        <p className="state-handler-empty">{emptyMessage}</p>
      </div>
    );
  }

  //if everything else is false, render the children
  return <>{children}</>;
};

export default StateHandler;
