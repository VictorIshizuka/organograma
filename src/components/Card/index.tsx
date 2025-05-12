import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children?: ReactNode;
  headerCard?: ReactNode;
  footerCard?: ReactNode;
  className?: string;
  classNameHeader?: string;
  style?: CSSProperties;
}

export const Card = ({
  headerCard,
  children,
  footerCard,
  className = "",
  classNameHeader = "",
  style,
}: CardProps) => {
  return (
    <div className={`card align-items-center ${className}`}>
      {headerCard && (
        <div className={`card-header ${classNameHeader}`} style={{ ...style }}>
          {headerCard}
        </div>
      )}
      <div className="card-body text-center p-2 w-100">{children}</div>
      {footerCard && (
        <div className="card-footer w-100 text-center">
          {footerCard}
        </div>
      )}
    </div>
  );
};
