import { useState } from "react";
import "./App.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { GameRoom } from "./components/game/GameRoom";
import { AppPageType } from "./components/game/utils/enums";

const App = () => {
  const [page, setPage] = useState<AppPageType>("DASHBOARD");

  const navigateTo = (newPage: AppPageType) => {
    setPage(newPage);
  };

  return (
    <div id="app" role="application">
      {page === "DASHBOARD" ? (
        <Dashboard navigateTo={navigateTo} />
      ) : page === "GAMEROOM" ? (
        <GameRoom navigateTo={navigateTo} />
      ) : null}
    </div>
  );
};

export default App;
