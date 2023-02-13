import { useRef, useState } from "react";
import { ButtonProps, PageProps } from "../game/utils/types";
import { createPlayer, deletePlayer } from "../game/utils/utils";

import "./onboarding.css";

interface OnBoardingProps {
  setPlayerId: React.Dispatch<React.SetStateAction<number>>;
}
export const OnBoarding = ({
  setPlayerId,
  navigateTo,
}: OnBoardingProps & PageProps) => {
  const onBoardingRef = useRef<HTMLElement | null>(null);

  const handleStartSession = async () => {
    const newPlayerId = await createPlayer();
    if (newPlayerId) setPlayerId(newPlayerId);
    navigateTo("DASHBOARD");
  };

  return (
    <main id="onboarding" ref={onBoardingRef} aria-label="OnBoarding" aria-live="assertive">
      <Logo />
      <StartButton handleOnClick={handleStartSession} />
    </main>
  );
};

const Logo = () => {
  return (
    <img
      id="logo"
      src={require("../../assets/logo.png")}
      aria-label="app-logo"
      alt="app-logo"
    ></img>
  );
};

const StartButton = ({ handleOnClick }: ButtonProps) => {
  return (
    <button id="start-button" aria-label="Start Now" onClick={handleOnClick}>
      <h3 id="start-button-label" aria-hidden="true" className="h3">
        Start Now &nbsp; ➜
      </h3>
    </button>
  );
};
