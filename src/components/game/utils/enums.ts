export enum AppPage {
  ONBOARDING,
  DASHBOARD,
  GAMEROOM,
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

export enum GameResult {
  "X" /* Player X wins */,
  "O" /* Player O wins */,
  "D" /* Draw */,
  "U" /* Unknown; game has not ended yet */,
}
