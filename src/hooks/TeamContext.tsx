import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabaseClient";

import { DevTeam } from "../types";

interface TeamContextType {
  devTeams: DevTeam[];
  addTeam: (team: Omit<DevTeam, "id">) => Promise<Record<string, unknown>>;
  editTeam: (
    id: string,
    team: Partial<DevTeam>
  ) => Promise<Record<string, unknown>>;
  fetchTeams: (from?: number, to?: number) => Promise<Record<string, unknown>>;
  deleteTeam: (team_id: string) => Promise<Record<string, unknown>>;
}

const TeamContext = createContext<TeamContextType>({} as TeamContextType);

export const useTeamContext = () => useContext(TeamContext);

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [devTeams, setTeams] = useState<DevTeam[]>([]);

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

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider
      value={{
        devTeams,
        addTeam,
        fetchTeams,
        deleteTeam,
        editTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
