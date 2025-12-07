import { ReactNode, useId } from "react";
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
  const headerId = useId();

  return (
    <section
      className={cardClasses}
      aria-label={!title ? ariaLabel : undefined}
      aria-labelledby={title ? headerId : undefined}
    >
      {(title || headerExtra) && (
        <>
          <div className="card-header">
            {title && <h2 id={headerId}>{title}</h2>}
            {headerExtra && <div className="card-header-extra">{headerExtra}</div>}
          </div>
        </>
      )}
      <div className="card-body">{children}</div>
    </section>
  );
};

export default Card;
