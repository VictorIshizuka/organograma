import { JSX, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useTeamContext as useTeam } from "../hooks/TeamContext";

import { Collaborator, DevTeam } from "../types";

import { ToggleFormButton } from "../components/ToogleButton";
import { CollaboratorCard } from "../components/Card";

import { FormCollaborator } from "./formCollaborator";
import { ListTeams } from "./listTeams";
import { SearchBar } from "./searchBar";
import { FormTeam } from "./formTeam";
import { Navbar } from "./navbar";

export function Page(): JSX.Element {
  const {
    devTeams,
    addCollaborator,
    collaborators,
    addTeam,
    editCollaborator,
    editTeam,
  } = useTeam();
  const [message, setMessage] = useState<unknown | null>(null);
  const [selectedForm, setSelectedForm] = useState("form1");
  const [showForm, setShowForm] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<DevTeam | undefined>();
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<
    Collaborator | undefined
  >();

  const [visibleTeams, setVisibleTeams] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchScope, setSearchScope] = useState("all");

  const toggleTeamVisibility = (teamName: string) => {
    setVisibleTeams(prev =>
      prev.includes(teamName)
        ? prev.filter(name => name !== teamName)
        : [...prev, teamName]
    );
  };
  const filterCollaborators = (
    team: DevTeam,
    collabs: Collaborator[]
  ): Collaborator[] => {
    return collabs?.filter(collaborator => {
      const matchTeam = collaborator.team_id === team.id;
      const matchCollaborator = collaborator.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (searchScope === "collaborators") {
        return matchTeam && matchCollaborator;
      } else if (searchScope === "all") {
        return (
          matchTeam &&
          (matchCollaborator ||
            team.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      return matchTeam; // padrão para busca por times
    });
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "form1":
        return (
          <FormCollaborator
            devTeams={devTeams}
            setMessage={setMessage}
            addCollaborator={addCollaborator}
            editCollaborator={editCollaborator}
            collaboratorToEdit={collaboratorToEdit}
          />
        );
      case "form2":
        return (
          <FormTeam
            addTeam={addTeam}
            setMessage={setMessage}
            editTeam={editTeam}
            team={teamToEdit} // <- aqui usamos o state
            setSelectedForm={setSelectedForm}
          />
        );
      case "form3":
        return (
          <ListTeams
            setMessage={setMessage}
            teams={devTeams}
            setSelectedForm={setSelectedForm}
            setTeamToEdit={setTeamToEdit}
          />
        );

      default:
        return (
          <FormCollaborator
            devTeams={devTeams}
            setMessage={setMessage}
            addCollaborator={addCollaborator}
            editCollaborator={editCollaborator}
            collaboratorToEdit={collaboratorToEdit}
          />
        );
    }
  };

  return (
    <div>
      <main className="container my-4">
        <ToggleFormButton
          showForm={showForm}
          toggle={() => setShowForm(prev => !prev)}
        />
        {showForm && (
          <>
            <Navbar
              selectedForm={selectedForm}
              setSelectedForm={setSelectedForm}
            />
            {(message as string) && (
              <>
                <div className="col-12 d-flex justify-content-center">
                  <div className="alert alert-info">{message as string}</div>
                </div>
              </>
            )}
            {renderForm()}
          </>
        )}

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchScope={searchScope}
          setSearchScope={setSearchScope}
        />

        <div className="row g-4">
          {collaborators.length == 0 ? (
            <p className="text-center">Não há colaboradores cadastrados</p>
          ) : (
            devTeams
              ?.filter(team => {
                if (searchScope === "teams" || searchScope === "all") {
                  return team.name;
                  // .toLowerCase()
                  // .includes(searchTerm.toLowerCase());
                }
                return true; // se estiver buscando apenas colaboradores
              })
              .map((team, index) => {
                const filteredCollaborators = filterCollaborators(
                  team,
                  collaborators
                );

                let isVisible = visibleTeams.includes(team.name);
                if (filteredCollaborators.length === 0) return null;

                return (
                  <div key={index}>
                    <div
                      className="card h-100 shadow"
                      style={{ backgroundColor: team.color }}
                    >
                      <div className="card-header d-flex justify-content-between align-items-center text-white">
                        <h4 className="fw-bold mb-0">{team.name}</h4>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => toggleTeamVisibility(team.name)}
                        >
                          {isVisible ? (
                            <FaEyeSlash style={{ color: team.color }} />
                          ) : (
                            <FaEye style={{ color: team.color }} />
                          )}
                        </button>
                      </div>

                      {isVisible && (
                        <div className="card-body bg-light rounded-bottom d-flex flex-wrap justify-content-center">
                          {filteredCollaborators.map((collaborator, idx) => (
                            <CollaboratorCard
                              key={idx}
                              collab={collaborator}
                              setSelectedForm={setSelectedForm}
                              setCollaboratorToEdit={setCollaboratorToEdit}
                              setShowForm={setShowForm}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </main>
    </div>
  );
}
