import { ReactNode } from "react";
import "./statehandler.css";
import CustomButton from "../CustomButton/CustomButton";
import { SkeletonProps } from "../Skeleton/Skeleton";
import SkeletonList from "../SkeletonList/SkeletonList";

interface StateHandler<T> {
  isLoading: boolean;
  isError: boolean;
  data: T[] | T | undefined;
  emptyMessage?: string | JSX.Element | null;
  errorMessage?: string | JSX.Element;
  skeletonCount?: number;
  skeletonProps?: Omit<SkeletonProps, "isSingle" | "loadingMessage">;
  skeletonGap?: string | number;
  children: ReactNode;
  centered?: boolean;
  loadingLabel?: string;
  retry: () => void;
}

const StateHandler = <T,>({
  isLoading,
  isError,
  data,
  emptyMessage,
  errorMessage = "Something went wrong. Please try again.",
  skeletonCount = 5,
  skeletonProps = { height: 60, variant: "rounded" },
  skeletonGap = 16,
  retry,
  children,
  loadingLabel = "Loading content",
  centered = false,
}: StateHandler<T>) => {
  if (isLoading) {
    //if the state is loading then display skeleton
    return (
      <>
        {
          <SkeletonList
            count={skeletonCount}
            loadingMessage={loadingLabel}
            skeletonProps={skeletonProps}
            gap={skeletonGap}
          />
        }
      </>
    );
  }
  if (isError) {
    //any error with the API - render error message
    return (
      <div className={`state-handler-error-container ${centered ? "state-handler-centered" : ""}`} role="alert">
        <p className="state-handler-error">{errorMessage}</p>

        <CustomButton onClick={retry} variant="accent">
          Try again
        </CustomButton>
      </div>
    );
  }

  if (!Array.isArray(data) && (data === null || data === undefined)) {
    //if an object is not an array and is null or undefined - render error message
    return (
      <div className={`state-handler-error-container ${centered ? "state-handler-centered" : ""}`} role="alert">
        <p className="state-handler-error">{errorMessage}</p>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0 && emptyMessage !== null) {
    //if an object is an array and is empty and has an empty message - render empty message
    return (
      <div className={centered ? "state-handler-centered" : ""}>
        <p className="state-handler-empty">{emptyMessage}</p>
      </div>
    );
  }

  //if everything else is false, render the children
  return <>{children}</>;
};

export default StateHandler;
