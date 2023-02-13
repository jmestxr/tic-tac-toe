import { supabase } from "../../../database/supabaseClient";
import { BoardStateType, PlayerType } from "./types";

export const SQUARE_POSITIONS = [
  ["top left", "top center", "top right"],
  ["center left", "center", "center right"],
  ["bottom left", "bottom center", "bottom right"],
];

export const getEmptyBoardState = (): BoardStateType => {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};

export const getBoardState = async (gameId: number) => {
  const boardState = getEmptyBoardState();

  return getMoves(gameId).then((data) => {
    if (data) {
      let currPlayer: PlayerType = "X";
      for (let i = 0; i < data.length; i++) {
        let { row_pos, col_pos } = data[i];
        boardState[row_pos][col_pos] = currPlayer;
        currPlayer = currPlayer === "X" ? "O" : "X";
      }
    }
    return boardState;
  });
};

export const checkIsGameExists = async (gameId: number) => {
  const isGameSessionExists = await isGameExists(gameId);
  if (
    isGameSessionExists !== undefined &&
    isGameSessionExists !== null
  ) {
    return isGameSessionExists;
  }
  return false;
};

export const checkIsWaitingGame = async (gameId: number) => {
  const isWaiting = await isWaitingGame(gameId);
  if (isWaiting !== null && isWaiting !== undefined) {
    return isWaiting;
  }
  return true;
}

export const checkIsWaitingMove = async (gameId: number, playerId: number) => {
  const isWaiting = await isWaitingMove(
    gameId,
    playerId
  );
  if (isWaiting !== null && isWaiting !== undefined) {
    return isWaiting;
  }
  return true;
}


/* ==================================== DATABASE CALLS ==================================== */
export const createPlayer = async () => {
  try {
    const { data, error } = await supabase.rpc("create_player");
    return data;
  } catch (error) {
    console.log("Error creating player!");
  }
};

export const deletePlayer = async (playerId: number) => {
  try {
    const { data, error } = await supabase.rpc("delete_player", {
      pid: playerId,
    });
    return data;
  } catch (error) {
    console.log("Error deleting player!");
  }
};

export const joinGame = async (playerId: number) => {
  try {
    const { data, error } = await supabase.rpc("join_game", {
      pid: playerId,
    });
    return data;
  } catch (error) {
    console.log("Error joining game!");
  }
};

export const deleteGame = async (gameId: number) => {
  try {
    const { data, error } = await supabase.rpc("delete_game", { gid: gameId });
    return data;
  } catch (error) {
    console.log("Error deleting game!");
  }
};

export const getPlayers = async (gameId: number) => {
  try {
    const { data, error } = await supabase.rpc("get_players", {
      gid: gameId,
    });
    return data;
  } catch (error) {
    console.log("Error encountered when getting players!");
  }
};

export const isGameExists = async (gameId: number) => {
  try {
    const { data, error } = await supabase.rpc("is_game_exists", {
      gid: gameId,
    });
    return data;
  } catch (error) {
    console.log("Error checking if game exists!");
  }
};

export const isWaitingGame = async (gameId: number) => {
  try {
    const { data, error } = await supabase.rpc("is_waiting_game", {
      gid: gameId,
    });
    return data;
  } catch (error) {
    console.log("Error checking if waiting game!");
  }
};

export const isWaitingMove = async (gameId: number, playerId: number) => {
  try {
    const { data, error } = await supabase.rpc("is_waiting_move", {
      gid: gameId,
      pid: playerId,
    });
    return data;
  } catch (error) {
    console.log("Error checking if waiting move!");
  }
};

export const getMoves = async (gameId: number) => {
  try {
    const { data, error } = await supabase.rpc("get_moves", { gid: gameId });
    return data;
  } catch (error) {
    console.log("Error encountered when getting moves!");
  }
};

export const getLastMove = async (gameId: number) => {
  try {
    const { data, error } = await supabase.rpc("get_last_move", {
      gid: gameId,
    });
    return data as Record<string, number>;
  } catch (error) {
    console.log("Error encountered when getting last move!");
  }
};

export const makeMove = async (
  gameId: number,
  playerId: number,
  position: number[]
) => {
  try {
    const [row, col] = position;
    const { data, error } = await supabase.rpc("make_move", {
      gid: gameId,
      pid: playerId,
      row_pos: row,
      col_pos: col,
    });
    return data;
  } catch (error) {
    console.log("Error encountered when making move!");
  }
};
