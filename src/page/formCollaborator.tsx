import { JSX, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCollaboratorContext } from "../hooks/CollaboratorContext";

import { Collaborator, FormCollaboratorSchema } from "../types";
import { formCollaboratorSchema } from "../validation";

import { TextInput } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import { SelectInput } from "../components/Form/Select";
import { useTeamContext } from "../hooks/TeamContext";

type FormCollaboratorProps = {
  collaboratorToEdit?: Collaborator;
  setMessage: (message: string) => void;
};

export function FormCollaborator({
  setMessage,
  collaboratorToEdit,
}: FormCollaboratorProps): JSX.Element {
  const { addCollaborator, editCollaborator } = useCollaboratorContext();
  const { devTeams } = useTeamContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCollaboratorSchema>({
    resolver: yupResolver(formCollaboratorSchema),
    defaultValues: {
      name: "",
      role: "",
      githubAvatar: "",
      team_id: "",
      favorite: false,
    },
  });

  const onSubmit: SubmitHandler<FormCollaboratorSchema> = async (
    data
  ): Promise<void> => {
    const githubAvatar = data.githubAvatar
      ? `https://github.com/${data.githubAvatar}`
      : "";

    const collaboratorPayload: FormCollaboratorSchema = {
      name: data.name,
      role: data.role,
      team_id: data.team_id,
      favorite: data.favorite,
      githubAvatar,
    };

    if (collaboratorToEdit?.id) {
      const { success, message } = await editCollaborator(
        collaboratorToEdit.id,
        collaboratorPayload
      );
      if (success) setMessage(message as string);
    } else {
      const { success, message } = await addCollaborator(collaboratorPayload);
      if (success) {
        setMessage(message as string);
        reset();
      }
    }
  };

  useEffect(() => {
    if (collaboratorToEdit?.id) {
      const githubAvatar = collaboratorToEdit.githubAvatar
        ? collaboratorToEdit.githubAvatar.replace("https://github.com/", "")
        : "";
      reset({ ...collaboratorToEdit, githubAvatar });
    }
  }, [collaboratorToEdit, reset]);

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card shadow-sm w-100 h-50 p-4"
        style={{ maxWidth: "500px" }}
      >
        <h5 className="card-title text-center mb-3">
          {collaboratorToEdit?.id ? "Editar Colaborador" : "Novo Colaborador"}
        </h5>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <TextInput
              label="Nome"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="col-12 mb-3">
            <TextInput
              label="Cargo"
              name="role"
              error={errors.role?.message}
              register={register}
            />
          </div>
          <div className="col-12 mb-3">
            <TextInput
              label="Nome do GitHub"
              name="githubAvatar"
              placeholder="nome-do-github.png"
              error={errors.githubAvatar?.message}
              register={register}
            />
          </div>
          <div className="col-12 mb-3">
            <SelectInput
              label="Time"
              name="team_id"
              error={errors.team_id?.message}
              options={devTeams.map(team => ({
                label: team.name,
                value: team.id,
              }))}
              register={register}
            />
          </div>
          <div className=" col-12">
            <Button
              label="Enviar"
              className="text-white w-100"
              style={{ backgroundColor: "#6278f7" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
