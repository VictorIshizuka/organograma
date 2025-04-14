import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ToggleFormButton = ({
  showForm,
  toggle,
  color = "#6278f7",
}: {
  showForm: boolean;
  toggle: () => void;
  color?: string;
}) => (
  <div className="d-flex justify-content-center mb-3">
    <button
      className="btn btn-outline d-flex align-items-center gap-2"
      style={{ color, borderColor: color }}
      onClick={toggle}
    >
      {showForm ? <FaEyeSlash /> : <FaEye />}
      {showForm ? "Ocultar Formulários" : "Mostrar Formulários"}
    </button>
  </div>
);
