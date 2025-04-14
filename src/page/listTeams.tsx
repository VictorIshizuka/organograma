import { FaEdit, FaTrash } from "react-icons/fa";

import { useTeamContext } from "../hooks/TeamContext";

import { DevTeam } from "../types";
import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export function ListTeams({
  setMessage,
  teams,
  setSelectedForm,
  setTeamToEdit,
}: {
  setMessage: (message: unknown) => void;
  setSelectedForm: (form: string) => void;
  setTeamToEdit: (team?: DevTeam) => void;
  teams: DevTeam[];
}) {
  const { deleteTeam, collaborators, fetchTeams } = useTeamContext();

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [total, setTotal] = useState(0);

  const itensPorPagina = 5;
  const handleDelete = async (team: DevTeam) => {
    const collaboratorsTeam = collaborators.filter(
      collaborator => collaborator.team_id === team.id
    );
    if (collaboratorsTeam.length > 0) {
      const confirmDelete = window.confirm(
        `O time "${team.name}" possui ${collaboratorsTeam.length} colaborador(es).\n\nDeseja deletar o time e todos os colaboradores vinculados?`
      );
      const { success, message } = await deleteTeam(team.id);
      if (success) {
        setMessage(message);
      }

      if (!confirmDelete) return;
    } else {
      const confirmDelete = window.confirm(
        `Tem certeza que deseja deletar o time "${team.name}"?`
      );
      const { success, message } = await deleteTeam(team.id);
      if (success) {
        setMessage(message);
      }
      if (!confirmDelete) return;
    }
  };

  const handleEdit = (team: DevTeam) => {
    setSelectedForm("form2");
    // setMessage(`Editando o time: ${team.name}`);
    setTeamToEdit(team); // <- Aqui!
  };

  useEffect(() => {
    const carregarTimes = async () => {
      const from = (paginaAtual - 1) * itensPorPagina;
      const to = from + itensPorPagina - 1;
      const { total } = await fetchTeams(from, to);
      setTotal(total as number);
    };

    carregarTimes();
  }, [paginaAtual]);

  const totalPaginas = Math.ceil(total / itensPorPagina);

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card shadow-sm w-100 h-50 p-4"
        style={{ maxWidth: "500px" }}
      >
        <h5 className="card-title text-center mb-4">Times</h5>
        <ul className="list-group">
          {teams.map(team => (
            <li
              key={team.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{team.name}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => handleEdit(team)}>
                  <FaEdit />
                </button>
                <button
                  // className="btn btn-outline-danger"
                  onClick={() => handleDelete(team)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <button
            className="border-0"
            style={{ cursor: "pointer", color: "#6278f7" }}
            onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
            disabled={paginaAtual === 1}
          >
            <IoChevronBack />
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            className="border-0"
            style={{ cursor: "pointer", color: "#6278f7" }}
            onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  );
}
