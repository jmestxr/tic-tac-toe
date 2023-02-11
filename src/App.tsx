import { useState } from "react";
import "./App.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Game } from "./components/game/Game";
import { AppPageType } from "./components/game/utils/enums";

const App = () => {
  const [page, setPage] = useState<AppPageType>("DASHBOARD");

  const navigateTo = (newPage: AppPageType) => {
    setPage(newPage);
  };

  return (
    <div className="app">
      {page === "DASHBOARD" ? (
        <Dashboard navigateTo={navigateTo} />
      ) : page === "GAME" ? (
        <Game navigateTo={navigateTo} />
      ) : null}
    </div>
  );
}

export default App;
