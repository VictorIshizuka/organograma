export interface Collaborator {
  name: string;
  role: string;
  team_id: string;
  githubAvatar: string | null;
  id: string;
  favorite: boolean;
}

export interface DevTeam {
  id: string;
  name: string;
  color: string;
}
