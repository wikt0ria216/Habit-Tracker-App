import Skeleton, { SkeletonProps } from "../Skeleton/Skeleton";
import SkeletonGroup from "../SkeletonGroup/SkeletonGroup";

interface SkeletonListProps {
  count: number;
  loadingMessage?: string;
  gap?: string | number;
  skeletonProps?: Omit<SkeletonProps, "isSingle" | "loadingMessage">;
}

const SkeletonList = ({ count, gap, loadingMessage, skeletonProps }: SkeletonListProps) => {
  const containerStyle: React.CSSProperties | undefined = gap
    ? {
        display: "flex",
        flexDirection: "column",
        gap,
      }
    : undefined;

  return (
    <SkeletonGroup loadingMessage={loadingMessage}>
      <div style={containerStyle}>
        {Array.from({ length: count }, (_, i) => (
          <Skeleton key={i} {...skeletonProps} />
        ))}
      </div>
    </SkeletonGroup>
  );
};

export default SkeletonList;
