import { useEffect, useRef } from "react";
import { ButtonProps, PageProps } from "../game/utils/types";
import { deletePlayer, joinGame } from "../game/utils/utils";
import "./dashboard.css";

interface DashboardProps {
  playerId: number;
  setGameId: React.Dispatch<React.SetStateAction<number>>;
}
export const Dashboard = ({
  playerId,
  setGameId,
  navigateTo,
}: DashboardProps & PageProps) => {
  const dashboardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    dashboardRef.current?.focus();
    return () => {
      dashboardRef.current?.blur();
    };
  });

  const handleJoinGame = async () => {
    const joinedGameId = await joinGame(playerId);
    if (joinedGameId) setGameId(joinedGameId);
    navigateTo("GAMEROOM");
  };

  const handleEndSession = async () => {
    await deletePlayer(playerId);
    navigateTo("ONBOARDING");
  };

  return (
    <main id="dashboard" ref={dashboardRef} aria-label="Dashboard">
      <header>
        <h1 className="h1">Welcome to Tic Tac Toe, Player {playerId}!</h1>
      </header>

      <nav id="dashboard-nav" aria-label="dashboard-buttons">
        <PlayButton handleOnClick={handleJoinGame} />
        <HistoryButton handleOnClick={() => {}} />
      </nav>
      <footer id="dashboard-footer">
        <ExitButton handleOnClick={handleEndSession} />
      </footer>
    </main>
  );
};

const PlayButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button
      id="play-game-button"
      onClick={handleOnClick}
      aria-label="Play Game"
      className="game-button"
    >
      <img
        id="game-icon"
        aria-hidden="true"
        src={require("../../assets/play-game-icon.png")}
        alt="Play Game Icon"
      />
      <h2 aria-hidden="true" className="h2">
        Play Game
      </h2>
    </button>
  );
};

const HistoryButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button
      id="history-button"
      aria-label="View History"
      className="game-button"
    >
      <img
        id="game-icon"
        aria-hidden="true"
        src={require("../../assets/history-icon.png")}
        alt="View History Icon"
      />
      <h2 aria-hidden="true" className="h2">
        View History
      </h2>
    </button>
  );
};

const ExitButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button id="exit-button" aria-label="Exit Now" onClick={handleOnClick}>
      <h3 id="exit-button-label" aria-hidden="true" className="h3">
        Exit Now
      </h3>
    </button>
  );
};
