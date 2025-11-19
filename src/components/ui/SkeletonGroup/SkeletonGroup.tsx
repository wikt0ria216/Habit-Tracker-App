import { ReactNode } from "react";
interface SkeletonGroupProps {
  children: ReactNode;
  loadingMessage?: string;
}

const SkeletonGroup = ({ children, loadingMessage = "Loading content" }: SkeletonGroupProps) => {
  return (
    <div aria-busy="true" aria-live="polite" role="status" className="skeleton-group">
      <span className="sr-only">{loadingMessage}</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
};

export default SkeletonGroup;
