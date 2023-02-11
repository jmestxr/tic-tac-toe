import { BoardStateType, SquareStateType } from "./utils/enums";
import "./board.css";
import { getSquareAnnouncement } from "./utils/utils";


interface BoardProps {
  boardState: BoardStateType;
  updateBoardState: Function;
}

export const Board = ({ boardState, updateBoardState }: BoardProps) => {
  return (
    <div role="region" aria-label="Tic-Tac-Toe Board" className="board">
      {boardState.map((row, i) => {
        return (
          <div className="board-row">
            {row.map((squareState: SquareStateType, j) => {
              return (
                <Square
                  currPlayer="X"
                  squareState={squareState}
                  position={[i, j]}
                  updateBoardState={updateBoardState}
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
  currPlayer: string /* The current player making the move. */;
  squareState: SquareStateType;
  position: number[];
  updateBoardState: Function;
}

const Square = ({
  currPlayer,
  squareState,
  position,
  updateBoardState,
}: SquareProps) => {
  const isEmpty = () => {
    return squareState === "";
  };

  const handleOnClick = () => {
    if (isEmpty()) {
      updateBoardState(currPlayer, position);
    }
  };

  return (
    <button
      onClick={handleOnClick}
      disabled={!isEmpty()}
      aria-hidden={!isEmpty()}
      aria-label={getSquareAnnouncement(position)}
      className="square"
    >
      <h1 aria-hidden="true" className="square-label h1">
        {squareState}
      </h1>
    </button>
  );
};
