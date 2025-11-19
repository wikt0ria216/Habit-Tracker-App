import SkeletonGroup from "@/components/ui/SkeletonGroup/SkeletonGroup";
import "./profileskeleton.css";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
const ProfileSkeleton = () => {
  return (
    <SkeletonGroup loadingMessage="Loading profile form">
      <div className="profile-skeleton">
        <div className="profile-skeleton-avatar-section">
          <Skeleton variant="circular" width={96} height={96} />
          <div className="profile-skeleton-avatar-controls">
            <Skeleton variant="rounded" height={40} width={80} />
            <Skeleton variant="text" width={150} />
          </div>
        </div>
        <div className="profile-skeleton-inputs">
          <div className="profile-skeleton-input">
            <div className="skeleton-profile-input-label">
              <Skeleton variant="text" width={80} />
            </div>
            <Skeleton variant="rounded" height={40} />
          </div>
          <div className="profile-skeleton-input">
            <div className="skeleton-profile-input-label">
              <Skeleton variant="text" width={80} />
            </div>
            <Skeleton variant="rounded" height={40} />
          </div>
          <div className="profile-skeleton-input">
            <div className="skeleton-profile-input-label">
              <Skeleton variant="text" width={80} />
            </div>
            <Skeleton variant="rounded" height={40} />
          </div>
        </div>
        <div className="skeleton-profile-buttons">
          <Skeleton variant="rounded" height={40} width={100} />
          <Skeleton variant="rounded" height={40} width={100} />
        </div>
      </div>
    </SkeletonGroup>
  );
};

export default ProfileSkeleton;
