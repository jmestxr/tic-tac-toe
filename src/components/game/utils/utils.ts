import { BoardStateType } from "./enums";

export const getSquareAnnouncement = (position: number[]) => {
  const [x, y] = position;

  return `Make move on ${POSITIONS[x][y]} square.`;
};
const POSITIONS = [
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
