import { AppPage, GameResult, Player, SquareState } from "./enums";

export type AppPageType = keyof typeof AppPage;

export type PlayerType = keyof typeof Player;

export type SquareStateType = keyof typeof SquareState;

export type BoardStateType = (keyof typeof SquareState)[][];

export type GameResultType = (keyof typeof GameResult);

export interface ButtonProps {
    handleOnClick: () => void;
}
