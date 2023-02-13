import { useEffect, useRef, useState } from "react";
import {
  AppPageType,
  BoardStateType,
  ButtonProps,
  GameResultType,
} from "./utils/types";
import { Board } from "./Board";
import {
  deleteGame,
  getBoardState,
  getEmptyBoardState,
  getLastMove,
  getPlayers,
  isWaitingGame,
  isWaitingMove,
  SQUARE_POSITIONS,
} from "./utils/utils";

import "./game-room.css";

interface GameRoomProps {
  playerId: number;
  gameId: number;
  navigateTo: (appPage: AppPageType) => void;
}
export const GameRoom = ({ playerId, gameId, navigateTo }: GameRoomProps) => {
  const gameRoomRef = useRef<HTMLElement | null>(null);

  const [opponentId, setOpponentId] = useState(0);

  const [waitingGame, setWaitingGame] = useState(true);

  const [waitingMove, setWaitingMove] = useState(true);

  const [lastMove, setLastMove] = useState<Record<string, number> | null>(null);

  const [gameResult, setGameResult] = useState<GameResultType>("U");

  const [boardState, setBoardState] = useState<BoardStateType>(
    getEmptyBoardState()
  );

  useEffect(() => {
    gameRoomRef.current?.focus();
    return () => {
      gameRoomRef.current?.blur();
    };
  });

  useEffect(() => {
    waitGame().then(() =>
      setTimeout(() => {
        setWaitingGame(false);
        startGame();
      }, 2000)
    );
  }, []);

  const waitGame = async () => {
    let waiting = true;
    while (waiting) {
      const isWaiting = await isWaitingGame(gameId);
      if (isWaiting !== null && isWaiting !== undefined) {
        waiting = isWaiting;
      }
    }

    const players = await getPlayers(gameId);
    const player1 = players?.player1_id as number;
    const player2 = players?.player2_id as number;
    const opponentId = playerId === player1 ? player2 : player1;
    setOpponentId(opponentId);

    const announcer = document.getElementById("game-announcer");
    if (announcer)
      announcer.innerHTML = `Game begins! You are playing against Player ${opponentId}.`;
  };

  const startGame = async () => {
    let isEnd = false;

    while (!isEnd) {
      const isWaiting = await isWaitingMove(
        gameId,
        playerId
      ); /* Determine if it's the other player's turn. */
      if (isWaiting !== null && isWaiting !== undefined) {
        setWaitingMove(isWaiting);

        /* Update the last move on the board. */
        const lastMove = await getLastMove(gameId);
        if (lastMove) setLastMove(lastMove);

        /* Update the board state. */
        let latestBoardState = await getBoardState(gameId);
        setBoardState(latestBoardState);

        /* Update the game result. */
        const gameResult = getGameResult(latestBoardState);
        setGameResult(gameResult);
        isEnd = gameResult !== "U";
        if (isEnd) {
          setWaitingGame(false);
          setWaitingMove(false);
          await deleteGame(gameId);
        }
      }
    }
  };

  const isGameEnd = () => {
    return gameResult !== "U";
  };

  const getGameAnnouncement = () => {
    if (!isGameEnd()) {
      if (waitingGame) {
        return "Waiting for a player...";
      } else if (waitingMove) {
        return `${
          lastMove
            ? `You have moved on ${
                SQUARE_POSITIONS[lastMove.row_position][lastMove.col_position]
              } square. `
            : ""
        }Opponent's turn!`;
      } else {
        return `${
          lastMove
            ? `Player ${opponentId} moves on ${
                SQUARE_POSITIONS[lastMove.row_position][lastMove.col_position]
              } square. `
            : ""
        }Your turn!`;
      }
    } else if (gameResult === "D") {
      return "It's a draw!";
    } else {
      const winner = lastMove?.player_id as number;
      return winner === playerId ? "You have won!" : "You have lost!";
    }
  };

  return (
    <main ref={gameRoomRef} aria-label="Game Room">
      <header>
        <h2
          id="game-announcer"
          role="alert"
          aria-live="assertive"
          className="h2"
        >
          {getGameAnnouncement()}
        </h2>
      </header>
      <Board
        playerId={playerId}
        gameId={gameId}
        boardState={boardState}
        isDisabled={waitingGame || waitingMove}
        isFinished={gameResult !== "U"}
      />
      {isGameEnd() && (
        <QuitGameButton handleOnClick={() => navigateTo("DASHBOARD")} />
      )}
    </main>
  );
};

const QuitGameButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button
      aria-label="Quit Game"
      onClick={handleOnClick}
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

const getGameResult = (boardState: BoardStateType): GameResultType => {
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
    const comparator = boardState[ai][aj];
    if (
      comparator &&
      comparator === boardState[bi][bj] &&
      comparator === boardState[ci][cj]
    ) {
      return comparator;
    }
  }

  if (hasNoMoreMoves(boardState)) return "D";

  return "U";
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
