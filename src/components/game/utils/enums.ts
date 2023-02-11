enum AppPage {
  DASHBOARD,
  GAMEROOM
}

export enum Player {
  "X",
  "O",
}

export enum SquareState {
  "X",
  "O",
  "",
}

export type AppPageType = keyof typeof AppPage;

export type PlayerType = keyof typeof Player;

export type SquareStateType = keyof typeof SquareState;

export type BoardStateType = (keyof typeof SquareState)[][];
