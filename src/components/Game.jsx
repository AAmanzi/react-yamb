import { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import Hud from "./Hud";
import { constructInitialScore } from "../utils";
import { valueCalculator } from "../utils/valueCalculator";

const Game = () => {
  const [score, setScore] = useState({
    playerOne: constructInitialScore(),
    playerTwo: constructInitialScore(),
  });
  const [currentPlayer, setCurrentPlayer] = useState("playerOne");
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
      prev === "playerOne" ? "playerTwo" : "playerOne"
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
    setScore({
      playerOne: constructInitialScore(),
      playerTwo: constructInitialScore(),
    });
    setCurrentPlayer("playerOne");
    setSelectedRule(null);
    setIsGameOver(false);
  };

  return (
    <div className="game">
      <Scoreboard
        score={score}
        currentPlayer={currentPlayer}
        selectedRule={selectedRule}
        onSelectRule={setSelectedRule}
        isGameOver={isGameOver}
      />
      <Hud
        onSubmit={handleSubmit}
        isSubmitDisabled={selectedRule === null}
        isGameOver={isGameOver}
        onRestartGame={handleRestartGame}
      />
    </div>
  );
};

export default Game;
