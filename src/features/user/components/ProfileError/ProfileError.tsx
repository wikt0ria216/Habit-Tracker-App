import CustomButton from "@/components/ui/CustomButton/CustomButton";
import "./profileerror.css";

interface ProfileErrorProps {
  onRetry: () => void;
}

const ProfileError = ({ onRetry }: ProfileErrorProps) => {
  return (
    <div className="profile-error">
      <p className="profile-error-text">Failed to load profile. Please try again.</p>
      <CustomButton onClick={onRetry} variant="secondary">
        Refresh
      </CustomButton>
    </div>
  );
};

export default ProfileError;
