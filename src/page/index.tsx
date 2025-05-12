import { JSX, useEffect, useState } from "react";

import { useCollaboratorContext } from "../hooks/CollaboratorContext";
import { useTeamContext as useTeam } from "../hooks/TeamContext";

import { Collaborator, DevTeam } from "../types";

import { ToggleButton } from "../components/ToogleButton";
import { Card } from "../components/Card";
import { Toast } from "../components/Toast";

import { FormCollaborator } from "./formCollaborator";
import { ListTeams } from "./listTeams";
import { SearchBar } from "./searchBar";
import { FormTeam } from "./formTeam";
import { Navbar } from "./navbar";
import { CollaboratorCard } from "./itemCollaborator";

export function Page(): JSX.Element {
  const { devTeams } = useTeam();
  const { collaborators } = useCollaboratorContext();

  const [message, setMessage] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState("form1");
  const [showForm, setShowForm] = useState(false);

  const [visibleTeams, setVisibleTeams] = useState<string[]>([]);
  const [teamToEdit, setTeamToEdit] = useState<DevTeam | undefined>();
  const [collaboratorToEdit, setCollaboratorToEdit] = useState<
    Collaborator | undefined
  >();

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
    const formProps = { setMessage };

    switch (selectedForm) {
      case "form1":
        return (
          <FormCollaborator
            {...formProps}
            collaboratorToEdit={collaboratorToEdit}
          />
        );
      case "form2":
        return (
          <FormTeam
            {...formProps}
            teamToEdit={teamToEdit}
            setSelectedForm={setSelectedForm}
          />
        );
      case "form3":
        return (
          <ListTeams
            {...formProps}
            setSelectedForm={setSelectedForm}
            setTeamToEdit={setTeamToEdit}
          />
        );
      default:
        return (
          <FormCollaborator
            {...formProps}
            collaboratorToEdit={collaboratorToEdit}
          />
        );
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div>
      <main className="container my-4">
        <div className="d-flex justify-content-center mb-3">
          <ToggleButton
            className="btn-outline d-flex align-items-center gap-2"
            show={showForm}
            isForm={true}
            toggle={() => setShowForm(prev => !prev)}
          />
        </div>
        {showForm && (
          <>
            <Navbar
              selectedForm={selectedForm}
              setSelectedForm={setSelectedForm}
            />
            {message && (
              <div className="col-12 d-flex justify-content-center">
                <Toast message={message} />
              </div>
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
            <p className="text-center">Não há colaboradores cadastrados...</p>
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
                    <Card
                      className="shadow"
                      style={{ backgroundColor: team.color }}
                      classNameHeader="d-flex justify-content-between align-items-center text-white w-100"
                      headerCard={
                        <>
                          <h4 className="fw-bold mb-0">{team.name}</h4>
                          <ToggleButton
                            className="btn-sm btn-light"
                            show={isVisible}
                            color={team.color}
                            toggle={() => toggleTeamVisibility(team.name)}
                            isForm={false}
                          />
                        </>
                      }
                    >
                      {isVisible && (
                        <div className="d-flex flex-wrap justify-content-center">
                          {filteredCollaborators?.map((collaborator, idx) => (
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
                    </Card>
                  </div>
                );
              })
          )}
        </div>
      </main>
    </div>
  );
}
