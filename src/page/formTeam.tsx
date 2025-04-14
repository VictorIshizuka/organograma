import { useRef, useEffect } from "react";
import { TextInput } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import { DevTeam } from "../types";

export function FormTeam({
  addTeam,
  setMessage,
  team,
  editTeam,
  setSelectedForm
}: {
  addTeam: (team: Omit<DevTeam, "id">) => Promise<Record<string, unknown>>;
  setSelectedForm: (form: string) => void;
  editTeam: (
    id: string,
    team: Partial<DevTeam>
  ) => Promise<Record<string, unknown>>;
  team?: DevTeam;
  setMessage: (message: unknown) => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  console.log({ entrou: team });

  useEffect(() => {
    if (team && nameRef.current && colorRef.current) {
      nameRef.current.value = team.name;
      colorRef.current.value = team.color;
    }
  }, [team]);

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card shadow-sm w-100 h-50 p-4"
        style={{ maxWidth: "500px" }}
      >
        <h5 className="card-title text-center mb-4">
          {team?.id ? "Editar" : "Novo"} Time
        </h5>
        <form
          className="row"
          onSubmit={async e => {
            e.preventDefault();
            const name = nameRef.current?.value;
            const color = colorRef.current?.value;

            if (team?.id) {
              const { success, message } = await editTeam(team.id, {
                name,
                color,
              });
              setMessage(message);
              if (success) {
                // limpa os campos
                if (nameRef.current) nameRef.current.value = "";
                if (colorRef.current) colorRef.current.value = "#000000"; // ou cor padrão
              }
              setSelectedForm("form3");
              return;
            }

            if (!name || !color) {
              setMessage("Preencha todos os campos.");
              return;
            }
            const { success, message } = await addTeam({ name, color });
            setMessage(message);
            if (success) {
              // limpa os campos
              if (nameRef.current) nameRef.current.value = "";
              if (colorRef.current) colorRef.current.value = "#000000"; // ou cor padrão
            }
            setSelectedForm("form3");
          }}
        >
          <div className="col-12 mb-3">
            <TextInput ref={nameRef} name="name" label="Nome" />
          </div>
          <div className="col-12 mb-3">
            <TextInput type="color" ref={colorRef} name="color" label="Cor" />
          </div>
          <div className=" col-12">
            <Button label={team?.id ? "Salvar" : "Cadastrar"} />
          </div>
        </form>
      </div>
    </div>
  );
}
