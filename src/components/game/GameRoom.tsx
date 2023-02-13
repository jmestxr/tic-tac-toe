import { useEffect, useRef, useState } from "react";
import {
  AppPageType,
  BoardStateType,
  ButtonProps,
  GameResultType,
  PageProps,
  PlayerType,
  SquareStateType,
} from "./utils/types";
import { Board } from "./Board";
import {
  checkIsGameExists,
  checkIsWaitingGame,
  checkIsWaitingMove,
  deleteGame,
  getBoardState,
  getEmptyBoardState,
  getLastMove,
  getPlayers,
  SQUARE_POSITIONS,
} from "./utils/utils";

import "./game-room.css";

interface GameRoomProps {
  playerId: number;
  gameId: number;
}
export const GameRoom = ({
  playerId,
  gameId,
  navigateTo,
}: GameRoomProps & PageProps) => {
  const gameRoomRef = useRef<HTMLElement | null>(null);

  const [isGameSessionExists, setIsGameSessionExists] = useState(true);

  const [opponentId, setOpponentId] = useState(0);

  const [isWaitingGame, setIsWaitingGame] = useState(true);

  const [isWaitingMove, setIsWaitingMove] = useState(true);

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
    waitGame().then((waitingResult) => {
      if (waitingResult) {
        setTimeout(() => {
          setIsWaitingGame(false);
          startGame();
        }, 3500);
      }
    });
  }, []);

  /**
   * Waits for an opponent to enter the game room to start.
   * @returns true if a new player has entered the game room. false if an existing player in the room
   *      that arrived before this player has left prematurely.
   */
  const waitGame = async () => {
    let isWaiting = true;
    while (isWaiting) {
      isWaiting = await checkIsWaitingGame(gameId);

      if (!isWaiting) {
        const players = await getPlayers(gameId);
        const player1 = players?.player1_id as number;
        const player2 = players?.player2_id as number;
        const opponentId = playerId === player1 ? player2 : player1;
        setOpponentId(opponentId);

        announceMessage(
          `Game begins! You are playing against Player ${opponentId}.`
        );
      }

      const isGameSessionExists = await checkIsGameExists(gameId);
      setIsGameSessionExists(isGameSessionExists);
      if (!isGameSessionExists) return false;
    }
    return true;
  };

  /**
   * Starts the tic-tac-toe gameplay with the opponent player.
   * @returns true if the game ends successfully (win/lose/draw); false if otherwise.
   */
  const startGame = async () => {
    let isEnd = false;

    while (!isEnd) {
      const isGameSessionExists = await checkIsGameExists(gameId);
      setIsGameSessionExists(isGameSessionExists);
      if (!isGameSessionExists) return (isEnd = true);

      const isWaitingMove = await checkIsWaitingMove(gameId, playerId);
      setIsWaitingMove(isWaitingMove);

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
        /* Update the last move on the board. */
        const lastMove = await getLastMove(gameId);
        if (lastMove) setLastMove(lastMove);

        setIsWaitingGame(false);
        setIsWaitingMove(false);
      }
    }

    return true;
  };

  const isGameEnd = () => {
    return gameResult !== "U";
  };

  const getGameAnnouncement = () => {
    if (!isGameEnd()) {
      if (isWaitingGame && isGameSessionExists) {
        return `Welcome to Game ${gameId}. Waiting for a player...`;
      } else if (isWaitingMove && isGameSessionExists) {
        return `${
          lastMove
            ? `You have moved on ${
                SQUARE_POSITIONS[lastMove.row_position][lastMove.col_position]
              } square. `
            : ""
        }Opponent's turn!`;
      } else if (isGameSessionExists) {
        return `${
          lastMove
            ? `Player ${opponentId} moves on ${
                SQUARE_POSITIONS[lastMove.row_position][lastMove.col_position]
              } square. `
            : ""
        }Your turn!`;
      } else {
        return `Oops! Player ${opponentId} has left! Please exit and join another game.`;
      }
    } else if (gameResult === "D") {
      return "It's a draw!";
    } else {
      const winner = lastMove?.player_id as number;
      return winner === playerId ? "You have won!" : "You have lost!";
    }
  };

  const announceMessage = (message: string) => {
    const announcer = document.getElementById("game-announcer");
    if (announcer) announcer.innerHTML = message;
  };

  const handleQuitGame = async () => {
    await deleteGame(gameId);
    navigateTo("DASHBOARD");
  };

  return (
    <main
      id="game-room"
      ref={gameRoomRef}
      aria-label="Game Room"
      aria-live="assertive"
    >
      <header aria-atomic="true" aria-live="assertive">
        <h2 id="game-announcer" aria-live="assertive" className="h2">
          {getGameAnnouncement()}
        </h2>
      </header>
      <Board
        playerId={playerId}
        gameId={gameId}
        boardState={boardState}
        isDisabled={isWaitingGame || isWaitingMove || !isGameSessionExists}
        isFinished={gameResult !== "U"}
      />
      <div id="gameroom-buttons" aria-label="GameRoom Buttons">
        <AnnounceBoardButton
          boardState={boardState}
          lastMove={lastMove}
          playerId={playerId}
        />
        <QuitGameButton handleOnClick={handleQuitGame} />
      </div>
    </main>
  );
};

interface AnnounceBoardButtonProps {
  boardState: BoardStateType;
  lastMove: Record<string, number> | null;
  playerId: number;
}
const AnnounceBoardButton = ({
  boardState,
  lastMove,
  playerId,
}: AnnounceBoardButtonProps) => {
  const announceBoard = () => {
    if (!lastMove) {
      return invokeAnnouncer("No player has made a move yet.");
    }

    const { player_id, row_position, col_position } = lastMove;

    let playerSymbol: SquareStateType;

    let lastMoveSymbol = boardState[row_position][col_position];

    if (player_id === playerId) {
      playerSymbol = lastMoveSymbol;
    } else if (lastMoveSymbol === "X") {
      playerSymbol = "O";
    } else {
      playerSymbol = "X";
    }

    let announcement = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(boardState);
        const symbol = boardState[i][j];
        const squarePosition = SQUARE_POSITIONS[i][j];
        if (symbol === "") {
          announcement += `${squarePosition} is empty. `;
        } else if (symbol === playerSymbol) {
          announcement += `${squarePosition} occupied by you. `;
        } else {
          announcement += `${squarePosition} occupied by opponent. `;
        }
      }
    }

    invokeAnnouncer(announcement);
  };

  const invokeAnnouncer = (announcement: string) => {
    const announcer = document.createElement("div");
    const announcerId = "speak-" + Date.now();
    announcer.setAttribute("id", announcerId);
    announcer.setAttribute("aria-live", "polite");
    announcer.classList.add("visually-hidden");
    document.body.appendChild(announcer);
    window.setTimeout(function () {
      announcer.innerHTML = announcement;
    }, 100);

    window.setTimeout(function () {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return (
    <button
      aria-label="Announce Board"
      onClick={announceBoard}
      id="announce-board-button"
      className="gameroom-button"
    >
      <p
        id="announce-board-button-label"
        aria-hidden="true"
        className="p1 gameroom-button-label"
      >
        Announce Board
      </p>
      <img
        aria-hidden="true"
        src={require("../../assets/board-icon.png")}
        className="gameroom-button-icon"
      />
    </button>
  );
};

const QuitGameButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button
      aria-label="Quit Game"
      onClick={handleOnClick}
      id="quit-game-button"
      className="gameroom-button"
    >
      <p
        id="quit-game-button-label"
        aria-hidden="true"
        className="p1 gameroom-button-label"
      >
        Quit Game
      </p>
      <img
        aria-hidden="true"
        src={require("../../assets/quit-game-icon.png")}
        className="gameroom-button-icon"
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
