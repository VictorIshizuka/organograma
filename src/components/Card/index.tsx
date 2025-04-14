import { FaEdit, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { useTeamContext } from "../../hooks/TeamContext";
import { Collaborator } from "../../types";

interface CollaboratorCardProps {
  collab: Collaborator;
  setSelectedForm: (form: string) => void;
  setCollaboratorToEdit: (collab?: Collaborator) => void;
  setShowForm: (show: boolean) => void;
}

export const CollaboratorCard = ({
  collab,
  setSelectedForm,
  setCollaboratorToEdit,
  setShowForm
}: CollaboratorCardProps) => {
  const { deleteCollaborator, toggleFavorite } = useTeamContext();

  const handleEdit = (collab: Collaborator) => {
    setSelectedForm("form1");
    setShowForm(true);
    // setMessage(`Editando o time: ${team.name}`);
    setCollaboratorToEdit(collab); // <- Aqui!
  };
  const formatName = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length <= 2) return fullName;
    return `${parts[0]} ${parts
      .slice(1, -1)
      .map(p => p[0] + ".")
      .join(" ")} ${parts[parts.length - 1]}`;
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar?")) {
      await deleteCollaborator(id);
    }
  };

  const handleFavorite = async (id: string, currentFavorite: boolean) => {
    await toggleFavorite(id, currentFavorite);
  };
  return (
    <div
      className="card mb-3 shadow-sm mx-2 d-flex flex-column align-items-center"
      style={{
        width: "180px",
        minHeight: "200px",
      }}
    >
      <div className="card-header bg-white text-center border-0 w-100 d-flex justify-content-center">
        <img
          src={
            collab.githubAvatar
              ? collab.githubAvatar
              : "https://avatars.githubusercontent.com/u/583231?v=4"
          }
          alt={collab.name}
          className="rounded-circle"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="card-body text-center p-2">
        <h6 className="card-title mb-1 fw-bold">{formatName(collab.name)}</h6>
        <p className="card-text text-muted small mb-0">{collab.role}</p>
        <div className="flex gap-4 items-center">
          <button
            className="mx-1"
            onClick={() => handleFavorite(collab.id, collab.favorite)}
          >
            {collab.favorite ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-400" />
            )}
          </button>

          <button className="mx-1" onClick={() => handleEdit(collab)}>
            <FaEdit className="text-blue-500 hover:text-blue-700" />
          </button>

          <button className="mx-1" onClick={() => handleDelete(collab.id)}>
            <FaTrash className="text-red-500 hover:text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
