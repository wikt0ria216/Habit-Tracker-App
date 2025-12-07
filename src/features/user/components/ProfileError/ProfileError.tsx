import CustomButton from "@/components/ui/CustomButton/CustomButton";
import "./profileerror.css";

interface ProfileErrorProps {
  onRetry: () => void;
}

const ProfileError = ({ onRetry }: ProfileErrorProps) => {
  return (
    <div className="profile-error" role="alert">
      <p className="profile-error-text">Failed to load profile. Please try again.</p>
      <CustomButton onClick={onRetry} variant="secondary">
        Try again
      </CustomButton>
    </div>
  );
};

export default ProfileError;
