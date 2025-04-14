import { Header } from "./components/Header/index.tsx";
import { TeamProvider } from "./hooks/TeamContext.tsx";
import { Page } from "./page";

function App() {
  return (
    <>
      <Header />
      <TeamProvider>
        <Page />
      </TeamProvider>
    </>
  );
}

export default App;
