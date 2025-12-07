import "./progressbar.css";

interface ProgressBarProps {
  percentage: number;
  thickness?: number;
  size?: number;
  trackColor?: string;
  progressColor?: string;
  ariaLabel?: string;
}

const ProgressBar = ({
  percentage,
  thickness = 8,
  size = 180,
  trackColor = "var(--bg-secondary-medium)",
  progressColor = "var(--bg-accent)",
  ariaLabel = "Progress",
}: ProgressBarProps) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const validPercentage = percentage > 100 ? 100 : percentage;

  const offset = circumference - (validPercentage / 100) * circumference;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: size }}
        role="progressbar"
        aria-valuenow={validPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${validPercentage}%`}
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <div className="progress-bar-shape" aria-hidden="true">
          <div className="progress-bar-value">
            <span>{percentage}%</span>
          </div>{" "}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            strokeLinecap="round"
            width={size}
            height={size}
            strokeWidth={thickness}
          >
            <circle cx={50} cy={50} r={radius} className="progress-bar-track" stroke={trackColor} fill="none"></circle>
            <circle
              className="progress-bar-fill"
              cx={50}
              cy={50}
              r={radius}
              strokeDashoffset={offset}
              strokeDasharray={circumference}
              transform={`rotate(-90 50 50)`}
              stroke={progressColor}
              fill="none"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
