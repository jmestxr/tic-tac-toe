import { AppPageType } from "../game/utils/enums";
import "./dashboard.css";

interface DashboardProps {
  navigateTo: (appPage: AppPageType) => void;
}

export const Dashboard = ({ navigateTo }: DashboardProps) => {
  return (
    <div role="dialog" aria-label="Dashboard">
      <header>
        <h1 className="h1">Welcome to Tic Tac Toe</h1>
      </header>

      <nav id="dashboard-navigation" aria-label="dashboard-buttons">
        <button
          onClick={() => navigateTo("GAME")}
          aria-label="Create New Game"
          className="new-game-button game-button"
        >
          <img
            aria-hidden="true"
            className="game-icon"
            src={require("../../assets/new-game-icon.png")}
            alt="New Game Icon"
          />
          <h2 aria-hidden="true" className="h2">
            Create New Game
          </h2>
        </button>
        <button
          aria-label="Join Existing Game"
          className="join-game-button game-button"
        >
          <img
            aria-hidden="true"
            className="game-icon"
            src={require("../../assets/join-game-icon.png")}
            alt="Join Game Icon"
          />
          <h2 aria-hidden="true" className="h2">
            Join Existing Game
          </h2>
        </button>
      </nav>
    </div>
  );
};
