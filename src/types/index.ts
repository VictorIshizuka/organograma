export interface Collaborator {
  id: string;
  name: string;
  role: string;
  team_id: string;
  githubAvatar: string;
  favorite: boolean;
}

export interface DevTeam {
  id: string;
  name: string;
  color: string;
}

export interface FormCollaboratorSchema extends Omit<Collaborator, "id"> {}

export interface FormTeamSchema extends Omit<DevTeam, "id"> {}