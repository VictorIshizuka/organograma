export function Navbar({ selectedForm, setSelectedForm }: {
  selectedForm: string;
  setSelectedForm: (form: string) => void;}) {
  return (
   <ul className="nav  justify-content-center mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${
                selectedForm === "form1"
                  ? "active fw-bold"
                  : ""
              }`}
              style={{
                borderBottom: selectedForm === "form1" ? "4px solid #6278f7" : "4px solid transparent",
                color: selectedForm === "form1" ? "#6278f7" : "#6c757d",
              }}
              onClick={() => setSelectedForm("form1")}
            >
              Colaborador
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                selectedForm === "form2"
                  ? "active fw-bold"
                  : ""
              }`}
              style={{
                borderBottom: selectedForm === "form2" ? "4px solid #6278f7" : "4px solid transparent",
                color: selectedForm === "form2" ? "#6278f7" : "#6c757d", // cor de texto ativa e inativa
              }}
              onClick={() => setSelectedForm("form2")}
            >
              Time
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                selectedForm === "form2"
                  ? "active fw-bold"
                  : ""
              }`}
              style={{
                borderBottom: selectedForm === "form3" ? "4px solid #6278f7" : "4px solid transparent",
                color: selectedForm === "form3" ? "#6278f7" : "#6c757d", // cor de texto ativa e inativa
              }}
              onClick={() => setSelectedForm("form3")}
            >
              Times
            </button>
          </li>
        </ul>
  );
}