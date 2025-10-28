import "./progressbar.css";

interface ProgressBarProps {
  percentage: number;
  strokeWidth?: number;
  size?: number;
  trackColor?: string;
  progressColor?: string;
  text?: string;
  textColor?: string;
  ariaLabel?: string;
}

const ProgressBar = ({
  percentage = 25,
  strokeWidth = 11,
  size = 120,
  trackColor = "var(--bg-secondary-medium)",
  progressColor = "var(--bg-accent)",
  text,
  ariaLabel = "Progress",
  textColor = "var(--text-accent)",
}: ProgressBarProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const validPercentage = percentage > 100 ? 100 : percentage;

  const offset = circumference - (validPercentage / 100) * circumference;

  return (
    <div
      className="circular-progress-bar"
      style={{ width: size, height: size + 70 }}
      role="progressbar"
      aria-valuenow={Math.round(validPercentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <svg width={size} height={size} aria-hidden="true">
        <circle
          className="circular-progress-bar-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={trackColor}
          fill={"transparent"}
          strokeLinecap="round"
        />
        <circle
          className="circular-progress-bar-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={progressColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill={"transparent"}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="var(--text-3xl)"
          fontWeight="var(--font-weight-bold)"
          dominantBaseline="middle"
          className="circular-progress-bar-percentage"
          fill={textColor}
        >
          {Math.round(validPercentage)}%
        </text>
        {text && (
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="var(--text-sml)"
            className="circular-progress-bar-text"
            fill="var(--text-secondary)"
          >
            {text}
          </text>
        )}
      </svg>
      <div className="circular-progress-bar-status" aria-hidden="true">
        <div className="status-indicator">
          <svg width="18" height="18" viewBox="0 0 18 18" fill={trackColor}>
            <circle cx="8" cy="8" r="7" fill={trackColor}></circle>
          </svg>
          <p className="status-indicator-label">Pending habits</p>
        </div>
        <div className="status-indicator" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill={progressColor}>
            <circle cx="9" cy="9" r="7" fill={progressColor}></circle>
          </svg>
          <p className="status-indicator-label">Completed habits</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
