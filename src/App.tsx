import { useEffect, useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { GameRoom } from "./components/game/GameRoom";
import { AppPageType } from "./components/game/utils/types";
import { createPlayer, deletePlayer } from "./components/game/utils/utils";
import "./App.css";
import { OnBoarding } from "./components/onboarding/OnBoarding";

const App = () => {
  const [page, setPage] = useState<AppPageType>("ONBOARDING");

  const [playerId, setPlayerId] = useState(0);

  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    // createSession();
  }, []);

  const navigateTo = (newPage: AppPageType) => {
    setPage(newPage);
  };

  return (
    <div aria-live="assertive" id="app" role="application">
      {page === "ONBOARDING" ? (
        <OnBoarding setPlayerId={setPlayerId} navigateTo={navigateTo} />
      ) : page === "DASHBOARD" ? (
        <Dashboard
          navigateTo={navigateTo}
          playerId={playerId}
          setGameId={setGameId}
        />
      ) : page === "GAMEROOM" ? (
        <GameRoom playerId={playerId} gameId={gameId} navigateTo={navigateTo} />
      ) : null}
    </div>
  );
};

export default App;
