import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ToggleButton = ({
  show,
  isForm = false,
  toggle,
  color = "#6278f7",
  className = "",
}: {
  className?: string;
  show?: boolean;
  isForm: boolean;
  toggle: () => void;
  color?: string;
}) => (
  <button
    className={`btn  ${className}`}
    style={{ color, borderColor: color }}
    onClick={toggle}
  >
    {show ? <FaEyeSlash /> : <FaEye />}
    {isForm ? (show ? "Ocultar Formulários" : "Mostrar Formulários") : ""}
  </button>
);
