import CustomButton from "@/components/ui/CustomButton/CustomButton";
import { AlertCircle, RefreshCw } from "@/assets/icons";
import "./userinfoerror.css";

interface UserInfoErrorProps {
  onRetry: () => void;
  message?: string;
}

const UserInfoError = ({ onRetry, message = "Failed to load user info" }: UserInfoErrorProps) => {
  return (
    <div className="user-info-error" role="status" aria-live="polite">
      <div className="user-info-error-icon" aria-hidden="true">
        <AlertCircle size={24} />
      </div>

      <div className="user-info-error-content">
        <p className="user-info-error-title">Profile unavailable</p>
        <p className="user-info-error-message">{message}</p>
      </div>

      <CustomButton
        size="sm"
        variant="ghost"
        icon={<RefreshCw size={16} />}
        onClick={onRetry}
        ariaLabel="Retry loading user data"
      />
    </div>
  );
};

export default UserInfoError;
