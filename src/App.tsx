import { useEffect, useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { GameRoom } from "./components/game/GameRoom";
import { AppPageType } from "./components/game/utils/types";
import { createPlayer, deletePlayer } from "./components/game/utils/utils";
import "./App.css";

const App = () => {
  const [page, setPage] = useState<AppPageType>("DASHBOARD");

  const [playerId, setPlayerId] = useState(0);

  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    createSession();
  }, []);

  /* End current session on refresh */
  window.addEventListener("beforeunload", () => {
    endSession();
    return "Ended current session.";
  });
  /* End current session on window close */
  window.addEventListener("unload", () => {
    endSession();
    return "Ended current session.";
  });

  const createSession = async () => {
    const newPlayerId = await createPlayer();
    if (newPlayerId) setPlayerId(newPlayerId);
  };

  const endSession = async () => {
    await deletePlayer(playerId);
  };

  const navigateTo = (newPage: AppPageType) => {
    setPage(newPage);
  };

  return (
    <div id="app" role="application">
      {page === "DASHBOARD" ? (
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
