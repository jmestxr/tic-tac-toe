import { BoardStateType, SquareStateType } from "./utils/types";
import "./board.css";
import { makeMove, SQUARE_POSITIONS } from "./utils/utils";

interface BoardProps {
  playerId: number;
  gameId: number;
  boardState: BoardStateType;
  isDisabled: boolean;
  isFinished: boolean;
}
export const Board = ({
  playerId,
  gameId,
  boardState,
  isDisabled,
  isFinished,
}: BoardProps) => {
  return (
    <div
      role="region"
      aria-label="Tic-Tac-Toe Board"
      className={
        "board" +
        (isDisabled ? " board-disabled" : "") +
        (isFinished ? " board-finished" : "")
      }
    >
      {boardState.map((row, i) => {
        return (
          <div className="board-row">
            {row.map((squareLabel: SquareStateType, j) => {
              return (
                <Square
                  playerId={playerId}
                  gameId={gameId}
                  label={squareLabel}
                  isDisabled={squareLabel !== "" || isDisabled || isFinished}
                  position={[i, j]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

interface SquareProps {
  playerId: number /* The current player making the move. */;
  gameId: number;
  label: SquareStateType;
  isDisabled: boolean;
  position: number[];
}
const Square = ({
  playerId,
  gameId,
  label,
  isDisabled,
  position,
}: SquareProps) => {
  const handleOnClick = async () => {
    await makeMove(gameId, playerId, position);
  };

  return (
    <button
      onClick={handleOnClick}
      disabled={isDisabled}
      aria-hidden={isDisabled}
      aria-label={getSquareAnnouncement(position)}
      className={"square" + (isDisabled ? " square-disabled" : "")}
    >
      <h1 aria-hidden="true" className="square-label h1">
        {label}
      </h1>
    </button>
  );
};

const getSquareAnnouncement = (position: number[]) => {
  const [x, y] = position;

  return `Make move on ${SQUARE_POSITIONS[x][y]} square.`;
};
