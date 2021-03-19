import React, { useEffect, useState } from "react";

import { constructScore } from "../utils/defaults";
import { Players } from "../consts";

import Scoreboard from "./Scoreboard";
import Hud from "./Hud";
import { valueCalculator } from "../utils/valueCalculator";

const initialState = {
  score: {
    [Players.playerOne]: constructScore(),
    [Players.playerTwo]: constructScore(),
  },
};

const Game = () => {
  const [score, setScore] = useState(initialState.score);
  const [currentPlayer, setCurrentPlayer] = useState(Players.playerOne);
  const [selectedRule, setSelectedRule] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const playerOneScores = Object.values(score.playerOne);
    const playerTwoScores = Object.values(score.playerTwo);

    const isPlayerOneFinished = playerOneScores.every(
      (score) => score !== null
    );
    const isPlayerTwoFinished = playerTwoScores.every(
      (score) => score !== null
    );

    if (isPlayerOneFinished && isPlayerTwoFinished) {
      setIsGameOver(true);
    }
  }, [score]);

  const handleNextPlayer = () => {
    setCurrentPlayer((prev) =>
      prev === Players.playerOne ? Players.playerTwo : Players.playerOne
    );
  };

  const handleSubmit = (diceValues) => {
    const calculateCellValue = valueCalculator[selectedRule];

    setScore((prev) => {
      const updatedPlayerScore = { ...prev[currentPlayer] };

      updatedPlayerScore[selectedRule] = calculateCellValue(diceValues);

      return {
        ...prev,
        [currentPlayer]: updatedPlayerScore,
      };
    });

    handleNextPlayer();
    setSelectedRule(null);
  };

  const handleRestartGame = () => {
    setScore(initialState.score);
    setCurrentPlayer(Players.playerOne);
    setSelectedRule(null);
    setIsGameOver(false);
  };

  return (
    <div className="game">
      <Scoreboard
        currentPlayer={currentPlayer}
        score={score}
        onSelectRule={setSelectedRule}
        selectedRule={selectedRule}
        isGameOver={isGameOver}
      />
      <Hud
        onSubmit={handleSubmit}
        isCellSelected={selectedRule !== null}
        isGameOver={isGameOver}
        onRestartGame={handleRestartGame}
      />
    </div>
  );
};

export default Game;
