import { ReactNode } from "react";
import { SkeletonProps } from "../Skeleton/Skeleton";
import SkeletonList from "../SkeletonList/SkeletonList";
import EmptyState from "../EmptyState/EmptyState";
import ErrorState from "../ErrorState/ErrorState";
import CustomButton from "../CustomButton/CustomButton";

interface StateHandler<T> {
  isLoading: boolean;
  isError: boolean;
  data: T[] | T | undefined;
  emptyMessage?: string;
  errorMessage?: string;
  skeletonCount?: number;
  skeletonProps?: Omit<SkeletonProps, "isSingle" | "loadingMessage">;
  skeletonGap?: string | number;
  customSkeleton?: ReactNode;
  customError?: ReactNode;
  children: ReactNode;
  loadingLabel?: string;
  onRetry?: () => void;
}

const StateHandler = <T,>({
  isLoading,
  isError,
  data,
  emptyMessage,
  errorMessage,
  skeletonCount = 5,
  skeletonProps = { height: 60, variant: "rounded" },
  skeletonGap = 16,
  customSkeleton,
  customError,
  onRetry,
  children,
  loadingLabel,
}: StateHandler<T>) => {
  if (isLoading) {
    if (customSkeleton) {
      return <>{customSkeleton}</>;
    }
    return (
      <SkeletonList
        count={skeletonCount}
        loadingMessage={loadingLabel}
        skeletonProps={skeletonProps}
        gap={skeletonGap}
      />
    );
  }

  if (isError) {
    if (customError) {
      return <>{customError}</>;
    }
    return (
      <ErrorState
        message={errorMessage}
        action={
          onRetry && (
            <CustomButton onClick={onRetry} variant="secondary">
              Try again
            </CustomButton>
          )
        }
      />
    );
  }

  const isArrayData = Array.isArray(data);

  if (isArrayData) {
    if (!Array.isArray(data)) {
      return <ErrorState message="Invalid data type: expected array" />;
    }

    if (data.length === 0) {
      return <EmptyState message={emptyMessage} />;
    }

    return <>{children}</>;
  }

  return <>{children}</>;
};

export default StateHandler;
