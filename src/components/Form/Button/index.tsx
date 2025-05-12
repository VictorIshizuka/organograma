import { JSX, CSSProperties, MouseEventHandler } from "react";
import { Loading } from "../../Loading";

interface ButtonProps {
  label: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export function Button({
  label,
  loading = false,
  onClick,
  className = "",
  style = {},
  type = "submit",
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn w-md-auto ${className}`}
      style={{ backgroundColor: "#6278f7", ...style }}
      disabled={loading}
    >
      {loading ? <Loading /> : label}
    </button>
  );
}
