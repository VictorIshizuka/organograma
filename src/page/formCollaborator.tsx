import { JSX, useEffect, useRef } from "react";
import { TextInput } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import { Collaborator, DevTeam } from "../types";

export function FormCollaborator({
  devTeams,
  addCollaborator,
  setMessage,
  editCollaborator,
  collaboratorToEdit,
}: {
  devTeams: DevTeam[];
  collaboratorToEdit?: Collaborator;
  editCollaborator: (
    id: string,
    collaborator: Partial<Collaborator>
  ) => Promise<Record<string, unknown>>;
  addCollaborator: (
    collaborator: Omit<Collaborator, "id">
  ) => Promise<Record<string, unknown>>;
  setMessage: (message: unknown) => void;
}): JSX.Element {
  const nameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const teamRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (collaboratorToEdit?.id) {
      if (nameRef.current)
        nameRef.current.value = collaboratorToEdit.name ?? "";
      if (roleRef.current)
        roleRef.current.value = collaboratorToEdit.role ?? "";
      if (photoRef.current) {
        photoRef.current.value = collaboratorToEdit.githubAvatar
          ? collaboratorToEdit.githubAvatar.replace("https://github.com/", "")
          : "";
      }
      if (teamRef.current)
        teamRef.current.value = collaboratorToEdit.team_id ?? "";
    }
  }, [collaboratorToEdit]);
  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card shadow-sm w-100 h-50 p-4"
        style={{ maxWidth: "500px" }}
      >
        <h5 className="card-title text-center mb-4">
          {collaboratorToEdit?.id ? "Editar Colaborador" : "Novo Colaborador"}
        </h5>
        <form
          className="row"
          onSubmit={async e => {
            e.preventDefault();

            const name = nameRef.current?.value;
            const role = roleRef.current?.value;
            const photo = photoRef.current?.value;
            const team = teamRef.current?.value;

            if (!name || !role || !team) {
              setMessage("Preencha todos os campos.");
              return;
            }
            console.log({ collaboratorToEdit });
            if (collaboratorToEdit?.id) {
              const githubAvatar = photo ? "https://github.com/" + photo : null;

              const { success, message } = await editCollaborator(
                collaboratorToEdit.id,
                {
                  name,
                  role,
                  team_id: team,
                  githubAvatar,
                }
              );
              
              if (success) {
                setMessage(message);
              }
              return;
            }
            const { success, message } = await addCollaborator({
              name,
              role,
              team_id: team,
              githubAvatar: photo ? "https://github.com/" + photo : null,
              favorite: false,
            });
            if (success) {
              setMessage(message);
              nameRef.current!.value = "";
              roleRef.current!.value = "";
              photoRef.current!.value = "";
              teamRef.current!.value = "";
            }
          }}
        >
          <div className="col-12 mb-3">
            <TextInput ref={nameRef} name="name" label="Nome" />
          </div>
          <div className="col-12 mb-3">
            <TextInput ref={roleRef} name="role" label="Cargo" />
          </div>
          <div className="col-12 mb-3">
            <TextInput
              ref={photoRef}
              name="photo"
              label="Link do Colaborador"
              placeholder="nome_no_github.png"
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Time</label>
            <select ref={teamRef} className="form-select" defaultValue="">
              <option disabled value="">
                Selecione o time
              </option>
              {devTeams?.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className=" col-12">
            <Button label="Enviar" />
          </div>
        </form>
      </div>
    </div>
  );
}
