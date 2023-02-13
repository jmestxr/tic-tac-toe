import { useEffect, useRef } from "react";
import { AppPageType, ButtonProps } from "../game/utils/types";
import { joinGame } from "../game/utils/utils";
import "./dashboard.css";

interface DashboardProps {
  navigateTo: (appPage: AppPageType) => void;
  playerId: number;
  setGameId: React.Dispatch<React.SetStateAction<number>>;
}
export const Dashboard = ({
  navigateTo,
  playerId,
  setGameId,
}: DashboardProps) => {
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

  return (
    <main ref={dashboardRef} aria-label="Dashboard">
      <header>
        <h1 className="h1">Welcome to Tic Tac Toe, Player {playerId}!</h1>
      </header>

      <nav id="dashboard-navigation" aria-label="dashboard-buttons">
        <PlayButton handleOnClick={handleJoinGame} />
        <HistoryButton handleOnClick={() => {}} />
      </nav>
    </main>
  );
};

const PlayButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button
      onClick={handleOnClick}
      aria-label="Play Game"
      className="play-game-button game-button"
    >
      <img
        aria-hidden="true"
        className="game-icon"
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
    <button aria-label="View History" className="history-button game-button">
      <img
        aria-hidden="true"
        className="game-icon"
        src={require("../../assets/history-icon.png")}
        alt="View History Icon"
      />
      <h2 aria-hidden="true" className="h2">
        View History
      </h2>
    </button>
  );
};
