import { ReactNode } from "react";
import classNames from "classnames";

import "./card.css";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerExtra?: ReactNode;
  ariaLabel?: string;
}

const Card = ({ title, children, className, headerExtra, ariaLabel = "Card" }: CardProps) => {
  const cardClasses = classNames("card", className);
  const titleId = `card-title-${title?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={cardClasses}
      tabIndex={0}
      {...(title ? { "aria-labelledby": titleId } : { "aria-label": ariaLabel })}
    >
      {(title || headerExtra) && (
        <>
          <div className="card-header">
            {title && <h2 id={titleId}>{title}</h2>}
            {headerExtra && <div className="card-header-extra">{headerExtra}</div>}
          </div>
        </>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
