import "./dashboard.css";

export const Dashboard = () => {
  return (
    <div>
         <h1 className="h1">Welcome to Tic Tac Toe!</h1>


      <div role="heading" aria-label="dashboard-buttons" className="game-container">
        <button aria-label="create-new-game" className="new-game-button game-button">
          <img
            className="game-icon"
            src={require("../../assets/new-game-icon.png")}
            alt="New Game Icon"
          />
          <h2 aria-hidden="true" className="h2">Create New Game</h2>
        </button>
        <button aria-label="join-existing-game" className="join-game-button game-button">
          <img
            className="game-icon"
            src={require("../../assets/join-game-icon.png")}
            alt="Join Game Icon"
          />
          <h2 aria-hidden="true" className="h2">Join Existing Game</h2>
        </button>
      </div>
    </div>
  );
};
