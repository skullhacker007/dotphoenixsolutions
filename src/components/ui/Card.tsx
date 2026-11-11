import React, { forwardRef } from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={`ui-card ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
});

export default Card;
