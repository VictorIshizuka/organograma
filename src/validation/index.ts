import * as yup from "yup";

export const formCollaboratorSchema = yup.object({
  name: yup.string().required("Nomel é obrigatório"),
  role: yup.string().required("Cargo é obrigatório"),
  team_id: yup.string().required("Time é obrigatório"),
  favorite: yup.boolean().default(false),
  githubAvatar: yup.string().default(""),

});

export const formTeamSchema = yup.object({
  name: yup.string().required("Nomel é obrigatório"),
  color: yup.string().required("Cor é obrigatória"),
});
