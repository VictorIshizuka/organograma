import { Header } from "./components/Header/index.tsx";
import { CollaboratorProvider } from "./hooks/CollaboratorContext.tsx";
import { TeamProvider } from "./hooks/TeamContext.tsx";
import { Page } from "./page";

function App() {
  return (
    <>
      <Header />
      <TeamProvider>
        <CollaboratorProvider>
        <Page />
        </CollaboratorProvider>
      </TeamProvider>
    </>
  );
}

export default App;
