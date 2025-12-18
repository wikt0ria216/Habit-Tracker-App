import "./emptystate.css";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;
