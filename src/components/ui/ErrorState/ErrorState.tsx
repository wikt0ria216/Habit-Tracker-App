import { ReactNode } from "react";
import "./errorstate.css";
interface ErrorStateProps {
  action?: ReactNode;
  message?: string;
}

const ErrorState = ({ action, message }: ErrorStateProps) => {
  return (
    <div className="error-state" role="alert">
      <p className="error-state-message">{message}</p>
      {action && <div className="error-state-action">{action}</div>}
    </div>
  );
};

export default ErrorState;
