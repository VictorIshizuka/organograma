import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabaseClient";

import { Collaborator } from "../types";

interface CollaboratorContextType {
  collaborators: Collaborator[];
  addCollaborator: (
    collaborator: Omit<Collaborator, "id">
  ) => Promise<Record<string, string | boolean>>;
  editCollaborator: (
    id: string,
    collaborator: Partial<Collaborator>
  ) => Promise<Record<string, string | boolean>>;
  deleteCollaborator: (
    collaborator_id: string
  ) => Promise<Record<string, string | boolean>>;
  toggleFavorite: (
    collaborator_id: string,
    currentFavorite: boolean
  ) => Promise<Record<string, string | boolean>>;
  fetchCollaborators: () => Promise<void>;
}

const CollaboratorContext = createContext<CollaboratorContextType>(
  {} as CollaboratorContextType
);

export const useCollaboratorContext = () => useContext(CollaboratorContext);

export const CollaboratorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const fetchCollaborators = async () => {
    const { data, error } = await supabase.from("collaborators").select("*");
    if (!error && data) setCollaborators(data);
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
    fetchCollaborators();
  }, []);

  return (
    <CollaboratorContext.Provider
      value={{
        collaborators,
        addCollaborator,
        fetchCollaborators,
        editCollaborator,
        deleteCollaborator,
        toggleFavorite,
      }}
    >
      {children}
    </CollaboratorContext.Provider>
  );
};
