import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTeamContext } from "../hooks/TeamContext";

import { DevTeam, FormTeamSchema } from "../types";
import { formTeamSchema } from "../validation";

import { TextInput } from "../components/Form/Input";
import { Button } from "../components/Form/Button";

type FormTeamProps = {
  setMessage: (message: string) => void;
  teamToEdit: DevTeam | undefined;
  setSelectedForm: (form: string) => void;
};
export function FormTeam({
  setMessage,
  teamToEdit,
  setSelectedForm,
}: FormTeamProps) {
  const { addTeam, editTeam } = useTeamContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTeamSchema>({
    resolver: yupResolver(formTeamSchema),
    defaultValues: {
      name: "",
      color: "#000000",
    },
  });

  const onSubmit: SubmitHandler<FormTeamSchema> = async (
    data
  ): Promise<void> => {
    const teamPayload: FormTeamSchema = {
      name: data.name,
      color: data.color,
    };

    if (teamToEdit?.id) {
      const { success, message } = await editTeam(teamToEdit.id, teamPayload);
      if (success) setMessage(message as string);
    } else {
      const { success, message } = await addTeam(teamPayload);
      if (success) setMessage(message as string);
    }
    setSelectedForm("form3");
  };

  useEffect(() => {
    if (teamToEdit?.id) {
      reset({ ...teamToEdit });
    }
  }, [teamToEdit]);

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card shadow-sm w-100 h-50 p-4"
        style={{ maxWidth: "500px" }}
      >
        <h5 className="card-title text-center mb-4">
          {teamToEdit?.id ? "Editar" : "Novo"} Time
        </h5>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <TextInput
              name="name"
              label="Nome"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="col-12 mb-3">
            <TextInput
              type="color"
              name="color"
              label="Cor"
              error={errors.color?.message}
              register={register}
            />
          </div>
          <div className=" col-12">
            <Button label={teamToEdit?.id ? "Salvar" : "Cadastrar"} />
          </div>
        </form>
      </div>
    </div>
  );
}
