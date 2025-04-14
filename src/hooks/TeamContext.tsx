import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { DevTeam, Collaborator } from "../types";

interface TeamContextType {
  devTeams: DevTeam[];
  collaborators: Collaborator[];
  addTeam: (team: Omit<DevTeam, "id">) => Promise<Record<string, unknown>>;
  editTeam: (
    id: string,
    team: Partial<DevTeam>
  ) => Promise<Record<string, unknown>>;
  addCollaborator: (
    collaborator: Omit<Collaborator, "id">
  ) => Promise<Record<string, unknown>>;
  editCollaborator: (
    id: string,
    collaborator: Partial<Collaborator>
  ) => Promise<Record<string, unknown>>;
  deleteCollaborator: (
    collaborator_id: string
  ) => Promise<Record<string, unknown>>;
  toggleFavorite: (
    collaborator_id: string,
    currentFavorite: boolean
  ) => Promise<Record<string, unknown>>;
  fetchTeams: (from?: number, to?: number) => Promise<Record<string, unknown>>;
  fetchCollaborators: () => Promise<void>;
  deleteTeam: (team_id: string) => Promise<Record<string, unknown>>;
}

const TeamContext = createContext<TeamContextType>({} as TeamContextType);

export const useTeamContext = () => useContext(TeamContext);

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [devTeams, setTeams] = useState<DevTeam[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const fetchTeams = async (from?: number, to?: number) => {
    const { data, count, error } = await supabase
      .from("teams")
      .select("*", { count: "exact" })
      .range(from ?? 0, to ?? 8);

    if (!error && data) {
      setTeams(data);
      return { success: true, total: count ?? 0 };
    }

    return { success: false, total: 0 };
  };

  const fetchCollaborators = async () => {
    const { data, error } = await supabase.from("collaborators").select("*");
    if (!error && data) setCollaborators(data);
  };

  const addTeam = async (team: Omit<DevTeam, "id">) => {
    const { error } = await supabase.from("teams").insert(team);
    if (error) {
      return { success: false, message: error.message };
    }

    await fetchTeams();
    return { success: true, message: "Time adicionado com sucesso!" };
  };

  const editTeam = async (id: string, team: Partial<DevTeam>) => {
    const { error } = await supabase.from("teams").update(team).eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    await fetchTeams();
    return { success: true, message: "Time editado com sucesso!" };
  };

  const deleteTeam = async (id: string) => {
    const { error } = await supabase.from("teams").delete().eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }

    await fetchTeams();
    return { success: true, message: "Time deletado com sucesso!" };
  };

  const addCollaborator = async (collaborator: Omit<Collaborator, "id">) => {
    const { error } = await supabase.from("collaborators").insert(collaborator);

    if (error) {
      return { success: false, message: error.message };
    }

    await fetchCollaborators();
    return { success: true, message: "Colaborador adicionado com sucesso!" };
  };

  const editCollaborator = async (
    id: string,
    collaborator: Partial<Collaborator>
  ) => {
    console.log({ collaborator });
    const { error } = await supabase
      .from("collaborators")
      .update(collaborator)
      .eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    await fetchCollaborators();
    return { success: true, message: "Colaborador atualizado com sucesso!" };
  };

  const deleteCollaborator = async (id: string) => {
    const { error } = await supabase
      .from("collaborators")
      .delete()
      .eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }

    await fetchCollaborators();
    return { success: true, message: "Colaborador deletado com sucesso!" };
  };

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    const response = await editCollaborator(id, { favorite: !currentFavorite });
    return response;
  };

  useEffect(() => {
    fetchTeams();
    fetchCollaborators();
  }, []);

  return (
    <TeamContext.Provider
      value={{
        devTeams,
        collaborators,
        addTeam,
        addCollaborator,
        fetchTeams,
        fetchCollaborators,
        editCollaborator,
        deleteCollaborator,
        toggleFavorite,
        deleteTeam,
        editTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
