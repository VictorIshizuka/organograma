import { FaEdit, FaRegStar, FaStar, FaTrash } from "react-icons/fa";

import { useCollaboratorContext } from "./../hooks/CollaboratorContext";

import { Collaborator } from "../types";
import { formatName } from "../helpers/formatName";
import { Card } from "../components/Card";

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
  setShowForm,
}: CollaboratorCardProps) => {
  const { deleteCollaborator, toggleFavorite } = useCollaboratorContext();

  const handleEdit = (collab: Collaborator) => {
    setSelectedForm("form1");
    setShowForm(true);
    setCollaboratorToEdit(collab);
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
    <Card
      className="mb-3 shadow-sm mx-2 d-flex flex-column"
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
          className="rounded-circle object-cover"
          style={{ width: "80px", height: "80px" }}
        />
      </div>
      <div className="card-body text-center p-2">
        <h6 className="card-title mb-1 fw-bold">{formatName(collab.name)}</h6>
        <p className="card-text text-muted small mb-0">{collab.role}</p>
        <div className="flex gap-4 items-center">
          <a
            className="mx-1"
            onClick={() => handleFavorite(collab.id, collab.favorite)}
          >
            {collab.favorite ? (
              <FaStar style={{ color: "yellow", cursor: "pointer" }} />
            ) : (
              <FaRegStar style={{ color: "gray", cursor: "pointer" }} />
            )}
          </a>
          <a className="mx-1" onClick={() => handleEdit(collab)}>
            <FaEdit style={{ color: "#a88732", cursor: "pointer" }} />
          </a>
          <a className="mx-1" onClick={() => handleDelete(collab.id)}>
            <FaTrash style={{ color: "red", cursor: "pointer" }} />
          </a>
        </div>
      </div>
    </Card>
  );
};