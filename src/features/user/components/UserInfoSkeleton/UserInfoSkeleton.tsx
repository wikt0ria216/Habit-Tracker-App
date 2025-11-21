import "./userinfoskeleton.css";
import SkeletonGroup from "@/components/ui/SkeletonGroup/SkeletonGroup";
import Skeleton from "@/components/ui/Skeleton/Skeleton";

const UserInfoSkeleton = () => {
  return (
    <SkeletonGroup loadingMessage="Loading user info">
      <div className="user-info-skeleton">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="user-info-skeleton-details">
          <Skeleton variant="text" height={16} width={"60%"} />
          <Skeleton variant="text" height={14} width={"75%"} />
        </div>
      </div>
    </SkeletonGroup>
  );
};

export default UserInfoSkeleton;
