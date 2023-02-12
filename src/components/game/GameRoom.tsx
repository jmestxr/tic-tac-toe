import { useEffect, useRef, useState } from "react";
import {
  AppPageType,
  BoardStateType,
  PlayerType,
  SquareStateType,
} from "./utils/enums";
import { Board } from "./Board";
import { getEmptyBoardState } from "./utils/utils";

import "./game-room.css";

interface GameRoomProps {
  navigateTo: (appPage: AppPageType) => void;
}
export const GameRoom = ({ navigateTo }: GameRoomProps) => {
  const gameRoomRef = useRef<HTMLElement | null>(null);

  const [boardState, setBoardState] = useState<BoardStateType>(
    getEmptyBoardState()
  );

  useEffect(() => {
    gameRoomRef.current?.focus();
    return () => {
      gameRoomRef.current?.blur();
    }
  })

  useEffect(() => {
    getBoardState();
  }, []);

  const getBoardState = () => {
    /* Get and set most updated board state from database */
  };

  const updateBoardState = (currPlayer: PlayerType, position: number[]) => {
    const [x, y] = position;

    setBoardState((prevState) => {
      const newState = prevState.slice();
      newState[x][y] = currPlayer;
      return newState;
    });
  };

  const getGameState = () => {
    const winner = getWinner(boardState);
    if (winner) {
      return `Player ${winner} wins!`;
    } else if (hasNoMoreMoves(boardState)) {
      return `Draw!`;
    } else {
      return "Waiting for the other player...";
    }
  };

  return (
    <main ref={gameRoomRef} aria-label="Game Room">
      <header>
        <h2 aria-live="assertive" className="h2">{getGameState()}</h2>
      </header>
      <Board boardState={boardState} updateBoardState={updateBoardState} />
      <QuitGameButton navigateTo={navigateTo} />
    </main>
  );
};

interface QuitGameButtonProps {
  navigateTo: (appPage: AppPageType) => void;
}
const QuitGameButton = ({ navigateTo }: QuitGameButtonProps) => {
  return (
    <button
      aria-label="Quit Game"
      onClick={() => navigateTo("DASHBOARD")}
      className="quit-game-button"
    >
      <p aria-hidden="true" className="p1 quit-game-button-label">
        Quit Game
      </p>
      <img
        aria-hidden="true"
        src={require("../../assets/quit-game-icon.png")}
        className="quit-game-icon"
      />
    </button>
  );
};

const getWinner = (boardState: BoardStateType): SquareStateType => {
  const winningStates = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let i = 0; i < winningStates.length; i++) {
    const [[ai, aj], [bi, bj], [ci, cj]] = winningStates[i];
    if (
      boardState[ai][aj] &&
      boardState[ai][aj] === boardState[bi][bj] &&
      boardState[ai][aj] === boardState[ci][cj]
    ) {
      return boardState[ai][aj];
    }
  }
  return "";
};

const hasNoMoreMoves = (boardState: BoardStateType) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const squareState = boardState[i][j];
      if (squareState === "") return false;
    }
  }
  return true;
};